/**
 * Reusable Authentication Form Component
 * 
 * This component provides a consistent authentication form interface that can be used for both
 * login and registration flows. It includes:
 * - Email and password input fields with validation
 * - Optional password confirmation for registration
 * - Draft design system with Instrument Serif + Montserrat typography
 * - Monochromatic color scheme and elegant spacing
 * - Consistent styling and error handling
 * - Loading states and form submission
 * - Configurable mode (login vs register)
 */

import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { validateEmail, validatePassword } from '../../lib/auth';
import { ThemedText } from '../ThemedText';

// Form mode type
export type AuthFormMode = 'login' | 'register';

// Form data interface
export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

// Component props interface
export interface AuthFormProps {
  mode: AuthFormMode;
  onSubmit: (data: AuthFormData) => Promise<void>;
  isLoading?: boolean;
  submitButtonText?: string;
  loadingButtonText?: string;
}

export default function AuthForm({
  mode,
  onSubmit,
  isLoading = false,
  submitButtonText,
  loadingButtonText,
}: AuthFormProps) {
  console.log(`📝 AuthForm - Rendering ${mode} form`);

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

  // Default button texts based on mode
  const defaultSubmitText = mode === 'login' ? 'Sign In to Draft' : 'Join Draft';
  const defaultLoadingText = mode === 'login' ? 'Signing In...' : 'Creating Account...';
  
  const finalSubmitText = submitButtonText || defaultSubmitText;
  const finalLoadingText = loadingButtonText || defaultLoadingText;

  /**
   * Validate form inputs based on mode
   */
  const validateForm = (): boolean => {
    console.log(`✅ AuthForm - Validating ${mode} form inputs`);
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
    } else if (mode === 'login') {
      // Login: basic length check
      if (password.length < 6) {
        setPasswordErrors(['Password must be at least 6 characters']);
        isValid = false;
      }
    } else {
      // Register: comprehensive validation
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        setPasswordErrors(passwordValidation.errors);
        isValid = false;
      }
    }

    // Validate password confirmation (register mode only)
    if (mode === 'register') {
      if (!confirmPassword.trim()) {
        setConfirmPasswordError('Please confirm your password');
        isValid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        isValid = false;
      }
    }

    console.log(`📝 AuthForm - ${mode} form validation result:`, isValid);
    return isValid;
  };

  /**
   * Clear specific field error when user starts typing
   */
  const clearFieldError = (field: 'email' | 'password' | 'confirmPassword') => {
    switch (field) {
      case 'email':
        if (emailError) setEmailError('');
        break;
      case 'password':
        if (passwordErrors.length > 0) setPasswordErrors([]);
        break;
      case 'confirmPassword':
        if (confirmPasswordError) setConfirmPasswordError('');
        break;
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    console.log(`🚀 AuthForm - Starting ${mode} form submission`);

    if (!validateForm()) {
      console.log(`❌ AuthForm - ${mode} form validation failed`);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData: AuthFormData = {
        email: email.trim(),
        password,
      };

      // Add confirm password for registration
      if (mode === 'register') {
        formData.confirmPassword = confirmPassword;
      }

      await onSubmit(formData);
      console.log(`✅ AuthForm - ${mode} form submitted successfully`);
    } catch (error) {
      console.error(`❌ AuthForm - ${mode} form submission error:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled = isLoading || isSubmitting;

  return (
    <View style={styles.container}>
      {/* Email Input */}
      <View style={styles.inputGroup}>
        <ThemedText type="label" style={[styles.label, { color: colors.text }]}>
          Email Address
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            { 
              borderColor: emailError ? '#FF6B6B' : colors.border,
              backgroundColor: colors.surface,
              color: colors.text,
              fontFamily: 'Montserrat_400Regular',
            }
          ]}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            clearFieldError('email');
          }}
          placeholder="Enter your email"
          placeholderTextColor={colors.textTertiary}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isFormDisabled}
          testID="auth-form-email-input"
        />
        {emailError ? (
          <ThemedText type="caption" style={styles.errorText}>{emailError}</ThemedText>
        ) : null}
      </View>

      {/* Password Input */}
      <View style={styles.inputGroup}>
        <ThemedText type="label" style={[styles.label, { color: colors.text }]}>
          Password
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            { 
              borderColor: passwordErrors.length > 0 ? '#FF6B6B' : colors.border,
              backgroundColor: colors.surface,
              color: colors.text,
              fontFamily: 'Montserrat_400Regular',
            }
          ]}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            clearFieldError('password');
          }}
          placeholder="Enter your password"
          placeholderTextColor={colors.textTertiary}
          secureTextEntry
          editable={!isFormDisabled}
          testID="auth-form-password-input"
        />
        {passwordErrors.length > 0 ? (
          <View style={styles.errorContainer}>
            {passwordErrors.map((error, index) => (
              <ThemedText key={index} type="caption" style={styles.errorText}>
                • {error}
              </ThemedText>
            ))}
          </View>
        ) : null}
      </View>

      {/* Confirm Password Input (Register mode only) */}
      {mode === 'register' && (
        <View style={styles.inputGroup}>
          <ThemedText type="label" style={[styles.label, { color: colors.text }]}>
            Confirm Password
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              { 
                borderColor: confirmPasswordError ? '#FF6B6B' : colors.border,
                backgroundColor: colors.surface,
                color: colors.text,
                fontFamily: 'Montserrat_400Regular',
              }
            ]}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              clearFieldError('confirmPassword');
            }}
            placeholder="Confirm your password"
            placeholderTextColor={colors.textTertiary}
            secureTextEntry
            editable={!isFormDisabled}
            testID="auth-form-confirm-password-input"
          />
          {confirmPasswordError ? (
            <ThemedText type="caption" style={styles.errorText}>{confirmPasswordError}</ThemedText>
          ) : null}
        </View>
      )}

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          { 
            backgroundColor: isFormDisabled ? colors.textDisabled : colors.accent,
            opacity: isFormDisabled ? 0.6 : 1,
          }
        ]}
        onPress={handleSubmit}
        disabled={isFormDisabled}
        testID="auth-form-submit-button"
      >
        {isFormDisabled ? (
          <View style={styles.buttonContent}>
            <ActivityIndicator size="small" color="white" />
            <ThemedText type="button" style={[styles.buttonText, { marginLeft: 8 }]}>
              {finalLoadingText}
            </ThemedText>
          </View>
        ) : (
          <ThemedText type="button" style={styles.buttonText}>
            {finalSubmitText}
          </ThemedText>
        )}
      </TouchableOpacity>
    </View>
  );
}

// Draft Design System Styles - 8px Grid
const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 24, // 8px × 3
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    // Typography handled by ThemedText
  },
  input: {
    height: 56, // Thumb-friendly touch target
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    // Draft design with generous spacing
  },
  errorContainer: {
    gap: 4,
  },
  errorText: {
    color: '#FF6B6B',
  },
  submitButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    // Subtle shadow for elevation
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
  },
}); 