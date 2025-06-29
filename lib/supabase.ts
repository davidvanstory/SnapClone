/**
 * Supabase Client Configuration
 * 
 * This file configures the Supabase client for the SnapClone application.
 * FULL CLOUD CONFIGURATION:
 * - All operations (database, auth, storage, edge functions) use production Supabase
 * - No local development environment complexity
 * - Guaranteed data consistency for AI features
 * - Single source of truth for all data
 */

import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

console.log('🌐 FULL CLOUD MODE - All operations use production Supabase');
console.log('🔍 DEBUG: Starting Supabase client initialization...');

// Log the entire Constants.expoConfig.extra object for debugging
console.log('📋 DEBUG: Full expo config extra:', JSON.stringify(Constants.expoConfig?.extra, null, 2));

// SIMPLIFIED CONFIGURATION:
// Always use production Supabase for everything
const supabaseUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Config - CLOUD-ONLY MODE');
console.log('📍 Supabase URL:', supabaseUrl ? `Set ✓ (${supabaseUrl.substring(0, 30)}...)` : 'Missing ❌');
console.log('🔑 Supabase Key:', supabaseAnonKey ? `Set ✓ (${supabaseAnonKey.substring(0, 20)}...)` : 'Missing ❌');

// Additional debugging for environment variables
console.log('🔍 DEBUG: Raw environment check:');
console.log('  - EXPO_PUBLIC_SUPABASE_URL from Constants:', !!Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL);
console.log('  - EXPO_PUBLIC_SUPABASE_ANON_KEY from Constants:', !!Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
  const missingVars = [];
  if (!supabaseUrl) missingVars.push('EXPO_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missingVars.push('EXPO_PUBLIC_SUPABASE_ANON_KEY');
  
  console.error('❌ CRITICAL ERROR: Missing Supabase environment variables:', missingVars);
  console.error('📋 Available extra config keys:', Object.keys(Constants.expoConfig?.extra || {}));
  
  throw new Error(
    `Missing Supabase environment variables: ${missingVars.join(', ')}. Please check your .env file for:
    - EXPO_PUBLIC_SUPABASE_URL
    - EXPO_PUBLIC_SUPABASE_ANON_KEY`
  );
}

/**
 * Single Supabase client for all operations
 * Uses production cloud instance for everything:
 * - Database operations
 * - Authentication
 * - Storage
 * - Edge Functions
 * - Real-time subscriptions
 */
console.log('🏗️ Creating Supabase client with cloud credentials...');
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Test the client connection immediately
console.log('🔍 Testing Supabase client connection...');
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Supabase client connection test failed:', error);
  } else {
    console.log('✅ Supabase client connection test successful');
    console.log('📱 Current session status:', data.session ? 'Active session found' : 'No active session');
  }
}).catch((error) => {
  console.error('❌ Supabase client connection test threw error:', error);
});

/**
 * Helper function to call AI edge functions
 * Uses the same production client as everything else
 */
export const callAIFunction = async (functionName: string, payload: any) => {
  console.log('🤖 Calling AI function:', functionName, 'on production cloud');
  
  const { data, error } = await supabase.functions.invoke(functionName, {
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

/**
 * Solo AI Tutor Types
 */
export interface SoloAIChat {
  id: string;
  user_id: string;
  title?: string;
  created_at: string;
  updated_at: string;
}

export interface SoloAIMessage {
  id: string;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string;
  image_url?: string;
  embedding?: number[];
  created_at: string;
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
      solo_ai_chats: {
        Row: SoloAIChat;
        Insert: Omit<SoloAIChat, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SoloAIChat, 'id' | 'created_at' | 'updated_at'>>;
      };
      solo_ai_messages: {
        Row: SoloAIMessage;
        Insert: Omit<SoloAIMessage, 'id' | 'created_at'>;
        Update: Partial<Omit<SoloAIMessage, 'id' | 'created_at'>>;
      };
    };
  };
}

console.log('✅ Supabase client initialized successfully'); 