/**
 * Post Service
 * 
 * This service handles creating ephemeral posts from the Juni Solo AI Tutor
 * to share artwork with the class feed.
 * 
 * Features:
 * - Creates ephemeral posts with configurable viewer and duration settings
 * - Reuses image URLs from Juni chat (no re-upload needed)
 * - Associates posts with user's current enrolled class
 * - Includes user caption and metadata
 * - Returns post ID for navigation purposes
 */

import { useClassStore } from '../store/classStore';
import type { Post } from './supabase';
import { supabase } from './supabase';

/**
 * Post creation result interface
 */
export interface PostCreationResult {
  success: boolean;
  postId?: string;
  error?: string;
}

/**
 * Options for creating a post from Juni
 */
export interface CreateJuniPostOptions {
  userId: string;
  imageUrl: string;
  caption: string;
  userName?: string;
  maxViewers?: number;
  durationHours?: number;
}

/**
 * Create an ephemeral post from Juni chat to share with class
 * 
 * @param options - Post creation options
 * @returns Result with success status and post ID
 */
export async function createJuniPost(
  options: CreateJuniPostOptions
): Promise<PostCreationResult> {
  console.log('🎨 Post Service - Creating Juni share post');
  console.log('📸 Image URL:', options.imageUrl);
  console.log('💬 Caption:', options.caption);
  console.log('👤 User:', options.userId, options.userName);

  try {
    // Get the current class from the store
    const { currentClass } = useClassStore.getState();
    
    if (!currentClass) {
      console.error('❌ Post Service - No current class selected');
      return {
        success: false,
        error: 'No class selected. Please join a class first.',
      };
    }

    console.log('📚 Post Service - Sharing to class:', currentClass.name);

    // Calculate expiration time
    const durationHours = options.durationHours || 5; // Default 5 hours
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + durationHours);

    // Prepare post description with user name and caption
    const description = options.userName 
      ? `${options.userName}: ${options.caption}`
      : options.caption;

    // Prepare post data
    const postData: Partial<Post> = {
      user_id: options.userId,
      class_id: currentClass.id,
      image_url: options.imageUrl,
      description: description,
      max_viewers: options.maxViewers || 5, // Default 5 viewers
      duration_minutes: durationHours * 60,
      expires_at: expiresAt.toISOString(),
    };

    console.log('📝 Post Service - Creating post with data:', {
      ...postData,
      class_name: currentClass.name,
    });

    // Use the classStore's createPost method which handles the database insert
    const result = await useClassStore.getState().createPost(postData);

    if (result.success && result.postId) {
      console.log('✅ Post Service - Post created successfully:', result.postId);
      return {
        success: true,
        postId: result.postId,
      };
    } else {
      console.error('❌ Post Service - Failed to create post:', result.error);
      return {
        success: false,
        error: result.error || 'Failed to create post',
      };
    }

  } catch (error) {
    console.error('❌ Post Service - Unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unexpected error occurred',
    };
  }
}

/**
 * Get user's display name
 * 
 * @param userId - User ID
 * @returns User's display name or null
 */
export async function getUserDisplayName(userId: string): Promise<string | null> {
  try {
    console.log('👤 Post Service - Fetching user display name for:', userId);
    
    const { data: user, error } = await supabase
      .from('users')
      .select('username')
      .eq('id', userId)
      .single();

    if (error || !user) {
      console.error('❌ Post Service - Error fetching user:', error);
      return null;
    }

    console.log('✅ Post Service - User display name:', user.username);
    return user.username || null;

  } catch (error) {
    console.error('❌ Post Service - Unexpected error fetching user:', error);
    return null;
  }
} 