/**
 * Profile Setup Screen Component
 * 
 * This screen allows new users to complete their profile for Draft:
 * - Simple name entry (optional)
 * - Quick setup for art class participation
 * - Streamlined onboarding for anxiety-reducing experience
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
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuthStore } from '../../store/authStore';

export default function ProfileSetupScreen() {
  console.log('👤 Profile Setup Screen - Rendering simplified profile setup for Draft');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Form state - simplified for Draft
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
   * Handle profile setup completion
   */
  const handleCompleteProfile = async () => {
    console.log('🚀 Profile Setup Screen - Starting simplified profile completion');

    setIsSubmitting(true);

    try {
      // For Draft, we'll use a simple approach - either the display name or email prefix
      const profileName = displayName.trim() || user?.email?.split('@')[0] || 'Artist';
      
      const result = await updateProfile({
        username: profileName.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''),
      });

      if (result.success) {
        console.log('✅ Profile Setup Screen - Profile completed successfully');
        Alert.alert(
          'Welcome to Draft!',
          'You\'re ready to start sharing your artwork in a supportive, ephemeral environment.',
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
          'Setup Error',
          'There was an issue setting up your profile. Let\'s continue anyway!',
          [
            {
              text: 'Continue',
              onPress: () => {
                console.log('🎉 Profile Setup Screen - Continuing to main app despite error');
                router.replace('/(tabs)');
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('❌ Profile Setup Screen - Unexpected profile update error:', error);
      // For Draft, we'll be forgiving and let users continue
      Alert.alert(
        'Setup Complete',
        'Welcome to Draft! You can update your name later if needed.',
        [
          {
            text: 'Continue',
            onPress: () => {
              console.log('🎉 Profile Setup Screen - Continuing to main app');
              router.replace('/(tabs)');
            },
          },
        ]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle skip profile setup (go directly to app)
   */
  const handleSkipSetup = () => {
    console.log('⏭️ Profile Setup Screen - User skipping profile setup');
    router.replace('/(tabs)');
  };

  const isFormDisabled = isLoading || isSubmitting;

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
              <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
                Welcome to Draft
              </ThemedText>
              <ThemedText type="body" style={[styles.subtitle, { color: colors.textSecondary }]}>
                Set up your profile to get started
              </ThemedText>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Display Name Input - Optional */}
              <View style={styles.inputGroup}>
                <ThemedText type="label" style={[styles.label, { color: colors.text }]}>
                  Display Name (Optional)
                </ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      borderColor: colors.border,
                      backgroundColor: colors.card,
                      color: colors.text,
                      fontFamily: 'Montserrat_400Regular',
                    }
                  ]}
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="How would you like to be known?"
                  placeholderTextColor={colors.textTertiary}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!isFormDisabled}
                />
                <ThemedText type="caption" style={[styles.helperText, { color: colors.textTertiary }]}>
                  If left blank, we'll use your email prefix
                </ThemedText>
              </View>

              {/* Complete Profile Button */}
              <TouchableOpacity
                style={[
                  styles.completeButton,
                  { 
                    backgroundColor: colors.accent,
                    opacity: isFormDisabled ? 0.6 : 1,
                  }
                ]}
                onPress={handleCompleteProfile}
                disabled={isFormDisabled}
              >
                {isSubmitting ? (
                  <View style={styles.buttonContent}>
                    <ActivityIndicator size="small" color="white" />
                    <ThemedText type="button" style={[styles.buttonText, { marginLeft: 8 }]}>Setting Up...</ThemedText>
                  </View>
                ) : (
                  <ThemedText type="button" style={styles.buttonText}>Complete Setup</ThemedText>
                )}
              </TouchableOpacity>

              {/* Skip Button */}
              <TouchableOpacity
                style={[styles.skipButton, { borderColor: colors.border }]}
                onPress={handleSkipSetup}
                disabled={isFormDisabled}
              >
                <ThemedText type="body" style={[styles.skipButtonText, { color: colors.textSecondary }]}>
                  Skip for Now
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Footer Info */}
            <View style={styles.footer}>
              <ThemedText type="caption" style={[styles.footerText, { color: colors.textTertiary }]}>
                You can update your profile anytime later
              </ThemedText>
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
    paddingTop: 64, // 8px × 8
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48, // 8px × 6
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  form: {
    flex: 1,
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
    // Typography handled via fontFamily prop
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
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  skipButton: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    // Typography handled by ThemedText
  },
  skipButtonText: {
    // Typography handled by ThemedText
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