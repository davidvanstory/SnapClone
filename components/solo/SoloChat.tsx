/**
 * Solo Chat Container Component
 * 
 * This component provides the main chat interface for the Solo AI Tutor feature.
 * It handles:
 * - Chat message display with user and AI message bubbles
 * - Loading states during AI response generation
 * - Error handling for API failures
 * - Chat scrolling and message ordering
 * - Integration with the Solo store for state management
 * - Glass morphism design per UIDesign.md specifications
 * 
 * Features:
 * - Automatic scrolling to latest messages
 * - Distinct styling for user vs AI messages
 * - Image display support for user uploads
 * - Loading indicators during AI processing
 * - Error states with retry functionality
 * - Empty state for new chat sessions
 */

import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { SoloAIMessage } from '@/lib/supabase';

import ChatMessage from './ChatMessage';

export interface SoloChatProps {
  messages: SoloAIMessage[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function SoloChat({
  messages,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  onRefresh,
  isRefreshing = false,
}: SoloChatProps) {
  // Reduced logging - only log significant state changes

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const flatListRef = useRef<FlatList>(null);

  /**
   * Auto-scroll to bottom when new messages arrive
   */
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      // Small delay to ensure layout is complete
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  /**
   * Render individual chat message
   */
  const renderMessage = ({ item, index }: { item: SoloAIMessage; index: number }) => {
    return (
      <ChatMessage
        message={item}
        isLatest={index === messages.length - 1}
      />
    );
  };

  /**
   * Render loading indicator for AI response
   */
  const renderLoadingIndicator = () => {
    if (!isLoading) return null;
    
    return (
      <View style={styles.loadingContainer}>
        <GlassMorphismCard type="secondary" style={styles.loadingCard}>
          <View style={styles.loadingContent}>
            <ActivityIndicator 
              size="small" 
              color={colors.accentSage} 
              style={styles.loadingSpinner}
            />
            <ThemedText type="bodyText" style={[styles.loadingText, { color: colors.textSecondary }]}>
              Juni is thinking...
            </ThemedText>
          </View>
        </GlassMorphismCard>
      </View>
    );
  };

  /**
   * Render error state
   */
  const renderErrorState = () => {
    if (!isError) return null;
    
    return (
      <View style={styles.errorContainer}>
        <GlassMorphismCard type="secondary" style={styles.errorCard}>
          <View style={styles.errorContent}>
            <ThemedText type="bodyText" style={[styles.errorTitle, { color: colors.accentCoral }]}>
              Something went wrong
            </ThemedText>
            <ThemedText type="caption" style={[styles.errorMessage, { color: colors.textSecondary }]}>
              {errorMessage || 'Failed to get AI response. Please try again.'}
            </ThemedText>
            {onRetry && (
              <TouchableOpacity
                style={[styles.retryButton, { backgroundColor: colors.accentSage }]}
                onPress={onRetry}
                activeOpacity={0.8}
              >
                <ThemedText type="button" style={styles.retryButtonText}>
                  Try Again
                </ThemedText>
              </TouchableOpacity>
            )}
          </View>
        </GlassMorphismCard>
      </View>
    );
  };

  /**
   * Render empty state for new chat
   */
  const renderEmptyState = () => {
    
    return (
      <View style={styles.emptyContainer}>
        <GlassMorphismCard type="primary" style={styles.emptyCard}>
          <View style={styles.emptyContent}>
            <ThemedText type="appName" style={[styles.emptyTitle, { color: colors.accentSage }]}>
              🎨 Start Your Art Journey
            </ThemedText>
            <ThemedText type="bodyText" style={[styles.emptyDescription, { color: colors.text }]}>
              Hi! I'm Juni, your personal AI art tutor. I'm here to help you improve your artistic skills through personalized guidance and feedback.
            </ThemedText>
            <ThemedText type="bodyText" style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Ask me anything about art techniques, upload your artwork for analysis, or just chat about your creative journey!
            </ThemedText>
          </View>
        </GlassMorphismCard>
      </View>
    );
  };

  /**
   * Handle list key extraction
   */
  const keyExtractor = (item: SoloAIMessage) => item.id;

  /**
   * Handle refresh control
   */
  const handleRefresh = () => {
    onRefresh?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={keyExtractor}
        style={styles.messagesList}
        contentContainerStyle={[
          styles.messagesContainer,
          messages.length === 0 && styles.emptyMessagesContainer
        ]}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            {renderLoadingIndicator()}
            {renderErrorState()}
          </View>
        }
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={colors.accentSage}
              colors={[colors.accentSage]}
            />
          ) : undefined
        }
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={20}
        windowSize={10}
      />
    </View>
  );
}

// Glass Morphism Chat Styles per UIDesign.md
const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: 16,        // 16px horizontal padding per UIDesign.md
    paddingTop: 16,               // 16px top padding
    paddingBottom: 4,             // Minimal bottom padding to prevent cutting off
  },
  emptyMessagesContainer: {
    flexGrow: 1,                  // Allow centering of empty state
    justifyContent: 'center',
  },
  
  // Loading State
  loadingContainer: {
    paddingVertical: 8,           // 8px spacing between messages
    alignItems: 'flex-start',     // Align AI messages to left
  },
  loadingCard: {
    paddingHorizontal: 16,        // 16px internal padding per UIDesign.md
    paddingVertical: 12,          // 12px vertical padding
    maxWidth: '80%',              // Limit message width
    minWidth: 120,                // Minimum width for loading indicator
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,                       // 8px gap between spinner and text
  },
  loadingSpinner: {
    // ActivityIndicator styling handled by component
  },
  loadingText: {
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  
  // Error State
  errorContainer: {
    paddingVertical: 8,           // 8px spacing
    alignItems: 'center',         // Center error messages
  },
  errorCard: {
    paddingHorizontal: 20,        // 20px internal padding
    paddingVertical: 16,          // 16px vertical padding
    maxWidth: '90%',              // Wider for error content
    alignItems: 'center',
  },
  errorContent: {
    alignItems: 'center',
    gap: 8,                       // 8px spacing between error elements
  },
  errorTitle: {
    textAlign: 'center',
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  errorMessage: {
    textAlign: 'center',
    // Montserrat 11pt per UIDesign.md applied via ThemedText type="caption"
  },
  retryButton: {
    marginTop: 8,                 // 8px spacing above button
    paddingHorizontal: 16,        // 16px horizontal padding
    paddingVertical: 8,           // 8px vertical padding
    borderRadius: 16,             // 16px border radius per UIDesign.md
  },
  retryButtonText: {
    color: 'white',               // White text on sage background
    // Montserrat 16pt Medium per UIDesign.md applied via ThemedText type="button"
  },
  
  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,        // 20px screen margins per UIDesign.md
  },
  emptyCard: {
    padding: 24,                  // 24px section spacing per UIDesign.md
    alignItems: 'center',
  },
  emptyContent: {
    alignItems: 'center',
    gap: 16,                      // 16px spacing between elements
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 8,
    // Instrument Serif 42pt per UIDesign.md applied via ThemedText type="appName"
  },
  emptyDescription: {
    textAlign: 'center',
    lineHeight: 24,               // 1.5x line height for readability per UIDesign.md
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  emptySubtitle: {
    textAlign: 'center',
    lineHeight: 22,               // Slightly tighter line height for secondary text
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },
  
  // Footer Container
  footerContainer: {
    paddingBottom: 2,             // Minimal bottom padding to avoid cutting off content
  },
}); 