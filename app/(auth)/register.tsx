/**
 * Registration Screen Component
 * 
 * This screen provides user registration interface including:
 * - Email and password input fields with validation
 * - Password confirmation and strength validation
 * - User registration with error handling
 * - Navigation to login screen
 * - Loading states and user feedback
 */

import { Link, router } from 'expo-router';
import React from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import AuthForm, { type AuthFormData } from '../../components/auth/AuthForm';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuthStore } from '../../store/authStore';

export default function RegisterScreen() {
  console.log('📝 Register Screen - Rendering registration interface');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Auth store
  const { signUp, isLoading } = useAuthStore();

  /**
   * Handle registration form submission
   */
  const handleRegister = async (formData: AuthFormData) => {
    console.log('🚀 Register Screen - Starting registration process');

    try {
      const result = await signUp(formData.email, formData.password);

      if (result.success) {
        console.log('✅ Register Screen - Registration successful');
        Alert.alert(
          'Registration Successful',
          'Please check your email for a verification link before signing in.',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('📧 Register Screen - Redirecting to login for verification');
                router.replace('/(auth)/login');
              },
            },
          ]
        );
      } else {
        console.error('❌ Register Screen - Registration failed:', result.error);
        Alert.alert(
          'Registration Failed',
          result.error || 'An error occurred during registration. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('❌ Register Screen - Unexpected registration error:', error);
      Alert.alert(
        'Registration Error',
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
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>
                Create Account
              </Text>
              <Text style={[styles.subtitle, { color: colors.text }]}>
                Join VEO Creative Image Messenger
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <AuthForm
                mode="register"
                onSubmit={handleRegister}
                isLoading={isLoading}
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.text }]}>
                Already have an account?{' '}
                <Link href="/(auth)/login" asChild>
                  <Text style={[styles.linkText, { color: colors.tint }]}>
                    Sign In
                  </Text>
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
  errorContainer: {
    marginTop: 4,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 4,
  },
  registerButton: {
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