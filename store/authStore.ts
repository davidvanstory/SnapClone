/**
 * Authentication Store using Zustand
 * 
 * This store manages global authentication state including:
 * - User session management
 * - Login/logout functionality
 * - Registration handling
 * - Session persistence and restoration
 */

import type { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// User profile interface matching our database schema
export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Authentication state interface
export interface AuthState {
  // Current state
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  
  // Actions
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<UserProfile, 'username' | 'avatar_url'>>) => Promise<{ success: boolean; error?: string }>;
  initialize: () => Promise<void>;
  
  // Internal state setters
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  profile: null,
  session: null,
  isLoading: false,
  isInitialized: false,

  // Initialize auth state and set up listener
  initialize: async () => {
    console.log('🔐 Auth Store - Initializing authentication state');
    set({ isLoading: true });

    try {
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('❌ Auth Store - Session error:', sessionError);
        throw sessionError;
      }

      console.log('📱 Auth Store - Current session:', session ? 'Found' : 'None');
      
      if (session?.user) {
        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('❌ Auth Store - Profile fetch error:', profileError);
        }

        console.log('👤 Auth Store - User profile:', profile ? 'Loaded' : 'Creating...');
        
        set({
          user: session.user,
          session: session,
          profile: profile || null,
        });
      }

      // Set up auth state change listener
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('🔄 Auth Store - Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session?.user) {
          // Fetch or create user profile
          let { data: profile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError && profileError.code === 'PGRST116') {
            // Profile doesn't exist, create it
            console.log('✨ Auth Store - Creating new user profile');
            const { data: newProfile, error: createError } = await supabase
              .from('users')
              .insert({
                id: session.user.id,
                email: session.user.email!,
              })
              .select()
              .single();

            if (createError) {
              console.error('❌ Auth Store - Profile creation error:', createError);
            } else {
              profile = newProfile;
            }
          }

          set({
            user: session.user,
            session: session,
            profile: profile || null,
          });
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 Auth Store - User signed out');
          set({
            user: null,
            session: null,
            profile: null,
          });
        }
      });

    } catch (error) {
      console.error('❌ Auth Store - Initialization error:', error);
    } finally {
      set({ isLoading: false, isInitialized: true });
    }
  },

  // Sign up new user
  signUp: async (email: string, password: string) => {
    console.log('📝 Auth Store - Starting user registration');
    set({ isLoading: true });

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('❌ Auth Store - Sign up error:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Auth Store - User registered successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Auth Store - Sign up unexpected error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      };
    } finally {
      set({ isLoading: false });
    }
  },

  // Sign in existing user
  signIn: async (email: string, password: string) => {
    console.log('🔑 Auth Store - Starting user sign in');
    set({ isLoading: true });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Auth Store - Sign in error:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Auth Store - User signed in successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Auth Store - Sign in unexpected error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign in failed' 
      };
    } finally {
      set({ isLoading: false });
    }
  },

  // Sign out current user
  signOut: async () => {
    console.log('👋 Auth Store - Starting user sign out');
    set({ isLoading: true });

    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Auth Store - Sign out error:', error);
        throw error;
      }

      console.log('✅ Auth Store - User signed out successfully');
    } catch (error) {
      console.error('❌ Auth Store - Sign out unexpected error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Update user profile
  updateProfile: async (updates) => {
    console.log('📝 Auth Store - Updating user profile');
    const { user } = get();
    
    if (!user) {
      return { success: false, error: 'No user logged in' };
    }

    set({ isLoading: true });

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('❌ Auth Store - Profile update error:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Auth Store - Profile updated successfully');
      set({ profile: data });
      return { success: true };
    } catch (error) {
      console.error('❌ Auth Store - Profile update unexpected error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Profile update failed' 
      };
    } finally {
      set({ isLoading: false });
    }
  },

  // State setters
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),
})); 