/**
 * Login Screen Component - Glass Morphism Implementation
 * 
 * This screen implements the login interface from UIDesign.md specifications:
 * - Clean white background with subtle paper texture
 * - Glass morphism container (Primary Glass Card specs)
 * - Large app icon (160x160) as primary branding element
 * - Email/password inputs with glass morphism styling
 * - Warm sage accent color for focus states
 * - Typography hierarchy per UIDesign.md exact specifications
 */

import { Link, router } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import AuthForm, { type AuthFormData } from '../../components/auth/AuthForm';
import { ThemedText } from '../../components/ThemedText';
import GlassMorphismCard from '../../components/ui/GlassMorphismCard';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
  console.log('🔑 Login Screen - Rendering glass morphism login interface');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Auth store
  const { signIn, isLoading } = useAuthStore();

  /**
   * Handle login form submission
   */
  const handleLogin = async (formData: AuthFormData) => {
    console.log('🚀 Login Screen - Starting login process');
    console.log('🔍 DEBUG: Login attempt with:', {
      email: formData.email,
      hasPassword: !!formData.password,
      passwordLength: formData.password.length
    });

    try {
      console.log('📡 Login Screen - Calling signIn from auth store...');
      const result = await signIn(formData.email, formData.password);

      console.log('🔍 DEBUG: Sign in result:', {
        success: result.success,
        hasError: !!result.error,
        errorMessage: result.error
      });

      if (result.success) {
        console.log('✅ Login Screen - Login successful, redirecting to camera');
        router.replace('/(tabs)/camera');
      } else {
        console.error('❌ Login Screen - Login failed:', result.error);
        Alert.alert(
          'Login Failed',
          result.error || 'An error occurred during login. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('❌ Login Screen - Unexpected login error:', error);
      console.error('🔍 DEBUG: Unexpected login error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      Alert.alert(
        'Login Error',
        'An unexpected error occurred. Please try again.',
        [{ text: 'OK' }]
      );
      throw error; // Re-throw so AuthForm can handle loading state
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Soft gradient background per UIDesign.md */}
      <View style={[styles.backgroundGradient, { backgroundColor: colors.surface }]} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Header - JUNI Branding moved above card for 20% higher positioning */}
          <View style={styles.headerAboveCard}>
            {/* App Icon - 2x larger */}
            <Image 
              source={require('../../assets/images/icon.png')} 
              style={styles.appIcon}
              resizeMode="contain"
            />
            <ThemedText type="bodyText" style={[styles.subtitle, { color: colors.textSecondary }]}>
              Grow as an artist with peers and AI
            </ThemedText>
          </View>

          {/* Glass Morphism Card Container per UIDesign.md */}
          <GlassMorphismCard type="primary" style={styles.loginCard}>
            {/* Form */}
            <View style={styles.form}>
              <AuthForm
                mode="login"
                onSubmit={handleLogin}
                isLoading={isLoading}
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <ThemedText type="bodyText" style={[styles.footerText, { color: colors.textSecondary }]}>
                Don't have an account?{' '}
                <Link href="/(auth)/register" asChild>
                  <ThemedText type="link" style={[styles.linkText, { color: colors.accentSage }]}>
                    Create Account
                  </ThemedText>
                </Link>
              </ThemedText>
            </View>
          </GlassMorphismCard>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Glass Morphism Design System Styles per UIDesign.md
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Subtle gradient from #F8F8F8 to #FFFFFF per UIDesign.md
    opacity: 0.5,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start', // Changed to flex-start to allow custom positioning
    paddingHorizontal: 20,        // 20px screen margins per UIDesign.md
    paddingVertical: 40,
  },
  headerAboveCard: {
    alignItems: 'center',
    marginTop: '15%',            // Position header 15% from top (20% higher than center)
    marginBottom: 32,            // Space between header and card
    gap: 12,                     // 12px gap to accommodate icon
  },
  loginCard: {
    padding: 24,                 // 24px section spacing per UIDesign.md
    marginHorizontal: 4,         // Slight margin for card shadow visibility
  },
  appIcon: {
    width: 160,                  // 2x larger - prominent branding
    height: 160,
    marginBottom: 16,            // Increased space between icon and subtitle
  },
  subtitle: {
    textAlign: 'center',
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  form: {
    marginBottom: 24,            // 24px section spacing
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  linkText: {
    // Warm sage color applied via color prop
    // Montserrat 16pt Medium per UIDesign.md applied via ThemedText type="link"
  },
}); 