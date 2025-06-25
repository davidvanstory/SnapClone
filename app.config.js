/**
 * Expo Configuration
 * 
 * This file configures the Expo app with environment variables
 * and all necessary settings for the VEO Creative Image Messenger app.
 */

// Load environment variables
require('dotenv').config();

console.log('🔧 App Config - Loading environment variables');
console.log('📍 EXPO_PUBLIC_SUPABASE_URL:', process.env.EXPO_PUBLIC_SUPABASE_URL ? 'Set ✓' : 'Missing ❌');
console.log('📍 EXPO_PUBLIC_SUPABASE_URL_LOCAL:', process.env.EXPO_PUBLIC_SUPABASE_URL_LOCAL ? 'Set ✓' : 'Missing ❌');

module.exports = {
  expo: {
    name: "SnapClone",
    slug: "SnapClone", 
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "snapclone",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow SnapClone to access your camera to take photos",
          microphonePermission: "Allow SnapClone to access your microphone to record videos",
          recordAudioAndroid: true
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      // Cloud Supabase Configuration
      EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
      EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      
      // Local Supabase Configuration
      EXPO_PUBLIC_SUPABASE_URL_LOCAL: process.env.EXPO_PUBLIC_SUPABASE_URL_LOCAL,
      EXPO_PUBLIC_SUPABASE_ANON_KEY_LOCAL: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY_LOCAL,
      
      // Other environment variables
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      DATABASE_URL: process.env.DATABASE_URL
    }
  }
}; 