/**
 * Register Screen Component - Bank of America Inspired Layout
 * 
 * This screen implements a clean, professional registration interface inspired by Bank of America:
 * - Header with JUNI text and small logo
 * - Form card positioned in upper third of screen  
 * - Large branding (logo + tagline) in lower half
 * - Maintains all UIDesign.md specifications for glass morphism and typography
 * - Solves keyboard covering issues by positioning inputs in upper portion
 * - Uses ScrollView for register form due to additional fields
 */

import { Link, router } from 'expo-router';
import React from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import AuthForm, { type AuthFormData } from '../../components/auth/AuthForm';
import { ThemedText } from '../../components/ThemedText';
import GlassMorphismCard from '../../components/ui/GlassMorphismCard';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuthStore } from '../../store/authStore';

export default function RegisterScreen() {
  console.log('📝 Register Screen - Rendering Bank of America inspired registration interface');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Auth store
  const { signUp, isLoading } = useAuthStore();

  /**
   * Handle registration form submission
   */
  const handleRegister = async (formData: AuthFormData) => {
    console.log('🚀 Register Screen - Starting registration process');
    console.log('🔍 DEBUG: Registration attempt with:', {
      email: formData.email,
      hasPassword: !!formData.password,
      hasConfirmPassword: !!formData.confirmPassword,
      passwordsMatch: formData.password === formData.confirmPassword
    });

    try {
      console.log('📡 Register Screen - Calling signUp from auth store...');
      const result = await signUp(formData.email, formData.password);

      console.log('🔍 DEBUG: Sign up result:', {
        success: result.success,
        hasError: !!result.error,
        errorMessage: result.error
      });

      if (result.success) {
        console.log('✅ Register Screen - Registration successful, redirecting to profile setup');
        router.replace('/(auth)/profile-setup');
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
      console.error('🔍 DEBUG: Unexpected registration error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
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
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Header - JUNI text, small logo, and tagline */}
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <ThemedText type="appName" style={[styles.appName, { color: colors.text }]}>
                  JUNI
                </ThemedText>
                <Image 
                  source={require('../../assets/images/icon.png')} 
                  style={styles.headerLogo}
                  resizeMode="contain"
                />
              </View>
              <ThemedText type="bodyText" style={[styles.tagline, { color: colors.textSecondary }]}>
                Grow as an artist with peers and AI
              </ThemedText>
            </View>

            {/* Form Card - Positioned in upper section */}
            <View style={styles.formSection}>
              <GlassMorphismCard type="primary" style={styles.registerCard}>
                {/* Card Header */}
                <View style={styles.cardHeader}>
                  <ThemedText type="screenTitle" style={[styles.title, { color: colors.text }]}>
                    Join JUNI
                  </ThemedText>
                  <ThemedText type="bodyText" style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Create your account to start sharing artwork
                  </ThemedText>
                </View>

                {/* Form */}
                <AuthForm
                  mode="register"
                  onSubmit={handleRegister}
                  isLoading={isLoading}
                />

                {/* Footer link inside card */}
                <View style={styles.cardFooter}>
                  <Link href="/(auth)/login" asChild>
                    <ThemedText type="link" style={[styles.linkText, { color: colors.accentSage }]}>
                      Sign In
                    </ThemedText>
                  </Link>
                </View>
              </GlassMorphismCard>
            </View>

            {/* Large Branding Section - Bottom (just logo now) */}
            <View style={styles.brandingSection}>
              <Image 
                source={require('../../assets/images/icon.png')} 
                style={styles.largeLogo}
                resizeMode="contain"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Bank of America Inspired Layout Styles per UIDesign.md
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
    paddingHorizontal: 20,       // 20px screen margins per UIDesign.md
    paddingVertical: 20,
  },

  // Header with JUNI text, small logo, and tagline - centered
  header: {
    alignItems: 'center',        // Center all header content
    paddingTop: 20,              // Additional top padding for header
    marginBottom: 40,            // Space before form section
    gap: 12,                     // Space between top row and tagline
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,                     // Space between JUNI text and logo
  },
  appName: {
    // Instrument Serif per UIDesign.md applied via ThemedText type="appName"
    fontSize: 35,                // Increased by 25% from 28px (28 * 1.25 = 35)
  },
  headerLogo: {
    width: 32,                   // Small logo like Bank of America
    height: 32,
    borderRadius: 8,             // Rounded corners for small logo
  },
  tagline: {
    textAlign: 'center',
    paddingHorizontal: 20,       // Padding for text wrapping
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },

  // Form section - positioned in upper area
  formSection: {
    marginBottom: 40,            // Space before branding section
  },
  registerCard: {
    padding: 32,                 // Increased from 24px to make card taller
    marginHorizontal: 4,         // Slight margin for card shadow visibility
    paddingVertical: 36,         // Extra vertical padding for height
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 24,            // Space below header
  },
  title: {
    // Montserrat 24pt Medium per UIDesign.md applied via ThemedText type="screenTitle"
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  cardFooter: {
    alignItems: 'center',
    marginTop: 24,               // Increased space above footer link
  },
  linkText: {
    // Warm sage color applied via color prop
    // Montserrat 16pt Medium per UIDesign.md applied via ThemedText type="link"
  },

  // Large branding section - bottom
  brandingSection: {
    flex: 1,                     // Takes remaining space
    justifyContent: 'center',    // Centers content vertically
    alignItems: 'center',
    paddingBottom: 40,           // Bottom padding
    minHeight: 200,              // Minimum height to ensure visibility
  },
  largeLogo: {
    width: 160,                  // Increased from 120px to make logo bigger
    height: 160,
    marginBottom: 16,            // Space between logo and tagline
    borderRadius: 32,            // Rounded corners for large logo (proportional to size)
  },
}); 