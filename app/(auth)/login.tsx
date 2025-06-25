/**
 * Login Screen Component
 * 
 * This screen provides authentication interface for existing users including:
 * - Email and password input fields with validation
 * - Sign in functionality with error handling
 * - Navigation to registration screen
 * - Draft design system with elegant typography and spacing
 * - Loading states and user feedback
 */

import { Link, router } from 'expo-router';
import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import AuthForm, { type AuthFormData } from '../../components/auth/AuthForm';
import { ThemedText } from '../../components/ThemedText';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
  console.log('🔑 Login Screen - Rendering login interface');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Auth store
  const { signIn, isLoading } = useAuthStore();

  /**
   * Handle login form submission
   */
  const handleLogin = async (formData: AuthFormData) => {
    console.log('🚀 Login Screen - Starting login process');

    try {
      const result = await signIn(formData.email, formData.password);

      if (result.success) {
        console.log('✅ Login Screen - Login successful, redirecting');
        router.replace('/(tabs)');
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Header - Draft Branding */}
          <View style={styles.header}>
            <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
              Welcome to Draft
            </ThemedText>
            <ThemedText type="body" style={[styles.subtitle, { color: colors.textSecondary }]}>
              Sign in to join your art class
            </ThemedText>
          </View>

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
            <ThemedText type="body" style={[styles.footerText, { color: colors.textSecondary }]}>
              Don't have an account?{' '}
              <Link href="/(auth)/register" asChild>
                <ThemedText type="body" style={[styles.linkText, { color: colors.accent }]}>
                  Create Account
                </ThemedText>
              </Link>
            </ThemedText>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Draft Design System Styles - 8px Grid with Generous Whitespace
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64, // 8px × 8
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48, // 8px × 6
    gap: 8,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    textAlign: 'center',
  },
  linkText: {
    // Typography handled by ThemedText
  },
}); 