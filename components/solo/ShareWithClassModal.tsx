/**
 * Share with Class Modal Component
 * 
 * This modal allows users to share their artwork from the Solo AI Tutor to their class feed.
 * Features:
 * - Glass morphism design without blurred background per UIDesign.md
 * - Image preview of the artwork to be shared
 * - Caption/question input field for context
 * - Share button to confirm and post to class feed
 * - Smooth open/close animations
 * - Proper keyboard handling for caption input
 * 
 * The modal bridges the Solo Tutor experience with the collaborative Class Feed,
 * allowing students to share their AI-guided creations with classmates.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export interface ShareWithClassModalProps {
  visible: boolean;
  imageUrl: string | null;
  onClose: () => void;
  onShare: (caption: string) => Promise<void>;
  isLoading?: boolean;
}

export default function ShareWithClassModal({
  visible,
  imageUrl,
  onClose,
  onShare,
  isLoading = false,
}: ShareWithClassModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Local state
  const [caption, setCaption] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Handle modal visibility animations
  useEffect(() => {
    if (visible) {
      console.log('📸 Share Modal - Opening with image:', imageUrl);
      
      // Fade in and scale up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Fade out and scale down
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  // Reset state when modal closes
  useEffect(() => {
    if (!visible) {
      setCaption('');
      setIsSharing(false);
    }
  }, [visible]);

  /**
   * Handle share button press
   */
  const handleShare = async () => {
    if (isSharing || isLoading || !caption.trim()) return;
    
    console.log('🚀 Share Modal - Sharing with caption:', caption);
    setIsSharing(true);
    
    try {
      await onShare(caption.trim());
      console.log('✅ Share Modal - Successfully shared');
      onClose();
    } catch (error) {
      console.error('❌ Share Modal - Share failed:', error);
      // Error handling is done in parent component
    } finally {
      setIsSharing(false);
    }
  };

  // Don't render if no image
  if (!imageUrl) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        onClose();
      }}>
        <Animated.View 
          style={[
            styles.overlay,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              opacity: fadeAnim,
            }
          ]}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Animated.View
                style={[
                  styles.modalContainer,
                  {
                    transform: [{ scale: scaleAnim }],
                    opacity: fadeAnim,
                  }
                ]}
              >
                <GlassMorphismCard type="primary" style={styles.modalContent}>
                  {/* Header */}
                  <TouchableWithoutFeedback>
                    <View style={styles.header}>
                      <ThemedText type="screenTitle" style={[styles.title, { color: colors.text }]}>
                        Share with Class
                      </ThemedText>
                      <TouchableOpacity
                        style={[styles.closeButton, { backgroundColor: colors.glassSecondary }]}
                        onPress={onClose}
                        activeOpacity={0.8}
                      >
                        <IconSymbol
                          name="xmark"
                          size={20}
                          color={colors.text}
                          weight="medium"
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>

                  {/* Image Preview */}
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.previewImage}
                        resizeMode="cover"
                      />
                    </View>
                  </TouchableWithoutFeedback>

                  {/* Caption Input */}
                  <View style={styles.inputContainer}>
                    <ThemedText type="label" style={[styles.inputLabel, { color: colors.textSecondary }]}>
                      Add a caption or question
                    </ThemedText>
                    <TextInput
                      style={[
                        styles.captionInput,
                        {
                          borderColor: colors.glassBorderSecondary,
                          backgroundColor: colors.glassInput,
                          color: colors.text,
                        }
                      ]}
                      value={caption}
                      onChangeText={setCaption}
                      placeholder="What would you like to share about this artwork?"
                      placeholderTextColor={colors.glassPlaceholder}
                      multiline
                      maxLength={200}
                      editable={!isSharing && !isLoading}
                      returnKeyType="done"
                      blurOnSubmit={true}
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <ThemedText type="caption" style={[styles.characterCount, { color: colors.textSecondary }]}>
                      {caption.length}/200
                    </ThemedText>
                  </View>

                  {/* Share Settings Info */}
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.infoContainer, { backgroundColor: colors.glassSecondary }]}>
                      <IconSymbol
                        name="info.circle"
                        size={16}
                        color={colors.textSecondary}
                        weight="regular"
                      />
                      <ThemedText type="caption" style={[styles.infoText, { color: colors.textSecondary }]}>
                        Your post will be visible to 5 classmates for 5 hours
                      </ThemedText>
                    </View>
                  </TouchableWithoutFeedback>

                  {/* Action Buttons */}
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={[
                          styles.cancelButton,
                          { backgroundColor: colors.glassSecondary }
                        ]}
                        onPress={onClose}
                        disabled={isSharing || isLoading}
                        activeOpacity={0.8}
                      >
                        <ThemedText type="button" style={[styles.cancelButtonText, { color: colors.text }]}>
                          Cancel
                        </ThemedText>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.shareButton,
                          { 
                            backgroundColor: caption.trim() ? '#4CAF50' : colors.border,
                            opacity: caption.trim() && !isSharing && !isLoading ? 1 : 0.5,
                          }
                        ]}
                        onPress={handleShare}
                        disabled={!caption.trim() || isSharing || isLoading}
                        activeOpacity={0.8}
                      >
                        {isSharing || isLoading ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <ThemedText type="button" style={styles.shareButtonText}>
                            Share
                          </ThemedText>
                        )}
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </GlassMorphismCard>
              </Animated.View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  modalContent: {
    padding: 24,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    aspectRatio: 1,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    marginBottom: 4,
  },
  captionInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minHeight: 80,
    maxHeight: 120,
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    textAlignVertical: 'top',
  },
  characterCount: {
    textAlign: 'right',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: '500',
  },
  shareButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  shareButtonText: {
    color: 'white',
    fontWeight: '600',
  },
}); 