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

import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import ChatInput from '@/components/solo/ChatInput';
import ShareWithClassModal from '@/components/solo/ShareWithClassModal';
import SoloChat from '@/components/solo/SoloChat';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createJuniPost, getUserDisplayName } from '@/lib/postService';
import { useAuthStore } from '@/store/authStore';
import { useClassStore } from '@/store/classStore';
import { useSoloStore } from '@/store/soloStore';

export default function SoloTutorScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    resetShareButtonState,
    getMostRecentUserImage,
    setShowShareButton,
  } = useSoloStore();
  const { currentClass, setPendingScrollToPostId } = useClassStore();

  // Local state for share modal
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [selectedImageForShare, setSelectedImageForShare] = useState<string | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Handle keyboard visibility
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  // 🚨 DEBUG: Add comprehensive logging for user ID debugging
  console.log('🚨 SOLO DEBUG - Current user state:', {
    hasUser: !!user,
    userId: user?.id,
    userEmail: user?.email,
    currentChatId: currentChat?.id,
    isInitialized,
    messageCount: messages.length
  });

  // 🚨 DEBUG: Log specifically what will be sent to RAG system
  if (user?.id) {
    console.log('🎯 RAG SYSTEM WILL RECEIVE USER ID:', user.id);
    console.log('🎯 EXPECTED DEMO DATA USER ID: 7e20cbba-83c2-4297-90a6-0ac94aabb814');
    console.log('🎯 USER IDs MATCH:', user.id === '7e20cbba-83c2-4297-90a6-0ac94aabb814' ? '✅ YES' : '❌ NO');
  }

  // Only log essential state for debugging RAG system
  if (messages.length > 0) {
    console.log('🧠 Solo Tutor Screen - Active chat with', messages.length, 'messages');
  }

  /**
   * Initialize Solo Tutor when user is available
   */
  useEffect(() => {
    if (user?.id && !isInitialized) {
      initialize(user.id);
    }
  }, [user?.id, isInitialized, initialize]);

  /**
   * Reset share button state when leaving the solo tab
   * This ensures the share button visibility timer only persists while on the solo tab
   */
  useFocusEffect(
    React.useCallback(() => {
      // This runs when the screen comes into focus
      console.log('📍 Solo Tab - Screen focused');
      
      // Return cleanup function that runs when screen loses focus
      return () => {
        console.log('👋 Solo Tab - Screen unfocused, resetting share button state');
        resetShareButtonState();
      };
    }, [resetShareButtonState])
  );

  /**
   * Handle share button press - opens the share with class modal
   */
  const handleSharePress = () => {
    console.log('🎨 Solo Tab - Share button pressed');
    
    // Get the most recent user image
    const imageUrl = getMostRecentUserImage();
    
    if (!imageUrl) {
      console.log('⚠️ Solo Tab - No image to share');
      // TODO: Show error in chat as inline message
      return;
    }
    
    console.log('📸 Solo Tab - Image to share:', imageUrl);
    
    // Set image and open modal
    setSelectedImageForShare(imageUrl);
    setIsShareModalVisible(true);
  };

  /**
   * Handle sharing the image to class feed
   */
  const handleShareToClass = async (caption: string) => {
    console.log('🚀 Solo Tab - Sharing to class with caption:', caption);
    
    if (!user?.id || !selectedImageForShare) {
      console.error('❌ Solo Tab - Missing user or image data');
      return;
    }

    // Check if user has a class
    if (!currentClass) {
      console.log('⚠️ Solo Tab - User not enrolled in any class');
      
      // Add inline error message to chat
      // TODO: Implement inline error message in chat
      Alert.alert(
        'No Class Selected',
        'Please join a class before sharing your artwork.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      // Get user's display name
      const userName = await getUserDisplayName(user.id);
      
      // Create the post
      const result = await createJuniPost({
        userId: user.id,
        imageUrl: selectedImageForShare,
        caption: caption,
        userName: userName || undefined,
        maxViewers: 5,
        durationHours: 5,
      });

      if (result.success && result.postId) {
        console.log('✅ Solo Tab - Successfully shared to class feed');
        
        // Close modal
        setIsShareModalVisible(false);
        
        // Reset share button
        resetShareButtonState();
        
        // Hide share button after successful share
        setShowShareButton(false);
        
        // Navigate to class feed
        console.log('📍 Solo Tab - Navigating to class feed, post ID:', result.postId);
        
        // Set the post ID to scroll to in the class store
        setPendingScrollToPostId(result.postId);
        
        // Navigate to the index tab (class feed)
        router.push('/(tabs)');
        
      } else {
        console.error('❌ Solo Tab - Failed to share:', result.error);
        
        // Show error alert
        Alert.alert(
          'Share Failed',
          result.error || 'Failed to share your artwork. Please try again.',
          [{ text: 'OK' }]
        );
      }
      
    } catch (error) {
      console.error('❌ Solo Tab - Unexpected error sharing:', error);
      
      Alert.alert(
        'Share Failed',
        'An unexpected error occurred. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // Show loading state if user is not available
  if (!user) {
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
        keyboardVerticalOffset={Platform.OS === 'ios' ? 49 : 78}
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
        <View style={[
          styles.chatContainer,
          keyboardVisible && styles.chatContainerKeyboardVisible
        ]}>
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
        <View style={[
          styles.inputContainer,
          keyboardVisible && styles.inputContainerKeyboardVisible
        ]}>
          <ChatInput
            onSendMessage={async (message: string, imageUri?: string) => {
              if (!currentChat?.id) return;
              
              // 🚨 DEBUG: Log exactly what will be sent to RAG system
              console.log('🚨 SENDING TO RAG SYSTEM:', {
                chatId: currentChat.id,
                message: message.substring(0, 50) + '...',
                userId: user.id,
                userEmail: user?.email
              });
              
              await sendMessage({
                chatId: currentChat.id,
                message,
                imageUri,
                userId: user.id,
              });
            }}
            onSharePress={handleSharePress}
            isLoading={isSendingMessage}
            disabled={!currentChat || isLoading}
            placeholder="Ask Juni your art question..."
          />
        </View>
      </KeyboardAvoidingView>

      {/* Share with Class Modal */}
      <ShareWithClassModal
        visible={isShareModalVisible}
        imageUrl={selectedImageForShare}
        onClose={() => setIsShareModalVisible(false)}
        onShare={handleShareToClass}
      />
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
    paddingBottom: 1,          // Space for input field to prevent overlap
  },
  chatContainerKeyboardVisible: {
    paddingBottom: 0,            // No padding when keyboard is visible - KeyboardAvoidingView handles it
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
    paddingBottom: 42,           // Restored original spacing above tab bar
    paddingTop: 0,               // Remove top padding to eliminate dead space
  },
  inputContainerKeyboardVisible: {
    paddingBottom: 0,            // No padding when keyboard is visible to eliminate dead space
  },
}); 