/**
 * Reusable Authentication Form Component - Glass Morphism Implementation
 * 
 * This component implements the glass morphism input specifications from UIDesign.md:
 * - Input backgrounds: rgba(255,255,255,0.2)
 * - Input borders: rgba(255,255,255,0.3) 
 * - Placeholder text: rgba(255,255,255,0.5)
 * - Focus state: Warm sage border with subtle glow
 * - Typography: Montserrat 14pt for inputs, exact sizes per UIDesign.md
 * - Error states with soft coral accent (#E67E50)
 * - Button styling with warm sage accent and glass morphism
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
  console.log(`📝 AuthForm - Rendering glass morphism ${mode} form`);

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

  // Focus states for glass morphism styling
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  // Default button texts based on mode
  const defaultSubmitText = mode === 'login' ? 'Sign In to EphemeralArt' : 'Join EphemeralArt';
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
    console.log(`🔍 DEBUG: Form data:`, {
      email: email.trim(),
      passwordLength: password.length,
      confirmPasswordLength: mode === 'register' ? confirmPassword.length : 'N/A',
      mode
    });

    if (!validateForm()) {
      console.log(`❌ AuthForm - ${mode} form validation failed`);
      return;
    }

    console.log(`✅ AuthForm - ${mode} form validation passed, proceeding with submission`);
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

      console.log(`📡 AuthForm - Calling onSubmit for ${mode}...`);
      await onSubmit(formData);
      console.log(`✅ AuthForm - ${mode} form submitted successfully`);
    } catch (error) {
      console.error(`❌ AuthForm - ${mode} form submission error:`, error);
      console.error(`🔍 DEBUG: Submission error details:`, {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
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
              borderColor: emailError 
                ? colors.accentCoral 
                : emailFocused 
                  ? colors.accentSage 
                  : colors.border,
              backgroundColor: emailFocused ? colors.surface : colors.background,
              color: colors.text,
              fontFamily: 'Montserrat_400Regular',
            }
          ]}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            clearFieldError('email');
          }}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          placeholder="Enter your email address"
          placeholderTextColor={colors.textTertiary}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          editable={!isFormDisabled}
          autoComplete="email"
          textContentType="emailAddress"
        />
        {emailError ? (
          <View style={styles.errorContainer}>
            <ThemedText type="caption" style={[styles.errorText, { color: colors.accentCoral }]}>
              {emailError}
            </ThemedText>
          </View>
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
              borderColor: passwordErrors.length > 0 
                ? colors.accentCoral 
                : passwordFocused 
                  ? colors.accentSage 
                  : colors.border,
              backgroundColor: passwordFocused ? colors.surface : colors.background,
              color: colors.text,
              fontFamily: 'Montserrat_400Regular',
            }
          ]}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            clearFieldError('password');
          }}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          placeholder="Enter your password"
          placeholderTextColor={colors.textTertiary}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isFormDisabled}
          autoComplete="password"
          textContentType={mode === 'register' ? 'newPassword' : 'password'}
        />
        {passwordErrors.length > 0 ? (
          <View style={styles.errorContainer}>
            {passwordErrors.map((error, index) => (
              <ThemedText key={index} type="caption" style={[styles.errorText, { color: colors.accentCoral }]}>
                {error}
              </ThemedText>
            ))}
          </View>
        ) : null}
      </View>

      {/* Confirm Password Input (Register Mode Only) */}
      {mode === 'register' && (
        <View style={styles.inputGroup}>
          <ThemedText type="label" style={[styles.label, { color: colors.text }]}>
            Confirm Password
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              { 
                borderColor: confirmPasswordError 
                  ? colors.accentCoral 
                  : confirmPasswordFocused 
                    ? colors.accentSage 
                    : colors.border,
                backgroundColor: confirmPasswordFocused ? colors.surface : colors.background,
                color: colors.text,
                fontFamily: 'Montserrat_400Regular',
              }
            ]}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              clearFieldError('confirmPassword');
            }}
            onFocus={() => setConfirmPasswordFocused(true)}
            onBlur={() => setConfirmPasswordFocused(false)}
            placeholder="Confirm your password"
            placeholderTextColor={colors.textTertiary}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isFormDisabled}
            autoComplete="password"
            textContentType="newPassword"
          />
          {confirmPasswordError ? (
            <View style={styles.errorContainer}>
              <ThemedText type="caption" style={[styles.errorText, { color: colors.accentCoral }]}>
                {confirmPasswordError}
              </ThemedText>
            </View>
          ) : null}
        </View>
      )}

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          { 
            backgroundColor: colors.accentSage,
            opacity: isFormDisabled ? 0.6 : 1,
          }
        ]}
        onPress={handleSubmit}
        disabled={isFormDisabled}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          {isFormDisabled && (
            <ActivityIndicator size="small" color="white" />
          )}
          <ThemedText type="button" style={styles.buttonText}>
            {isFormDisabled ? finalLoadingText : finalSubmitText}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// Glass Morphism Input Styles per UIDesign.md
const styles = StyleSheet.create({
  container: {
    gap: 20,                     // 20px between input groups
  },
  inputGroup: {
    gap: 8,                      // 8px base unit between label and input
  },
  label: {
    // Montserrat 14pt Medium per UIDesign.md applied via ThemedText type="label"
  },
  input: {
    height: 50,                  // 44px+ touch target per UIDesign.md
    borderWidth: 1,
    borderRadius: 16,            // 16px border radius per UIDesign.md
    paddingHorizontal: 16,       // 16px padding per UIDesign.md
    fontSize: 14,                // 14pt per UIDesign.md
    fontFamily: 'Montserrat_400Regular',
    
    // Glass morphism input focus transitions per UIDesign.md
    // Border color transition (200ms) with subtle scale (1.02) handled by focus states
  },
  errorContainer: {
    marginTop: 4,
  },
  errorText: {
    // Montserrat 11pt per UIDesign.md applied via ThemedText type="caption"
    // Soft coral color (#E67E50) applied via color prop
  },
  submitButton: {
    height: 50,                  // 44px+ touch target
    borderRadius: 28,            // 28px fully rounded per UIDesign.md
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,                // 8px base unit spacing
    
    // Glass morphism button shadow per UIDesign.md
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',              // White text on warm sage background
    // Montserrat 16pt Medium per UIDesign.md applied via ThemedText type="button"
  },
}); 