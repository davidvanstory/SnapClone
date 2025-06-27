/**
 * Supabase Client Configuration
 * 
 * This file configures the Supabase client for the SnapClone application.
 * It uses a HYBRID approach:
 * - Local database/API for fast development
 * - Production edge functions for AI features (since local edge functions have issues)
 */

import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// The __DEV__ global variable is `true` when running in development mode,
// and `false` when running in a production build.
const isDevelopment = __DEV__;

console.log('Running in', isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION', 'mode.');

// HYBRID CONFIGURATION:
// - Use LOCAL database/API for fast development
// - Use PRODUCTION edge functions (since local ones don't work)

// Database client (local for dev, production for prod)
const dbUrl = isDevelopment
  ? Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL_LOCAL
  : Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL;

const dbAnonKey = isDevelopment
  ? Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY_LOCAL
  : Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Edge Functions client (ALWAYS production for working AI)
const edgeFunctionsUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL;
const edgeFunctionsAnonKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Config - HYBRID MODE');
console.log('📊 Database:', isDevelopment ? 'Local' : 'Production');
console.log('⚡ Edge Functions:', 'Production (for working AI)');
console.log('📍 DB URL:', dbUrl ? 'Set ✓' : 'Missing ❌');
console.log('🔑 DB Key:', dbAnonKey ? 'Set ✓' : 'Missing ❌');
console.log('⚡ Functions URL:', edgeFunctionsUrl ? 'Set ✓' : 'Missing ❌');
console.log('🔑 Functions Key:', edgeFunctionsAnonKey ? 'Set ✓' : 'Missing ❌');

if (!dbUrl || !dbAnonKey) {
  const missingVar = !dbUrl ? 'URL' : 'Key';
  const envName = isDevelopment ? `EXPO_PUBLIC_SUPABASE_${missingVar}_LOCAL` : `EXPO_PUBLIC_SUPABASE_${missingVar}`;
  throw new Error(
    `Missing Supabase environment variable: ${envName}. Please check your .env file.`
  );
}

if (!edgeFunctionsUrl || !edgeFunctionsAnonKey) {
  throw new Error(
    `Missing production Supabase environment variables for edge functions. Please check EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.`
  );
}

/**
 * Main Supabase client for database operations
 * Uses local instance in development, production in production
 */
export const supabase = createClient(dbUrl, dbAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/**
 * Edge Functions client for AI features
 * ALWAYS uses production (since local edge functions don't work)
 */
export const supabaseEdgeFunctions = createClient(edgeFunctionsUrl, edgeFunctionsAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/**
 * Helper function to call AI edge function
 * Uses the production edge functions client
 */
export const callAIFunction = async (functionName: string, payload: any) => {
  console.log('🤖 Calling AI function:', functionName, 'on production');
  
  const { data, error } = await supabaseEdgeFunctions.functions.invoke(functionName, {
    body: payload,
  });
  
  if (error) {
    console.error('❌ AI function error:', error);
    throw error;
  }
  
  console.log('✅ AI function success:', functionName);
  return data;
};

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