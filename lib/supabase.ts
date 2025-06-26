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

export interface Class {
  id: string;
  name: string;
  join_code: string;
  description?: string;
  created_by?: string;
  is_active: boolean;
  max_students: number;
  created_at: string;
  updated_at: string;
}

export interface ClassMember {
  id: string;
  class_id: string;
  user_id: string;
  role: 'student' | 'teacher' | 'admin';
  joined_at: string;
  is_active: boolean;
}

export interface Post {
  id: string;
  user_id: string;
  class_id: string;
  image_url: string;
  image_path?: string;
  frame_style?: string;
  title?: string;
  description?: string;
  max_viewers: number;
  view_count: number;
  duration_minutes: number;
  expires_at: string;
  is_expired: boolean;
  created_at: string;
  updated_at: string;
}

export interface PostView {
  id: string;
  post_id: string;
  user_id: string;
  viewed_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  is_edited: boolean;
  created_at: string;
  updated_at: string;
}

export interface AIFeedback {
  id: string;
  post_id: string;
  user_id: string;
  feedback_text: string;
  feedback_status: 'pending' | 'processing' | 'completed' | 'failed';
  processing_time_ms?: number;
  ai_model: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      photos: {
        Row: Photo;
        Insert: Omit<Photo, 'id' | 'uploaded_at'>;
        Update: Partial<Omit<Photo, 'id' | 'uploaded_at'>>;
      };
      classes: {
        Row: Class;
        Insert: Omit<Class, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Class, 'id' | 'created_at' | 'updated_at'>>;
      };
      class_members: {
        Row: ClassMember;
        Insert: Omit<ClassMember, 'id' | 'joined_at'>;
        Update: Partial<Omit<ClassMember, 'id' | 'joined_at'>>;
      };
      posts: {
        Row: Post;
        Insert: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'is_expired' | 'view_count'>;
        Update: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>;
      };
      post_views: {
        Row: PostView;
        Insert: Omit<PostView, 'id' | 'viewed_at'>;
        Update: Partial<Omit<PostView, 'id' | 'viewed_at'>>;
      };
      comments: {
        Row: Comment;
        Insert: Omit<Comment, 'id' | 'created_at' | 'updated_at' | 'is_edited'>;
        Update: Partial<Omit<Comment, 'id' | 'created_at' | 'updated_at'>>;
      };
      ai_feedback: {
        Row: AIFeedback;
        Insert: Omit<AIFeedback, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<AIFeedback, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}

console.log('✅ Supabase client initialized successfully'); 