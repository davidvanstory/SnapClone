/**
 * Authentication Utilities
 * 
 * This module provides utility functions for authentication management including:
 * - Session validation and management
 * - User profile operations
 * - Email validation
 * - Password strength validation
 */

import type { UserProfile } from '../store/authStore';
import { supabase } from './supabase';

/**
 * Email validation regex pattern
 * Matches standard email format: user@domain.com
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password validation requirements
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  console.log('📧 Auth Utils - Validating email format');
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  console.log('🔒 Auth Utils - Validating password strength');
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate username format
 * - 3-20 characters
 * - Alphanumeric and underscores only
 * - Cannot start or end with underscore
 */
export function validateUsername(username: string): {
  isValid: boolean;
  error?: string;
} {
  console.log('👤 Auth Utils - Validating username format');
  
  if (!username || username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters long' };
  }

  if (username.length > 20) {
    return { isValid: false, error: 'Username must be no more than 20 characters long' };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { isValid: false, error: 'Username can only contain letters, numbers, and underscores' };
  }

  if (username.startsWith('_') || username.endsWith('_')) {
    return { isValid: false, error: 'Username cannot start or end with an underscore' };
  }

  return { isValid: true };
}

/**
 * Check if username is available
 */
export async function checkUsernameAvailability(username: string): Promise<{
  isAvailable: boolean;
  error?: string;
}> {
  console.log('🔍 Auth Utils - Checking username availability:', username);

  try {
    const { data, error } = await supabase
      .from('users')
      .select('username')
      .eq('username', username.toLowerCase())
      .maybeSingle();

    if (error) {
      console.error('❌ Auth Utils - Username check error:', error);
      return { isAvailable: false, error: 'Failed to check username availability' };
    }

    const isAvailable = !data;
    console.log('✅ Auth Utils - Username availability:', isAvailable ? 'Available' : 'Taken');
    
    return { isAvailable };
  } catch (error) {
    console.error('❌ Auth Utils - Username check unexpected error:', error);
    return { isAvailable: false, error: 'Failed to check username availability' };
  }
}

/**
 * Get current user session
 */
export async function getCurrentSession() {
  console.log('📱 Auth Utils - Getting current session');
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('❌ Auth Utils - Session fetch error:', error);
      return { session: null, error: error.message };
    }

    console.log('✅ Auth Utils - Session retrieved:', session ? 'Found' : 'None');
    return { session, error: null };
  } catch (error) {
    console.error('❌ Auth Utils - Session fetch unexpected error:', error);
    return { 
      session: null, 
      error: error instanceof Error ? error.message : 'Failed to get session' 
    };
  }
}

/**
 * Get user profile by ID
 */
export async function getUserProfile(userId: string): Promise<{
  profile: UserProfile | null;
  error?: string;
}> {
  console.log('👤 Auth Utils - Getting user profile:', userId);

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('❌ Auth Utils - Profile fetch error:', error);
      return { profile: null, error: error.message };
    }

    console.log('✅ Auth Utils - Profile retrieved successfully');
    return { profile: data };
  } catch (error) {
    console.error('❌ Auth Utils - Profile fetch unexpected error:', error);
    return { 
      profile: null, 
      error: error instanceof Error ? error.message : 'Failed to get profile' 
    };
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string, 
  updates: Partial<Pick<UserProfile, 'username' | 'avatar_url'>>
): Promise<{
  profile: UserProfile | null;
  error?: string;
}> {
  console.log('📝 Auth Utils - Updating user profile:', userId, updates);

  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('❌ Auth Utils - Profile update error:', error);
      return { profile: null, error: error.message };
    }

    console.log('✅ Auth Utils - Profile updated successfully');
    return { profile: data };
  } catch (error) {
    console.error('❌ Auth Utils - Profile update unexpected error:', error);
    return { 
      profile: null, 
      error: error instanceof Error ? error.message : 'Failed to update profile' 
    };
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const { session } = await getCurrentSession();
  return !!session?.user;
}

/**
 * Get user ID from current session
 */
export async function getCurrentUserId(): Promise<string | null> {
  const { session } = await getCurrentSession();
  return session?.user?.id || null;
}

/**
 * Format authentication error messages for user display
 */
export function formatAuthError(error: string): string {
  console.log('⚠️ Auth Utils - Formatting auth error:', error);

  // Common Supabase auth error mappings
  const errorMappings: Record<string, string> = {
    'Invalid login credentials': 'Invalid email or password. Please check your credentials and try again.',
    'User not found': 'No account found with this email address. Please sign up first.',
    'Email not confirmed': 'Please check your email and click the confirmation link before signing in.',
    'Signup not allowed': 'Account registration is currently disabled. Please contact support.',
    'Password should be at least 6 characters': 'Password must be at least 6 characters long.',
    'User already registered': 'An account with this email already exists. Please sign in instead.',
    'Invalid email': 'Please enter a valid email address.',
    'Too many requests': 'Too many login attempts. Please wait a moment and try again.',
  };

  return errorMappings[error] || error;
}

/**
 * Generate a secure random password
 */
export function generateSecurePassword(length: number = 12): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&';
  let password = '';
  
  // Ensure at least one character from each required category
  password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]; // Uppercase
  password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]; // Lowercase
  password += '0123456789'[Math.floor(Math.random() * 10)]; // Number
  password += '@$!%*?&'[Math.floor(Math.random() * 7)]; // Special character
  
  // Fill remaining length with random characters
  for (let i = 4; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  
  // Shuffle the password to randomize character positions
  return password.split('').sort(() => Math.random() - 0.5).join('');
} 