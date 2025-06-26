/**
 * Registration Screen Component - Glass Morphism Implementation
 * 
 * This screen implements the registration interface using UIDesign.md specifications:
 * - Clean white background with subtle paper texture
 * - Glass morphism container (Primary Glass Card specs)
 * - "Join EphemeralArt" header in Instrument Serif 28pt
 * - Email/password/confirm password inputs with glass morphism styling
 * - Warm sage accent color for focus states and submit button
 * - Typography hierarchy per UIDesign.md exact specifications
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
    View,
} from 'react-native';
import AuthForm, { type AuthFormData } from '../../components/auth/AuthForm';
import { ThemedText } from '../../components/ThemedText';
import GlassMorphismCard from '../../components/ui/GlassMorphismCard';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuthStore } from '../../store/authStore';

export default function RegisterScreen() {
  console.log('📝 Register Screen - Rendering glass morphism registration interface');

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
        console.log('✅ Register Screen - Registration successful, user automatically signed in');
        // User is automatically signed in after registration (no email verification needed)
        // The auth state listener will redirect them to the main app
        Alert.alert(
          'Welcome to EphemeralArt!',
          'Your account has been created successfully. Let\'s get you started!',
          [
            {
              text: 'Get Started',
              onPress: () => {
                console.log('🎉 Register Screen - User ready to start, redirecting to camera');
                router.replace('/(tabs)/camera');
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
            <GlassMorphismCard type="primary" style={styles.registerCard}>
              {/* Header - EphemeralArt Branding per UIDesign.md */}
              <View style={styles.header}>
                <ThemedText type="screenTitle" style={[styles.title, { color: colors.text }]}>
                  Join EphemeralArt
                </ThemedText>
                <ThemedText type="bodyText" style={[styles.subtitle, { color: colors.textSecondary }]}>
                  Create your account to start sharing artwork
                </ThemedText>
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
                <ThemedText type="bodyText" style={[styles.footerText, { color: colors.textSecondary }]}>
                  Already have an account?{' '}
                  <Link href="/(auth)/login" asChild>
                    <ThemedText type="link" style={[styles.linkText, { color: colors.accentSage }]}>
                      Sign In
                    </ThemedText>
                  </Link>
                </ThemedText>
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
  registerCard: {
    padding: 24,                 // 24px section spacing per UIDesign.md
    marginHorizontal: 4,         // Slight margin for card shadow visibility
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,            // 24px section spacing per UIDesign.md
    gap: 8,                      // 8px base unit spacing
  },
  title: {
    textAlign: 'center',
    // Instrument Serif 28pt per UIDesign.md applied via ThemedText type="screenTitle"
  },
  subtitle: {
    textAlign: 'center',
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  form: {
    marginBottom: 24,            // 24px section spacing
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  linkText: {
    // Warm sage color applied via color prop
    // Montserrat 16pt Medium per UIDesign.md applied via ThemedText type="link"
  },
}); 