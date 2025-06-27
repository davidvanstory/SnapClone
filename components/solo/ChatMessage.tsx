/**
 * Chat Message Component
 * 
 * This component renders individual chat messages in the Solo AI Tutor interface.
 * It handles:
 * - Distinct styling for user vs AI messages (right vs left alignment)
 * - Image display for user uploads with proper scaling
 * - Glass morphism design per UIDesign.md specifications
 * - Message timestamps and metadata
 * - Proper text wrapping and layout
 * 
 * Features:
 * - User messages: Right-aligned with sage accent background
 * - AI messages: Left-aligned with secondary glass background
 * - Image support: Displays user-uploaded artwork in cards
 * - Responsive layout: Adapts to different message lengths
 * - Accessibility: Proper contrast and touch targets
 */

import React from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { SoloAIMessage } from '@/lib/supabase';

export interface ChatMessageProps {
  message: SoloAIMessage;
  isLatest?: boolean;
}

export default function ChatMessage({
  message,
  isLatest = false,
}: ChatMessageProps) {
  console.log('📝 Chat Message - Rendering', message.role, 'message:', message.content.substring(0, 50) + '...');
  console.log('🖼️ Chat Message - Has image:', !!message.image_url);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const isUser = message.role === 'user';
  const isAI = message.role === 'assistant';

  /**
   * Format timestamp for display
   */
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) {
      return 'now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  /**
   * Render user uploaded image
   */
  const renderImage = () => {
    if (!message.image_url) return null;

    console.log('🖼️ Chat Message - Rendering image:', message.image_url);

    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: message.image_url }}
          style={styles.messageImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  /**
   * Render message content
   */
  const renderContent = () => {
    if (!message.content.trim()) return null;

    return (
      <ThemedText 
        type="bodyText" 
        style={[
          styles.messageText,
          { color: isUser ? 'white' : colors.text }
        ]}
      >
        {message.content}
      </ThemedText>
    );
  };

  /**
   * Render timestamp
   */
  const renderTimestamp = () => {
    return (
      <ThemedText 
        type="caption" 
        style={[
          styles.timestamp,
          { color: isUser ? 'rgba(255,255,255,0.7)' : colors.textTertiary },
          isUser ? styles.timestampUser : styles.timestampAI
        ]}
      >
        {formatTimestamp(message.created_at)}
      </ThemedText>
    );
  };

  return (
    <View style={[
      styles.messageContainer,
      isUser ? styles.userMessageContainer : styles.aiMessageContainer,
      isLatest && styles.latestMessage
    ]}>
      {/* AI Avatar/Label */}
      {isAI && (
        <View style={styles.aiLabelContainer}>
          <ThemedText type="label" style={[styles.aiLabel, { color: colors.accentSage }]}>
            🎨 Canvas
          </ThemedText>
        </View>
      )}

      {/* Message Bubble */}
      <GlassMorphismCard 
        type="secondary" 
        style={[
          styles.messageBubble,
          isUser ? [styles.userBubble, { backgroundColor: colors.accentSage }] : styles.aiBubble,
          isUser ? styles.userBubblePosition : styles.aiBubblePosition
        ]}
      >
        <View style={styles.messageContent}>
          {/* Image (if present) */}
          {renderImage()}
          
          {/* Text Content */}
          {renderContent()}
          
          {/* Timestamp */}
          {renderTimestamp()}
        </View>
      </GlassMorphismCard>

      {/* User Label */}
      {isUser && (
        <View style={styles.userLabelContainer}>
          <ThemedText type="label" style={[styles.userLabel, { color: colors.textSecondary }]}>
            You
          </ThemedText>
        </View>
      )}
    </View>
  );
}

// Glass Morphism Message Styles per UIDesign.md
const styles = StyleSheet.create({
  // Message Container
  messageContainer: {
    paddingVertical: 8,           // 8px spacing between messages
    paddingHorizontal: 4,         // Small horizontal padding
  },
  userMessageContainer: {
    alignItems: 'flex-end',       // Right-align user messages
  },
  aiMessageContainer: {
    alignItems: 'flex-start',     // Left-align AI messages
  },
  latestMessage: {
    marginBottom: 8,              // Extra spacing for latest message
  },

  // Message Bubble
  messageBubble: {
    maxWidth: '80%',              // Limit message width
    minWidth: 60,                 // Minimum width for small messages
    paddingHorizontal: 16,        // 16px internal padding per UIDesign.md
    paddingVertical: 12,          // 12px vertical padding
  },
  userBubble: {
    // Sage background for user messages (overrides glass morphism)
    borderWidth: 0,               // Remove border for solid background
  },
  aiBubble: {
    // Uses default glass morphism styling
  },
  userBubblePosition: {
    borderBottomRightRadius: 4,   // Reduce corner radius on user side
  },
  aiBubblePosition: {
    borderBottomLeftRadius: 4,    // Reduce corner radius on AI side
  },

  // Message Content
  messageContent: {
    gap: 8,                       // 8px spacing between content elements
  },
  messageText: {
    lineHeight: 22,               // 1.375x line height for readability
    // Montserrat 16pt per UIDesign.md applied via ThemedText type="bodyText"
  },

  // Image Display
  imageContainer: {
    borderRadius: 12,             // 12px border radius for images
    overflow: 'hidden',           // Clip image to border radius
    marginBottom: 4,              // Small spacing below image
  },
  messageImage: {
    width: 200,                   // Fixed width for consistency
    height: 200,                  // Square aspect ratio
    borderRadius: 12,             // Match container border radius
  },

  // Timestamp
  timestamp: {
    marginTop: 4,                 // Small spacing above timestamp
    // Montserrat 11pt per UIDesign.md applied via ThemedText type="caption"
  },
  timestampUser: {
    textAlign: 'right',           // Right-align for user messages
  },
  timestampAI: {
    textAlign: 'left',            // Left-align for AI messages
  },

  // Labels
  aiLabelContainer: {
    marginBottom: 4,              // Small spacing below label
    alignSelf: 'flex-start',      // Align to message start
  },
  aiLabel: {
    // Montserrat 14pt Medium per UIDesign.md applied via ThemedText type="label"
  },
  userLabelContainer: {
    marginTop: 4,                 // Small spacing above label
    alignSelf: 'flex-end',        // Align to message end
  },
  userLabel: {
    // Montserrat 14pt Medium per UIDesign.md applied via ThemedText type="label"
  },
}); 