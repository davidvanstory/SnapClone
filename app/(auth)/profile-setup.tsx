/**
 * Profile Setup Screen Component
 * 
 * This screen allows new users to complete their profile including:
 * - Username selection with availability checking
 * - Optional avatar upload functionality
 * - Profile completion with validation
 * - Onboarding completion and navigation to main app
 */

import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
import { checkUsernameAvailability, validateUsername } from '../../lib/auth';
import { useAuthStore } from '../../store/authStore';

export default function ProfileSetupScreen() {
  console.log('👤 Profile Setup Screen - Rendering profile setup interface');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Form state
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  // Auth store
  const { user, updateProfile, isLoading } = useAuthStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      console.log('❌ Profile Setup Screen - User not authenticated, redirecting to login');
      router.replace('/(auth)/login');
    }
  }, [user]);

  /**
   * Check username availability with debouncing
   */
  useEffect(() => {
    const checkUsername = async () => {
      if (!username.trim()) {
        setUsernameAvailable(null);
        return;
      }

      const validation = validateUsername(username);
      if (!validation.isValid) {
        setUsernameError(validation.error || '');
        setUsernameAvailable(null);
        return;
      }

      setIsCheckingUsername(true);
      setUsernameError('');

      try {
        const result = await checkUsernameAvailability(username);
        if (result.error) {
          setUsernameError(result.error);
          setUsernameAvailable(null);
        } else {
          setUsernameAvailable(result.isAvailable);
          if (!result.isAvailable) {
            setUsernameError('Username is already taken');
          }
        }
      } catch (error) {
        console.error('❌ Profile Setup Screen - Username check error:', error);
        setUsernameError('Failed to check username availability');
        setUsernameAvailable(null);
      } finally {
        setIsCheckingUsername(false);
      }
    };

    // Debounce username checking
    const timeoutId = setTimeout(checkUsername, 500);
    return () => clearTimeout(timeoutId);
  }, [username]);

  /**
   * Handle profile setup completion
   */
  const handleCompleteProfile = async () => {
    console.log('🚀 Profile Setup Screen - Starting profile completion');

    // Validate username
    const validation = validateUsername(username);
    if (!validation.isValid) {
      setUsernameError(validation.error || '');
      return;
    }

    if (!usernameAvailable) {
      setUsernameError('Please choose an available username');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updateProfile({
        username: username.toLowerCase().trim(),
      });

      if (result.success) {
        console.log('✅ Profile Setup Screen - Profile completed successfully');
        Alert.alert(
          'Profile Complete!',
          'Welcome to VEO Creative Image Messenger! You can now start creating and sharing AI-generated images with your groups.',
          [
            {
              text: 'Get Started',
              onPress: () => {
                console.log('🎉 Profile Setup Screen - Redirecting to main app');
                router.replace('/(tabs)');
              },
            },
          ]
        );
      } else {
        console.error('❌ Profile Setup Screen - Profile update failed:', result.error);
        Alert.alert(
          'Profile Update Failed',
          result.error || 'An error occurred while updating your profile. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('❌ Profile Setup Screen - Unexpected profile update error:', error);
      Alert.alert(
        'Profile Update Error',
        'An unexpected error occurred. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle skip profile setup (complete later)
   */
  const handleSkipSetup = () => {
    console.log('⏭️ Profile Setup Screen - User skipping profile setup');
    Alert.alert(
      'Skip Profile Setup?',
      'You can complete your profile later in Settings. Would you like to continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip',
          onPress: () => {
            console.log('✅ Profile Setup Screen - Skipping to main app');
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  const isFormDisabled = isLoading || isSubmitting || isCheckingUsername;
  const canSubmit = username.trim() && usernameAvailable && !isFormDisabled;

  // Show loading if user is not loaded yet
  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      </SafeAreaView>
    );
  }

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
                Complete Your Profile
              </Text>
              <Text style={[styles.subtitle, { color: colors.text }]}>
                Choose a username to get started
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Username Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Username
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        borderColor: usernameError ? '#FF6B6B' : usernameAvailable ? '#4CAF50' : colors.border,
                        backgroundColor: colors.card,
                        color: colors.text,
                      }
                    ]}
                    value={username}
                    onChangeText={(text) => {
                      setUsername(text);
                      setUsernameError('');
                      setUsernameAvailable(null);
                    }}
                    placeholder="Enter your username"
                    placeholderTextColor={colors.tabIconDefault}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isFormDisabled}
                  />
                  {isCheckingUsername && (
                    <View style={styles.inputIcon}>
                      <ActivityIndicator size="small" color={colors.tint} />
                    </View>
                  )}
                  {!isCheckingUsername && usernameAvailable === true && (
                    <View style={styles.inputIcon}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </View>
                {usernameError ? (
                  <Text style={styles.errorText}>{usernameError}</Text>
                ) : usernameAvailable === true ? (
                  <Text style={styles.successText}>Username is available!</Text>
                ) : null}
                <Text style={[styles.helperText, { color: colors.tabIconDefault }]}>
                  3-20 characters, letters, numbers, and underscores only
                </Text>
              </View>

              {/* Complete Profile Button */}
              <TouchableOpacity
                style={[
                  styles.completeButton,
                  { 
                    backgroundColor: canSubmit ? colors.tint : colors.tabIconDefault,
                    opacity: canSubmit ? 1 : 0.6,
                  }
                ]}
                onPress={handleCompleteProfile}
                disabled={!canSubmit}
              >
                {isSubmitting ? (
                  <View style={styles.buttonContent}>
                    <ActivityIndicator size="small" color="white" />
                    <Text style={styles.buttonText}>Completing Profile...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Complete Profile</Text>
                )}
              </TouchableOpacity>

              {/* Skip Button */}
              <TouchableOpacity
                style={[styles.skipButton, { borderColor: colors.border }]}
                onPress={handleSkipSetup}
                disabled={isFormDisabled}
              >
                <Text style={[styles.skipButtonText, { color: colors.text }]}>
                  Skip for Now
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer Info */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.tabIconDefault }]}>
                You can update your profile anytime in Settings
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
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
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
    top: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 4,
  },
  successText: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
  },
  completeButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  skipButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
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
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
}); 