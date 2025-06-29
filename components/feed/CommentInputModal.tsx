/**
 * Comment Input Modal Component
 * 
 * Modal overlay for adding comments to artwork posts.
 * Features:
 * - Glass morphism design with slide-up animation
 * - Character counter and limit
 * - Encouraging placeholder text
 * - Warm sage accent for send button
 * 
 * Design follows UIDesign.md specifications for comment interface
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    Platform,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';
import type { PostWithUser } from '@/store/classStore';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_COMMENT_LENGTH = 200;

export interface CommentInputModalProps {
  visible: boolean;
  post: PostWithUser | null;
  onClose: () => void;
  onSubmit: (postId: string, comment: string) => void;
}

export default function CommentInputModal({
  visible,
  post,
  onClose,
  onSubmit,
}: CommentInputModalProps) {
  console.log('💬 Comment Input Modal - Rendering for post:', post?.id, 'Visible:', visible);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuthStore();
  
  // State
  const [comment, setComment] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Animation - now slides down from top instead of up from bottom
  const slideAnim = useState(new Animated.Value(-300))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  /**
   * Handle modal animation
   */
  useEffect(() => {
    if (visible) {
      // Slide down from top and fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animation values
      slideAnim.setValue(-300);
      fadeAnim.setValue(0);
      setComment('');
    }
  }, [visible, slideAnim, fadeAnim]);

  /**
   * Handle close with animation
   */
  const handleClose = useCallback(() => {
    console.log('🔙 Comment Input Modal - Closing');
    
    // Slide up and fade out
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }, [slideAnim, fadeAnim, onClose]);

  /**
   * Handle comment submission
   */
  const handleSubmit = useCallback(() => {
    if (comment.trim() && post) {
      console.log('📤 Comment Input Modal - Submitting comment:', comment.length, 'chars');
      onSubmit(post.id, comment.trim());
      handleClose();
    }
  }, [comment, post, onSubmit, handleClose]);

  /**
   * Character count color
   */
  const getCharCountColor = () => {
    const remaining = MAX_COMMENT_LENGTH - comment.length;
    if (remaining < 0) return colors.accentCoral;
    if (remaining < 20) return colors.accentTan;
    return colors.textSecondary;
  };

  if (!post) return null;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          {/* Animated backdrop */}
          <Animated.View 
            style={[
              styles.backdrop,
              {
                opacity: fadeAnim,
              },
            ]}
          />
          
          {/* Animated content - now positioned at top */}
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableWithoutFeedback>
              <SafeAreaView style={styles.safeArea}>
                <GlassMorphismCard type="primary" style={styles.commentCard}>
                  {/* Header */}
                  <View style={styles.header}>
                    <ThemedText type="screenTitle" style={[styles.title, { color: colors.text }]}>
                      Add Encouragement
                    </ThemedText>
                    <TouchableOpacity onPress={handleClose} activeOpacity={0.7}>
                      <ThemedText style={[styles.closeButton, { color: colors.textSecondary }]}>
                        ×
                      </ThemedText>
                    </TouchableOpacity>
                  </View>

                  {/* Artist Info */}
                  <View style={styles.artistInfo}>
                    <ThemedText type="metadata" style={[styles.artistLabel, { color: colors.textSecondary }]}>
                      Encouraging
                    </ThemedText>
                    <ThemedText type="bodyText" style={[styles.artistName, { color: colors.text }]}>
                      {post.user?.username || 'Anonymous Artist'}
                    </ThemedText>
                  </View>

                  {/* Input Container */}
                  <View style={[
                    styles.inputContainer,
                    { 
                      borderColor: isFocused ? colors.accentSage : colors.border,
                      backgroundColor: colors.surface,
                    }
                  ]}>
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Add encouraging feedback..."
                      placeholderTextColor={colors.textTertiary}
                      value={comment}
                      onChangeText={setComment}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      multiline
                      maxLength={MAX_COMMENT_LENGTH}
                      autoFocus
                    />
                  </View>

                  {/* Footer */}
                  <View style={styles.footer}>
                    {/* Character Counter */}
                    <ThemedText 
                      type="metadata" 
                      style={[styles.charCount, { color: getCharCountColor() }]}
                    >
                      {comment.length}/{MAX_COMMENT_LENGTH}
                    </ThemedText>

                    {/* Send Button */}
                    <TouchableOpacity
                      style={[
                        styles.sendButton,
                        { 
                          backgroundColor: comment.trim() ? colors.accentSage : colors.border,
                          opacity: comment.trim() ? 1 : 0.5,
                        }
                      ]}
                      onPress={handleSubmit}
                      disabled={!comment.trim() || comment.length > MAX_COMMENT_LENGTH}
                      activeOpacity={0.8}
                    >
                      <ThemedText type="button" style={styles.sendButtonText}>
                        Send
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </GlassMorphismCard>
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-start', // Changed from 'flex-end' to 'flex-start'
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    marginTop: Platform.OS === 'ios' ? 100 : 80, // Position below status bar and give some space
  },
  safeArea: {
    width: '100%',
  },
  commentCard: {
    margin: 20,
    padding: 24,
    gap: 20,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  closeButton: {
    fontSize: 32,
    fontWeight: '300',
    padding: 4,
  },
  
  // Artist Info
  artistInfo: {
    gap: 4,
  },
  artistLabel: {
    fontSize: 12,
  },
  artistName: {
    fontSize: 16,
    fontWeight: '500',
  },
  
  // Input
  inputContainer: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    minHeight: 100,
    maxHeight: 150,
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  
  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charCount: {
    fontSize: 12,
  },
  sendButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: '500',
  },
}); 