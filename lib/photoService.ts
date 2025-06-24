/**
 * Photo Service
 * 
 * This service handles all photo-related operations including:
 * - Uploading images to Supabase Storage
 * - Saving photo metadata to the database
 * - Retrieving photos and generating public URLs
 */

import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { Photo, supabase } from './supabase';

/**
 * Upload result interface
 */
export interface PhotoUploadResult {
  success: boolean;
  photo?: Photo;
  error?: string;
  publicUrl?: string;
}

/**
 * Photo upload options
 */
export interface PhotoUploadOptions {
  userId?: string;
  quality?: number;
  generateThumbnail?: boolean;
}

/**
 * Generate a unique filename for the photo
 */
function generateUniqueFileName(originalName?: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 15);
  const extension = originalName?.split('.').pop() || 'jpg';
  
  return `photo_${timestamp}_${randomStr}.${extension}`;
}

/**
 * Get file size from URI
 */
async function getFileSize(uri: string): Promise<number> {
  try {
    console.log('📏 Photo Service - Getting file size for:', uri);
    const fileInfo = await FileSystem.getInfoAsync(uri);
    
    if (fileInfo.exists && 'size' in fileInfo) {
      console.log('✅ Photo Service - File size:', fileInfo.size, 'bytes');
      return fileInfo.size;
    }
    
    console.log('⚠️ Photo Service - Could not determine file size, defaulting to 0');
    return 0;
  } catch (error) {
    console.error('❌ Photo Service - Error getting file size:', error);
    return 0;
  }
}

/**
 * Determine MIME type from file extension
 */
function getMimeType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  const mimeTypes: { [key: string]: string } = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'heic': 'image/heic',
    'heif': 'image/heif',
  };
  
  return mimeTypes[extension || 'jpg'] || 'image/jpeg';
}

/**
 * Upload photo to Supabase Storage and save metadata to database
 */
export async function uploadPhoto(
  photoUri: string,
  options: PhotoUploadOptions = {}
): Promise<PhotoUploadResult> {
  console.log('📤 Photo Service - Starting photo upload process');
  console.log('📍 Photo URI:', photoUri);
  console.log('⚙️ Upload options:', options);

  try {
    // Generate unique filename
    const fileName = generateUniqueFileName();
    const filePath = `uploads/${fileName}`;
    
    console.log('📝 Photo Service - Generated filename:', fileName);
    console.log('📂 Photo Service - File path:', filePath);

    // Get file info
    const fileSize = await getFileSize(photoUri);
    const mimeType = getMimeType(fileName);
    
    console.log('📊 Photo Service - File details:');
    console.log('  - Size:', fileSize, 'bytes');
    console.log('  - MIME type:', mimeType);

    // Read file as base64
    console.log('📖 Photo Service - Reading file as base64');
    const base64Response = await FileSystem.readAsStringAsync(photoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert base64 to ArrayBuffer
    console.log('🔄 Photo Service - Converting base64 to ArrayBuffer');
    const arrayBuffer = decode(base64Response);

    // Upload to Supabase Storage
    console.log('☁️ Photo Service - Uploading to Supabase Storage');
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('photos')
      .upload(filePath, arrayBuffer, {
        contentType: mimeType,
        cacheControl: '3600', // Cache for 1 hour
        upsert: false, // Don't overwrite existing files
      });

    if (uploadError) {
      console.error('❌ Photo Service - Storage upload error:', uploadError);
      return {
        success: false,
        error: `Failed to upload file: ${uploadError.message}`,
      };
    }

    console.log('✅ Photo Service - File uploaded successfully');
    console.log('📁 Upload data:', uploadData);

    // Get public URL
    console.log('🔗 Photo Service - Generating public URL');
    const { data: urlData } = supabase.storage
      .from('photos')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;
    console.log('🌐 Photo Service - Public URL:', publicUrl);

    // Prepare photo metadata for database
    const photoMetadata = {
      user_id: options.userId || null,
      file_name: fileName,
      file_path: filePath,
      file_size: fileSize,
      mime_type: mimeType,
      taken_at: new Date().toISOString(),
      storage_bucket: 'photos',
      public_url: publicUrl,
    };

    console.log('💾 Photo Service - Saving metadata to database');
    console.log('📊 Photo metadata:', photoMetadata);

    // Save metadata to database
    const { data: dbData, error: dbError } = await supabase
      .from('photos')
      .insert(photoMetadata)
      .select()
      .single();

    if (dbError) {
      console.error('❌ Photo Service - Database error:', dbError);
      
      // Cleanup: delete the uploaded file if database save failed
      console.log('🧹 Photo Service - Cleaning up uploaded file due to database error');
      await supabase.storage.from('photos').remove([filePath]);
      
      return {
        success: false,
        error: `Failed to save photo metadata: ${dbError.message}`,
      };
    }

    console.log('✅ Photo Service - Photo uploaded and saved successfully!');
    console.log('📊 Saved photo data:', dbData);

    return {
      success: true,
      photo: dbData as Photo,
      publicUrl: publicUrl,
    };

  } catch (error) {
    console.error('❌ Photo Service - Unexpected error during upload:', error);
    return {
      success: false,
      error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Get all photos from the database
 */
export async function getAllPhotos(): Promise<Photo[]> {
  console.log('📋 Photo Service - Fetching all photos');

  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('taken_at', { ascending: false });

    if (error) {
      console.error('❌ Photo Service - Error fetching photos:', error);
      throw new Error(`Failed to fetch photos: ${error.message}`);
    }

    console.log('✅ Photo Service - Successfully fetched', data?.length || 0, 'photos');
    return data || [];

  } catch (error) {
    console.error('❌ Photo Service - Unexpected error fetching photos:', error);
    return [];
  }
}

/**
 * Get photos by user ID
 */
export async function getPhotosByUser(userId: string): Promise<Photo[]> {
  console.log('👤 Photo Service - Fetching photos for user:', userId);

  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('user_id', userId)
      .order('taken_at', { ascending: false });

    if (error) {
      console.error('❌ Photo Service - Error fetching user photos:', error);
      throw new Error(`Failed to fetch user photos: ${error.message}`);
    }

    console.log('✅ Photo Service - Successfully fetched', data?.length || 0, 'photos for user');
    return data || [];

  } catch (error) {
    console.error('❌ Photo Service - Unexpected error fetching user photos:', error);
    return [];
  }
}

/**
 * Delete a photo (both from storage and database)
 */
export async function deletePhoto(photoId: string): Promise<boolean> {
  console.log('🗑️ Photo Service - Deleting photo with ID:', photoId);

  try {
    // First, get the photo data to know the file path
    const { data: photo, error: fetchError } = await supabase
      .from('photos')
      .select('file_path')
      .eq('id', photoId)
      .single();

    if (fetchError || !photo) {
      console.error('❌ Photo Service - Error fetching photo for deletion:', fetchError);
      return false;
    }

    console.log('📁 Photo Service - File path to delete:', photo.file_path);

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('photos')
      .remove([photo.file_path]);

    if (storageError) {
      console.error('❌ Photo Service - Error deleting from storage:', storageError);
      // Continue with database deletion even if storage deletion fails
    } else {
      console.log('✅ Photo Service - Successfully deleted from storage');
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('photos')
      .delete()
      .eq('id', photoId);

    if (dbError) {
      console.error('❌ Photo Service - Error deleting from database:', dbError);
      return false;
    }

    console.log('✅ Photo Service - Successfully deleted photo');
    return true;

  } catch (error) {
    console.error('❌ Photo Service - Unexpected error deleting photo:', error);
    return false;
  }
} 