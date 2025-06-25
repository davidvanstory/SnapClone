/**
 * Profile Setup Screen Component - Simplified for EphemeralArt
 * 
 * This screen implements the welcome screen from UIDesign.md specifications:
 * - Centered content with generous whitespace
 * - "Welcome, [Name]!" in Instrument Serif 32pt
 * - Simplified optional name entry for EphemeralArt
 * - "Join a Class" button with warm sage background
 * - Glass morphism styling consistent with auth flow
 * - Streamlined onboarding for anxiety-reducing experience
 */

import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
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
import GlassMorphismCard from '../../components/ui/GlassMorphismCard';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuthStore } from '../../store/authStore';

export default function ProfileSetupScreen() {
  console.log('👤 Profile Setup Screen - Rendering simplified EphemeralArt welcome setup');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Form state - simplified for EphemeralArt
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);

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
   * Handle profile setup completion (optional step)
   */
  const handleCompleteProfile = async () => {
    console.log('🚀 Profile Setup Screen - Starting simplified profile completion');

    setIsSubmitting(true);

    try {
      // For EphemeralArt, we'll use a simple approach - either the display name or email prefix
      const profileName = displayName.trim() || user?.email?.split('@')[0] || 'Artist';
      
      const result = await updateProfile({
        username: profileName.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''),
      });

      if (result.success) {
        console.log('✅ Profile Setup Screen - Profile completed successfully, proceeding to class selection');
        // Go directly to main app where they can join a class
        router.replace('/(tabs)');
      } else {
        console.log('⚠️ Profile Setup Screen - Profile update failed, continuing anyway');
        // For EphemeralArt, we'll be forgiving and let users continue
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('❌ Profile Setup Screen - Unexpected profile update error:', error);
      // For EphemeralArt, we'll be forgiving and let users continue
      router.replace('/(tabs)');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle skip profile setup (go directly to app)
   */
  const handleSkipSetup = () => {
    console.log('⏭️ Profile Setup Screen - User skipping profile setup, proceeding to class selection');
    router.replace('/(tabs)');
  };

  const isFormDisabled = isLoading || isSubmitting;

  // Show loading if user is not loaded yet
  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ThemedText type="bodyText" style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading...
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  // Get user's name for welcome message
  const userName = user.email?.split('@')[0] || 'Artist';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Soft gradient background per UIDesign.md */}
      <View style={[styles.backgroundGradient, { backgroundColor: colors.surface }]} />
      
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
            {/* Glass Morphism Card Container per UIDesign.md */}
            <GlassMorphismCard type="primary" style={styles.welcomeCard}>
              {/* Welcome Header per UIDesign.md */}
              <View style={styles.header}>
                <ThemedText type="appName" style={[styles.welcomeTitle, { color: colors.text }]}>
                  Welcome to EphemeralArt!
                </ThemedText>
                <ThemedText type="bodyText" style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}>
                  You're ready to start sharing your artwork in a supportive, ephemeral environment.
                </ThemedText>
              </View>

              {/* Optional Name Entry */}
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <ThemedText type="label" style={[styles.label, { color: colors.text }]}>
                    Display Name (Optional)
                  </ThemedText>
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        borderColor: nameFocused ? colors.accentSage : colors.border,
                        backgroundColor: nameFocused ? colors.surface : colors.background,
                        color: colors.text,
                        fontFamily: 'Montserrat_400Regular',
                      }
                    ]}
                    value={displayName}
                    onChangeText={setDisplayName}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    placeholder={`${userName} (default)`}
                    placeholderTextColor={colors.textTertiary}
                    autoCapitalize="words"
                    autoCorrect={false}
                    editable={!isFormDisabled}
                  />
                  <ThemedText type="caption" style={[styles.helperText, { color: colors.textTertiary }]}>
                    How would you like classmates to see your name?
                  </ThemedText>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                {/* Primary Action - Join a Class */}
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    { 
                      backgroundColor: colors.accentSage,
                      opacity: isFormDisabled ? 0.6 : 1,
                    }
                  ]}
                  onPress={handleCompleteProfile}
                  disabled={isFormDisabled}
                  activeOpacity={0.8}
                >
                  <ThemedText type="button" style={styles.primaryButtonText}>
                    {isFormDisabled ? 'Setting Up...' : 'Join a Class'}
                  </ThemedText>
                </TouchableOpacity>

                {/* Secondary Action - Skip Setup */}
                <TouchableOpacity
                  style={[
                    styles.secondaryButton,
                    { 
                      borderColor: colors.accentSage,
                      opacity: isFormDisabled ? 0.6 : 1,
                    }
                  ]}
                  onPress={handleSkipSetup}
                  disabled={isFormDisabled}
                  activeOpacity={0.8}
                >
                  <ThemedText type="button" style={[styles.secondaryButtonText, { color: colors.accentSage }]}>
                    Continue as {userName}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </GlassMorphismCard>
          </View>
        </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',    // Center the glass card vertically
    paddingVertical: 40,
  },
  content: {
    paddingHorizontal: 20,       // 20px screen margins per UIDesign.md
  },
  welcomeCard: {
    padding: 24,                 // 24px section spacing per UIDesign.md
    marginHorizontal: 4,         // Slight margin for card shadow visibility
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,            // 24px section spacing per UIDesign.md
    gap: 12,                     // Generous spacing for welcome message
  },
  welcomeTitle: {
    textAlign: 'center',
    // Instrument Serif 42pt per UIDesign.md applied via ThemedText type="appName"
  },
  welcomeSubtitle: {
    textAlign: 'center',
    paddingHorizontal: 8,        // Additional padding for readability
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  form: {
    marginBottom: 24,            // 24px section spacing
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
  },
  helperText: {
    marginTop: 4,
    // Montserrat 11pt per UIDesign.md applied via ThemedText type="caption"
  },
  buttonContainer: {
    gap: 12,                     // 12px gap between buttons
  },
  primaryButton: {
    height: 50,                  // 44px+ touch target
    borderRadius: 28,            // 28px fully rounded per UIDesign.md
    justifyContent: 'center',
    alignItems: 'center',
    
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
  primaryButtonText: {
    color: 'white',              // White text on warm sage background
    // Montserrat 16pt Medium per UIDesign.md applied via ThemedText type="button"
  },
  secondaryButton: {
    height: 50,                  // 44px+ touch target
    borderRadius: 28,            // 28px fully rounded per UIDesign.md
    borderWidth: 2,              // Border button style
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    // Warm sage color applied via color prop
    // Montserrat 16pt Medium per UIDesign.md applied via ThemedText type="button"
  },
}); 