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
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { validateEmail } from '../../lib/auth';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
  console.log('🔑 Login Screen - Rendering login interface');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auth store
  const { signIn, isLoading } = useAuthStore();

  /**
   * Validate form inputs
   */
  const validateForm = (): boolean => {
    console.log('✅ Login Screen - Validating form inputs');
    let isValid = true;

    // Reset previous errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    console.log('📝 Login Screen - Form validation result:', isValid);
    return isValid;
  };

  /**
   * Handle login form submission
   */
  const handleLogin = async () => {
    console.log('🚀 Login Screen - Starting login process');

    if (!validateForm()) {
      console.log('❌ Login Screen - Form validation failed');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signIn(email.trim(), password);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled = isLoading || isSubmitting;

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
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Email Address
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    borderColor: emailError ? '#FF6B6B' : colors.border,
                    backgroundColor: colors.card,
                    color: colors.text,
                  }
                ]}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                }}
                placeholder="Enter your email"
                placeholderTextColor={colors.tabIconDefault}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isFormDisabled}
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Password
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    borderColor: passwordError ? '#FF6B6B' : colors.border,
                    backgroundColor: colors.card,
                    color: colors.text,
                  }
                ]}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                }}
                placeholder="Enter your password"
                placeholderTextColor={colors.tabIconDefault}
                secureTextEntry
                editable={!isFormDisabled}
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                { 
                  backgroundColor: isFormDisabled ? colors.tabIconDefault : colors.tint,
                  opacity: isFormDisabled ? 0.6 : 1,
                }
              ]}
              onPress={handleLogin}
              disabled={isFormDisabled}
            >
              {isFormDisabled ? (
                <View style={styles.buttonContent}>
                  <ActivityIndicator size="small" color="white" />
                  <Text style={styles.buttonText}>Signing In...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>
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