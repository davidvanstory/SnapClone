/**
 * Authentication Navigation Stack Layout
 * 
 * This layout component manages the authentication flow navigation including:
 * - Login screen for existing users
 * - Registration screen for new users  
 * - Profile setup screen for completing user profile
 * - Seamless navigation between auth screens
 */

import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function AuthLayout() {
  const { user, isInitialized, initialize } = useAuthStore();

  console.log('🔐 Auth Layout - Rendering auth navigation stack');

  // Initialize auth state when component mounts
  useEffect(() => {
    console.log('🚀 Auth Layout - Initializing auth state');
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // Redirect to main app if user is authenticated
  useEffect(() => {
    if (isInitialized && user) {
      console.log('✅ Auth Layout - User authenticated, redirecting to main app');
      router.replace('/(tabs)');
    }
  }, [user, isInitialized]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen 
        name="login" 
        options={{
          title: 'Sign In',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{
          title: 'Create Account',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="profile-setup" 
        options={{
          title: 'Complete Profile',
          headerShown: false,
          gestureEnabled: false, // Prevent going back without completing profile
        }} 
      />
    </Stack>
  );
} 