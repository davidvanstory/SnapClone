/**
 * Login Screen Component - Bank of America Inspired Layout
 * 
 * This screen implements a clean, professional login interface inspired by Bank of America:
 * - Header with JUNI text and small logo
 * - Form card positioned in upper third of screen
 * - Large branding (logo + tagline) in lower half
 * - Maintains all UIDesign.md specifications for glass morphism and typography
 * - Solves keyboard covering issues by positioning inputs in upper portion
 */

import { Link, router } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import AuthForm, { type AuthFormData } from '../../components/auth/AuthForm';
import { ThemedText } from '../../components/ThemedText';
import GlassMorphismCard from '../../components/ui/GlassMorphismCard';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
  console.log('🔑 Login Screen - Rendering Bank of America inspired login interface');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Auth store
  const { signIn, isLoading } = useAuthStore();

  /**
   * Handle login form submission
   */
  const handleLogin = async (formData: AuthFormData) => {
    console.log('🚀 Login Screen - Starting login process');
    console.log('🔍 DEBUG: Login attempt with:', {
      email: formData.email,
      hasPassword: !!formData.password,
      passwordLength: formData.password.length
    });

    try {
      console.log('📡 Login Screen - Calling signIn from auth store...');
      const result = await signIn(formData.email, formData.password);

      console.log('🔍 DEBUG: Sign in result:', {
        success: result.success,
        hasError: !!result.error,
        errorMessage: result.error
      });

      if (result.success) {
        console.log('✅ Login Screen - Login successful, redirecting to camera');
        router.replace('/(tabs)/camera');
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
      console.error('🔍 DEBUG: Unexpected login error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
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
      {/* Soft gradient background per UIDesign.md */}
      <View style={[styles.backgroundGradient, { backgroundColor: colors.surface }]} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
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

          {/* Form Card - Positioned in upper third */}
          <View style={styles.formSection}>
            <GlassMorphismCard type="primary" style={styles.loginCard}>
              <AuthForm
                mode="login"
                onSubmit={handleLogin}
                isLoading={isLoading}
              />

              {/* Footer link inside card */}
              <View style={styles.cardFooter}>
                <Link href="/(auth)/register" asChild>
                  <ThemedText type="link" style={[styles.linkText, { color: colors.accentSage }]}>
                    Create Account
                  </ThemedText>
                </Link>
              </View>
            </GlassMorphismCard>
          </View>

          {/* Large Branding Section - Bottom half (just logo now) */}
          <View style={styles.brandingSection}>
            <Image 
              source={require('../../assets/images/icon.png')} 
              style={styles.largeLogo}
              resizeMode="contain"
            />
          </View>
        </View>
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

  // Form section - positioned in upper third
  formSection: {
    marginBottom: 40,            // Space before branding section
  },
  loginCard: {
    padding: 32,                 // Increased from 24px to make card taller
    marginHorizontal: 4,         // Slight margin for card shadow visibility
    paddingVertical: 36,         // Extra vertical padding for height
  },
  cardFooter: {
    alignItems: 'center',
    marginTop: 24,               // Increased space above footer link
  },
  footerText: {
    textAlign: 'center',
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  linkText: {
    // Warm sage color applied via color prop
    // Montserrat 16pt Medium per UIDesign.md applied via ThemedText type="link"
  },

  // Large branding section - bottom half
  brandingSection: {
    flex: 1,                     // Takes remaining space
    justifyContent: 'center',    // Centers content vertically
    alignItems: 'center',
    paddingBottom: 40,           // Bottom padding
  },
  largeLogo: {
    width: 160,                  // Increased from 120px to make logo bigger
    height: 160,
    marginBottom: 16,            // Space between logo and tagline
    borderRadius: 32,            // Rounded corners for large logo (proportional to size)
  },
}); 