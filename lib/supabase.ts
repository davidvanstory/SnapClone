/**
 * Supabase Client Configuration
 * 
 * This file configures the Supabase client for the SnapClone application.
 * It handles authentication, database operations, and storage functionality.
 */

import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Get environment variables from Expo Constants
const supabaseUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Config - Initializing client');
console.log('📍 Supabase URL:', supabaseUrl ? 'Set ✓' : 'Missing ❌');
console.log('🔑 Supabase Anon Key:', supabaseAnonKey ? 'Set ✓' : 'Missing ❌');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file contains:\n' +
    '- EXPO_PUBLIC_SUPABASE_URL\n' +
    '- EXPO_PUBLIC_SUPABASE_ANON_KEY'
  );
}

/**
 * Supabase client instance
 * Configured with auto-refresh for authentication and proper URL handling
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Enable auto refresh of auth tokens
    autoRefreshToken: true,
    // Persist auth state in local storage
    persistSession: true,
    // Detect auth state changes
    detectSessionInUrl: false,
  },
});

/**
 * Database Types for TypeScript support
 */
export interface Photo {
  id: string;
  user_id?: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  width?: number;
  height?: number;
  taken_at: string;
  uploaded_at: string;
  storage_bucket: string;
  public_url?: string;
}

export interface Database {
  public: {
    Tables: {
      photos: {
        Row: Photo;
        Insert: Omit<Photo, 'id' | 'uploaded_at'>;
        Update: Partial<Omit<Photo, 'id' | 'uploaded_at'>>;
      };
    };
  };
}

console.log('✅ Supabase client initialized successfully'); 