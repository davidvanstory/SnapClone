/**
 * Onboarding Service
 * 
 * This service handles checking and updating the user's onboarding completion status.
 * Uses the has_seen_onboarding field in the users table to track whether a user
 * has completed the first-time onboarding flow.
 */

import { supabase } from './supabase';

export interface OnboardingStatus {
  hasSeenOnboarding: boolean;
  isFirstTimeUser: boolean;
}

/**
 * Check if a user has completed onboarding
 * @param userId - The user's UUID
 * @returns Promise with onboarding status
 */
export async function checkOnboardingStatus(userId: string): Promise<{ 
  success: boolean; 
  data?: OnboardingStatus; 
  error?: string 
}> {
  console.log('🔍 Onboarding Service - Checking onboarding status for user:', userId);

  try {
    const { data: userProfile, error } = await supabase
      .from('users')
      .select('has_seen_onboarding')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('❌ Onboarding Service - Error fetching user profile:', error);
      return { success: false, error: error.message };
    }

    if (!userProfile) {
      console.error('❌ Onboarding Service - User profile not found');
      return { success: false, error: 'User profile not found' };
    }

    const hasSeenOnboarding = userProfile.has_seen_onboarding || false;
    const isFirstTimeUser = !hasSeenOnboarding;

    console.log('✅ Onboarding Service - Status retrieved:', {
      hasSeenOnboarding,
      isFirstTimeUser
    });

    return {
      success: true,
      data: {
        hasSeenOnboarding,
        isFirstTimeUser
      }
    };
  } catch (error) {
    console.error('❌ Onboarding Service - Unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Mark onboarding as completed for a user
 * @param userId - The user's UUID
 * @returns Promise with success/error result
 */
export async function markOnboardingCompleted(userId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  console.log('✅ Onboarding Service - Marking onboarding completed for user:', userId);

  try {
    const { error } = await supabase
      .from('users')
      .update({ has_seen_onboarding: true })
      .eq('id', userId);

    if (error) {
      console.error('❌ Onboarding Service - Error updating onboarding status:', error);
      return { success: false, error: error.message };
    }

    console.log('🎉 Onboarding Service - Onboarding marked as completed successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Onboarding Service - Unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Reset onboarding status for a user (useful for testing)
 * @param userId - The user's UUID
 * @returns Promise with success/error result
 */
export async function resetOnboardingStatus(userId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  console.log('🔄 Onboarding Service - Resetting onboarding status for user:', userId);

  try {
    const { error } = await supabase
      .from('users')
      .update({ has_seen_onboarding: false })
      .eq('id', userId);

    if (error) {
      console.error('❌ Onboarding Service - Error resetting onboarding status:', error);
      return { success: false, error: error.message };
    }

    console.log('🔄 Onboarding Service - Onboarding status reset successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Onboarding Service - Unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 