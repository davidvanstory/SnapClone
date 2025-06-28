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

import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import ChatInput from '@/components/solo/ChatInput';
import SoloChat from '@/components/solo/SoloChat';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';
import { useSoloStore } from '@/store/soloStore';

export default function SoloTutorScreen() {
  console.log('🧠 Solo Tutor Screen - Rendering Solo AI chat interface');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuthStore();
  const {
    currentChat,
    messages,
    isLoading,
    isLoadingMessages,
    isSendingMessage,
    error,
    messageError,
    isInitialized,
    initialize,
    sendMessage,
    clearError,
    clearMessageError,
  } = useSoloStore();

  console.log('👤 Solo Tutor Screen - Current user:', user?.id ? 'Authenticated ✓' : 'Not authenticated ❌');
  console.log('💬 Solo Tutor Screen - Current chat ID:', currentChat?.id || 'No active chat');
  console.log('🔧 Solo Tutor Screen - Store state:', { 
    isLoading, 
    isLoadingMessages, 
    isSendingMessage, 
    messageCount: messages.length,
    isInitialized 
  });

  /**
   * Initialize Solo Tutor when user is available
   */
  useEffect(() => {
    console.log('🚀 Solo Tutor Screen - Initializing chat session');
    
    if (user?.id && !isInitialized) {
      console.log('📋 Solo Tutor Screen - User authenticated, initializing Solo Tutor');
      initialize(user.id);
    } else if (!user?.id) {
      console.log('⚠️ Solo Tutor Screen - User not authenticated');
    }
  }, [user?.id, isInitialized, initialize]);

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
        {/* Header - Minimal thin header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View style={styles.headerContent}>
          </View>
        </View>

        {/* Error Display */}
        {error && (
          <View style={styles.errorContainer}>
            <GlassMorphismCard type="secondary" style={styles.errorCard}>
              <View style={styles.errorContent}>
                <ThemedText type="bodyText" style={[styles.errorText, { color: colors.accentCoral }]}>
                  {error}
                </ThemedText>
                <TouchableOpacity
                  style={[styles.errorButton, { backgroundColor: colors.accentSage }]}
                  onPress={clearError}
                  activeOpacity={0.8}
                >
                  <ThemedText type="button" style={styles.errorButtonText}>
                    Dismiss
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </GlassMorphismCard>
          </View>
        )}

        {/* Chat Container */}
        <View style={styles.chatContainer}>
          <SoloChat
            messages={messages}
            isLoading={isSendingMessage}
            isError={!!messageError}
            errorMessage={messageError || undefined}
            onRetry={clearMessageError}
            onRefresh={() => currentChat && initialize(user.id)}
            isRefreshing={isLoadingMessages}
          />
        </View>

        {/* Chat Input */}
        <View style={styles.inputContainer}>
          <ChatInput
            onSendMessage={async (message: string, imageUri?: string) => {
              if (!currentChat?.id) {
                console.error('❌ Solo Screen - No current chat available');
                return;
              }
              
              await sendMessage({
                chatId: currentChat.id,
                message,
                imageUri,
                userId: user.id,
              });
            }}
            isLoading={isSendingMessage}
            disabled={!currentChat || isLoading}
            placeholder="Ask Juni your art question..."
          />
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
  
  // Header - Minimal thin design
  header: {
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 24,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingVertical: 12,          // Reduced from 20 to 12 for thinner header
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    // Instrument Serif 28pt per UIDesign.md applied via ThemedText type="screenTitle"
  },
  
  // Chat Container
  chatContainer: {
    flex: 1,
    paddingHorizontal: 0,        // Remove horizontal padding - SoloChat handles its own
    paddingVertical: 0,          // Remove vertical padding to eliminate dead space
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
  
  // Error Display
  errorContainer: {
    paddingHorizontal: 20,       // 20px screen margins per UIDesign.md
    paddingVertical: 8,          // Small vertical spacing
  },
  errorCard: {
    padding: 16,                 // 16px padding per UIDesign.md
  },
  errorContent: {
    alignItems: 'center',
    gap: 12,                     // 12px spacing between error elements
  },
  errorText: {
    textAlign: 'center',
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  errorButton: {
    paddingHorizontal: 16,       // 16px horizontal padding
    paddingVertical: 8,          // 8px vertical padding
    borderRadius: 8,             // 8px border radius
    minHeight: 44,               // 44px touch target per UIDesign.md
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorButtonText: {
    color: 'white',
    // Montserrat 16pt Medium per UIDesign.md applied via ThemedText type="button"
  },

  // Input Container
  inputContainer: {
    paddingHorizontal: 12,       // Reduced to minimize dead space
    paddingBottom: 42,           // Increased space above tab bar (10% higher)
    paddingTop: 0,               // Remove top padding to eliminate dead space
  },
}); 