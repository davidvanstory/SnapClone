/**
 * Solo Tutor Screen Component
 * 
 * This screen provides the AI-powered Solo Tutor chat interface where users can:
 * - Have private one-on-one conversations with Canvas, the AI art tutor
 * - Upload images for multimodal AI analysis and feedback
 * - Receive personalized guidance with RAG-powered context from chat history
 * - Build confidence through supportive, encouraging AI interactions
 * - Experience seamless chat interface with glass morphism design
 * 
 * Features:
 * - Chat interface with user and AI message bubbles
 * - Image upload capability for artwork analysis
 * - Loading states for AI response generation
 * - RAG system integration for contextual conversations
 * - Error handling for API failures
 * - Themed styling that adapts to light/dark mode
 * 
 * Design System: Glass morphism elegance per UIDesign.md specifications
 */

import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';

export default function SoloTutorScreen() {
  console.log('🧠 Solo Tutor Screen - Rendering Solo AI chat interface');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuthStore();

  // Local state for chat management
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  console.log('👤 Solo Tutor Screen - Current user:', user?.id ? 'Authenticated ✓' : 'Not authenticated ❌');
  console.log('💬 Solo Tutor Screen - Current chat ID:', currentChatId || 'No active chat');

  /**
   * Initialize chat session when component mounts
   */
  useEffect(() => {
    console.log('🚀 Solo Tutor Screen - Initializing chat session');
    
    if (user?.id) {
      // TODO: Initialize or load existing chat session
      // This will be implemented when we create the solo store and service
      console.log('📋 Solo Tutor Screen - User authenticated, ready to load chat history');
    } else {
      console.log('⚠️ Solo Tutor Screen - User not authenticated');
    }
  }, [user?.id]);

  // Show loading state if user is not available
  if (!user) {
    console.log('⏳ Solo Tutor Screen - Waiting for user authentication');
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ThemedText type="bodyText" style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading Solo Tutor...
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Soft gradient background per UIDesign.md */}
      <View style={[styles.backgroundGradient, { backgroundColor: colors.surface }]} />
      
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View style={styles.headerContent}>
            <ThemedText type="screenTitle" style={[styles.title, { color: colors.text }]}>
              Solo Tutor
            </ThemedText>
            <ThemedText type="bodyText" style={[styles.subtitle, { color: colors.textSecondary }]}>
              Your personal AI art coach, Canvas, is here to help
            </ThemedText>
          </View>
        </View>

        {/* Chat Container - This will be replaced with actual chat components */}
        <View style={styles.chatContainer}>
          <GlassMorphismCard type="primary" style={styles.welcomeCard}>
            <View style={styles.welcomeContent}>
              <ThemedText type="appName" style={[styles.welcomeTitle, { color: colors.accentSage }]}>
                🎨 Welcome to Solo Tutor
              </ThemedText>
              <ThemedText type="bodyText" style={[styles.welcomeText, { color: colors.text }]}>
                Hi! I'm Canvas, your personal AI art tutor. I'm here to help you improve your artistic skills through personalized guidance and feedback.
              </ThemedText>
              <ThemedText type="bodyText" style={[styles.welcomeText, { color: colors.textSecondary }]}>
                You can ask me questions about art techniques, upload your artwork for analysis, or just chat about your creative journey. I'll remember our conversations to provide better, more contextual help over time.
              </ThemedText>
              <ThemedText type="label" style={[styles.comingSoonText, { color: colors.accentTan }]}>
                🚧 Chat interface coming soon...
              </ThemedText>
            </View>
          </GlassMorphismCard>
        </View>

        {/* Chat Input Placeholder - This will be replaced with actual chat input component */}
        <View style={styles.inputContainer}>
          <GlassMorphismCard type="secondary" style={styles.inputCard}>
            <View style={styles.inputContent}>
              <ThemedText type="metadata" style={[styles.inputPlaceholder, { color: colors.textTertiary }]}>
                Chat input will appear here...
              </ThemedText>
            </View>
          </GlassMorphismCard>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Glass Morphism Design System Styles per UIDesign.md
const styles = StyleSheet.create({
  // Base Container
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
  
  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    textAlign: 'center',
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  
  // Header
  header: {
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 24,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    marginBottom: 4,
    textAlign: 'center',
    // Instrument Serif 28pt per UIDesign.md applied via ThemedText type="screenTitle"
  },
  subtitle: {
    textAlign: 'center',
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  
  // Chat Container
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,       // 20px screen margins per UIDesign.md
    paddingVertical: 20,
  },
  welcomeCard: {
    padding: 24,                 // 24px section spacing per UIDesign.md
    marginHorizontal: 4,         // Slight margin for card shadow visibility
  },
  welcomeContent: {
    alignItems: 'center',
    gap: 16,                     // 16px spacing between welcome elements
  },
  welcomeTitle: {
    textAlign: 'center',
    marginBottom: 8,
    // Instrument Serif 42pt per UIDesign.md applied via ThemedText type="appName"
  },
  welcomeText: {
    textAlign: 'center',
    lineHeight: 24,              // 1.5x line height for readability per UIDesign.md
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  comingSoonText: {
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
    // Montserrat 14pt Medium per UIDesign.md applied via ThemedText type="label"
  },
  
  // Input Container (Placeholder)
  inputContainer: {
    paddingHorizontal: 20,       // 20px screen margins per UIDesign.md
    paddingBottom: 20,           // Space above tab bar
    paddingTop: 8,               // Small gap from chat
  },
  inputCard: {
    padding: 16,                 // 16px padding per UIDesign.md
    minHeight: 56,               // 44px+ touch target per UIDesign.md
  },
  inputContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputPlaceholder: {
    // Montserrat 12pt per UIDesign.md applied via ThemedText type="metadata"
  },
}); 