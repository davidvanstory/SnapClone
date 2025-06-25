/**
 * Supabase Client Configuration
 * 
 * This file configures the Supabase client for the SnapClone application.
 * It automatically switches between local and cloud environments based on
 * the development mode (`__DEV__`).
 */

import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// The __DEV__ global variable is `true` when running in development mode,
// and `false` when running in a production build.
const isDevelopment = __DEV__;

console.log('Running in', isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION', 'mode.');

// Conditionally choose the Supabase URL and Key
const supabaseUrl = isDevelopment
  ? Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL_LOCAL
  : Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL;

const supabaseAnonKey = isDevelopment
  ? Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY_LOCAL
  : Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Config - Initializing client for', isDevelopment ? 'Local' : 'Cloud');
console.log('📍 Supabase URL:', supabaseUrl ? 'Set ✓' : 'Missing ❌');
console.log('🔑 Supabase Anon Key:', supabaseAnonKey ? 'Set ✓' : 'Missing ❌');

if (!supabaseUrl || !supabaseAnonKey) {
  const missingVar = !supabaseUrl ? 'URL' : 'Key';
  const envName = isDevelopment ? `EXPO_PUBLIC_SUPABASE_${missingVar}_LOCAL` : `EXPO_PUBLIC_SUPABASE_${missingVar}`;
  throw new Error(
    `Missing Supabase environment variable: ${envName}. Please check your .env file.`
  );
}

/**
 * Supabase client instance
 * Configured with auto-refresh for authentication and proper URL handling
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
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