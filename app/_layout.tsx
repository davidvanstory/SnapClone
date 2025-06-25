import 'react-native-url-polyfill/auto';

import {
  InstrumentSerif_400Regular,
  InstrumentSerif_400Regular_Italic
} from '@expo-google-fonts/instrument-serif';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { initialize, isInitialized } = useAuthStore();
  
  const [loaded] = useFonts({
    // Draft Typography System - Instrument Serif for headers/emphasis
    InstrumentSerif_400Regular,
    InstrumentSerif_400Regular_Italic,
    
    // Draft Typography System - Montserrat for UI/body text
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    
    // Keep SpaceMono as fallback for development
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  console.log('🚀 Root Layout - Initializing Draft app with proper typography');

  // Initialize auth store when app starts
  useEffect(() => {
    console.log('🔐 Root Layout - Initializing auth store');
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen 
          name="(auth)" 
          options={{ 
            headerShown: false,
            gestureEnabled: false,
          }} 
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
