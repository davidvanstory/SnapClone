/**
 * Solo Image Service
 * 
 * This service handles image upload operations for the Solo AI Tutor feature including:
 * - Uploading artwork images to Supabase Storage for AI analysis
 * - Generating secure public URLs for uploaded images
 * - Optimizing images for AI processing and chat display
 * - Error handling and cleanup for failed uploads
 * 
 * Key differences from photoService:
 * - Uses 'solo-images' storage bucket instead of 'photos'
 * - No database metadata storage (images are referenced in chat messages)
 * - Optimized for AI analysis (specific quality and size settings)
 * - Shorter cache control for temporary chat images
 */

import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { supabase } from './supabase';

/**
 * Solo image upload result interface
 */
export interface SoloImageUploadResult {
  success: boolean;
  publicUrl?: string;
  error?: string;
  filePath?: string;
  fileSize?: number;
}

/**
 * Solo image upload options
 */
export interface SoloImageUploadOptions {
  userId?: string;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

/**
 * Generate a unique filename for solo chat images
 */
function generateSoloImageFileName(userId?: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 15);
  const userPrefix = userId ? userId.substring(0, 8) : 'anon';
  
  return `solo_${userPrefix}_${timestamp}_${randomStr}.jpg`;
}

/**
 * Get file size from URI
 */
async function getFileSize(uri: string): Promise<number> {
  try {
    console.log('📏 Solo Image Service - Getting file size for:', uri);
    const fileInfo = await FileSystem.getInfoAsync(uri);
    
    if (fileInfo.exists && 'size' in fileInfo) {
      console.log('✅ Solo Image Service - File size:', fileInfo.size, 'bytes');
      return fileInfo.size;
    }
    
    console.log('⚠️ Solo Image Service - Could not determine file size, defaulting to 0');
    return 0;
  } catch (error) {
    console.error('❌ Solo Image Service - Error getting file size:', error);
    return 0;
  }
}

/**
 * Upload image to Supabase Storage for Solo AI Tutor
 * 
 * This function uploads artwork images that users want to get AI feedback on.
 * Images are stored in the 'solo-images' bucket and optimized for AI analysis.
 */
export async function uploadSoloImage(
  imageUri: string,
  options: SoloImageUploadOptions = {}
): Promise<SoloImageUploadResult> {
  console.log('🖼️ Solo Image Service - Starting image upload for AI analysis');
  console.log('📍 Image URI:', imageUri);
  console.log('⚙️ Upload options:', options);

  try {
    // Generate unique filename
    const fileName = generateSoloImageFileName(options.userId);
    const filePath = `uploads/${fileName}`;
    
    console.log('📝 Solo Image Service - Generated filename:', fileName);
    console.log('📂 Solo Image Service - File path:', filePath);

    // Get file info
    const fileSize = await getFileSize(imageUri);
    const mimeType = 'image/jpeg'; // Standardize to JPEG for AI processing
    
    console.log('📊 Solo Image Service - File details:');
    console.log('  - Size:', fileSize, 'bytes');
    console.log('  - MIME type:', mimeType);

    // Validate file size (max 10MB for AI processing)
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    if (fileSize > maxFileSize) {
      console.error('❌ Solo Image Service - File too large:', fileSize, 'bytes');
      return {
        success: false,
        error: 'Image file is too large. Please choose an image smaller than 10MB.',
      };
    }

    // Read file as base64
    console.log('📖 Solo Image Service - Reading file as base64');
    const base64Response = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert base64 to ArrayBuffer
    console.log('🔄 Solo Image Service - Converting base64 to ArrayBuffer');
    const arrayBuffer = decode(base64Response);

    // Upload to Supabase Storage (solo-images bucket)
    console.log('☁️ Solo Image Service - Uploading to Supabase Storage (solo-images bucket)');
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('solo-images')
      .upload(filePath, arrayBuffer, {
        contentType: mimeType,
        cacheControl: '1800', // Cache for 30 minutes (shorter than photos)
        upsert: false, // Don't overwrite existing files
      });

    if (uploadError) {
      console.error('❌ Solo Image Service - Storage upload error:', uploadError);
      return {
        success: false,
        error: `Failed to upload image: ${uploadError.message}`,
      };
    }

    console.log('✅ Solo Image Service - Image uploaded successfully');
    console.log('📁 Upload data:', uploadData);

    // Get public URL
    console.log('🔗 Solo Image Service - Generating public URL');
    const { data: urlData } = supabase.storage
      .from('solo-images')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;
    console.log('🌐 Solo Image Service - Public URL:', publicUrl);

    // Validate public URL
    if (!publicUrl) {
      console.error('❌ Solo Image Service - Failed to generate public URL');
      return {
        success: false,
        error: 'Failed to generate public URL for uploaded image',
      };
    }

    console.log('✅ Solo Image Service - Image upload completed successfully!');

    return {
      success: true,
      publicUrl: publicUrl,
      filePath: filePath,
      fileSize: fileSize,
    };

  } catch (error) {
    console.error('❌ Solo Image Service - Unexpected error during upload:', error);
    return {
      success: false,
      error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Delete a solo image from storage
 * 
 * This function removes uploaded images from the solo-images bucket.
 * Useful for cleanup when messages are deleted or on error scenarios.
 */
export async function deleteSoloImage(filePath: string): Promise<boolean> {
  console.log('🗑️ Solo Image Service - Deleting image:', filePath);

  try {
    const { error } = await supabase.storage
      .from('solo-images')
      .remove([filePath]);

    if (error) {
      console.error('❌ Solo Image Service - Error deleting image:', error);
      return false;
    }

    console.log('✅ Solo Image Service - Image deleted successfully');
    return true;

  } catch (error) {
    console.error('❌ Solo Image Service - Unexpected error deleting image:', error);
    return false;
  }
}

/**
 * Get public URL for an existing solo image
 * 
 * This function generates a public URL for an image that's already stored
 * in the solo-images bucket. Useful for regenerating URLs if needed.
 */
export function getSoloImagePublicUrl(filePath: string): string | null {
  console.log('🔗 Solo Image Service - Getting public URL for:', filePath);

  try {
    const { data } = supabase.storage
      .from('solo-images')
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;
    console.log('🌐 Solo Image Service - Generated public URL:', publicUrl);

    return publicUrl || null;

  } catch (error) {
    console.error('❌ Solo Image Service - Error generating public URL:', error);
    return null;
  }
}

/**
 * Validate image file before upload
 * 
 * This function performs client-side validation of image files
 * before attempting to upload them to storage.
 */
export async function validateSoloImage(imageUri: string): Promise<{ 
  isValid: boolean; 
  error?: string; 
}> {
  console.log('🔍 Solo Image Service - Validating image:', imageUri);

  try {
    // Check if file exists
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    
    if (!fileInfo.exists) {
      return {
        isValid: false,
        error: 'Image file does not exist',
      };
    }

    // Check file size if available
    if ('size' in fileInfo && fileInfo.size) {
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      if (fileInfo.size > maxFileSize) {
        return {
          isValid: false,
          error: 'Image file is too large (max 10MB)',
        };
      }
    }

    console.log('✅ Solo Image Service - Image validation passed');
    return { isValid: true };

  } catch (error) {
    console.error('❌ Solo Image Service - Error validating image:', error);
    return {
      isValid: false,
      error: 'Failed to validate image file',
    };
  }
} 