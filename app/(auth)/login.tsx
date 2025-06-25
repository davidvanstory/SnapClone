/**
 * Login Screen Component
 * 
 * This screen provides authentication interface for existing users including:
 * - Email and password input fields with validation
 * - Sign in functionality with error handling
 * - Navigation to registration screen
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
    Text,
    View,
} from 'react-native';
import AuthForm, { type AuthFormData } from '../../components/auth/AuthForm';
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Welcome Back
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>
              Sign in to your account
            </Text>
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
            <Text style={[styles.footerText, { color: colors.text }]}>
              Don't have an account?{' '}
              <Link href="/(auth)/register" asChild>
                <Text style={[styles.linkText, { color: colors.tint }]}>
                  Create Account
                </Text>
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 4,
  },
  loginButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
  },
  linkText: {
    fontWeight: '600',
  },
}); 