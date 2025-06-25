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
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { validateEmail, validatePassword } from '../../lib/auth';
import { useAuthStore } from '../../store/authStore';

export default function RegisterScreen() {
  console.log('📝 Register Screen - Rendering registration interface');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auth store
  const { signUp, isLoading } = useAuthStore();

  /**
   * Validate form inputs
   */
  const validateForm = (): boolean => {
    console.log('✅ Register Screen - Validating form inputs');
    let isValid = true;

    // Reset previous errors
    setEmailError('');
    setPasswordErrors([]);
    setConfirmPasswordError('');

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
      setPasswordErrors(['Password is required']);
      isValid = false;
    } else {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        setPasswordErrors(passwordValidation.errors);
        isValid = false;
      }
    }

    // Validate password confirmation
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    console.log('📝 Register Screen - Form validation result:', isValid);
    return isValid;
  };

  /**
   * Handle registration form submission
   */
  const handleRegister = async () => {
    console.log('🚀 Register Screen - Starting registration process');

    if (!validateForm()) {
      console.log('❌ Register Screen - Form validation failed');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signUp(email.trim(), password);

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
                      borderColor: passwordErrors.length > 0 ? '#FF6B6B' : colors.border,
                      backgroundColor: colors.card,
                      color: colors.text,
                    }
                  ]}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordErrors.length > 0) setPasswordErrors([]);
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.tabIconDefault}
                  secureTextEntry
                  editable={!isFormDisabled}
                />
                {passwordErrors.length > 0 ? (
                  <View style={styles.errorContainer}>
                    {passwordErrors.map((error, index) => (
                      <Text key={index} style={styles.errorText}>
                        • {error}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Confirm Password
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      borderColor: confirmPasswordError ? '#FF6B6B' : colors.border,
                      backgroundColor: colors.card,
                      color: colors.text,
                    }
                  ]}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (confirmPasswordError) setConfirmPasswordError('');
                  }}
                  placeholder="Confirm your password"
                  placeholderTextColor={colors.tabIconDefault}
                  secureTextEntry
                  editable={!isFormDisabled}
                />
                {confirmPasswordError ? (
                  <Text style={styles.errorText}>{confirmPasswordError}</Text>
                ) : null}
              </View>

              {/* Register Button */}
              <TouchableOpacity
                style={[
                  styles.registerButton,
                  { 
                    backgroundColor: isFormDisabled ? colors.tabIconDefault : colors.tint,
                    opacity: isFormDisabled ? 0.6 : 1,
                  }
                ]}
                onPress={handleRegister}
                disabled={isFormDisabled}
              >
                {isFormDisabled ? (
                  <View style={styles.buttonContent}>
                    <ActivityIndicator size="small" color="white" />
                    <Text style={styles.buttonText}>Creating Account...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Create Account</Text>
                )}
              </TouchableOpacity>
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