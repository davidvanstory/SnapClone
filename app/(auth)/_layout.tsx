/**
 * Authentication Navigation Stack Layout
 * 
 * This layout component manages the authentication flow navigation including:
 * - Login screen for existing users
 * - Registration screen for new users  
 * - Profile setup screen for completing user profile
 * - Seamless navigation between auth screens
 */

import { Stack } from 'expo-router';

export default function AuthLayout() {
  console.log('🔐 Auth Layout - Rendering auth navigation stack');

  return (
    <Stack
      initialRouteName="login"
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