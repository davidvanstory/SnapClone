/**
 * App Index - Initial Route Handler
 * 
 * This component handles the initial routing logic:
 * - Redirects unauthenticated users to the auth flow
 * - Redirects authenticated users to the main app tabs
 * - Shows loading while determining auth state
 */

import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function IndexScreen() {
  const { user, isInitialized, isLoading } = useAuthStore();
  const colorScheme = useColorScheme();

  console.log('🏠 Index Screen - Checking auth state');
  console.log('👤 User:', user ? 'Authenticated' : 'Not authenticated');
  console.log('⚙️ Auth state:', { isInitialized, isLoading });

  useEffect(() => {
    if (!isInitialized) {
      console.log('⏳ Index Screen - Auth not initialized yet, waiting...');
      return;
    }

    if (user) {
      console.log('✅ Index Screen - User authenticated, redirecting to tabs');
      router.replace('/(tabs)');
    } else {
      console.log('🔒 Index Screen - User not authenticated, redirecting to auth');
      router.replace('/(auth)/login');
    }
  }, [user, isInitialized]);

  // Show loading screen while determining auth state
  console.log('⏳ Index Screen - Showing loading screen');
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorScheme === 'dark' ? '#151718' : '#fff'
    }}>
      <ActivityIndicator 
        size="large" 
        color={colorScheme === 'dark' ? '#fff' : '#0a7ea4'} 
      />
    </View>
  );
} 