/**
 * Chat Input Component
 * 
 * This component provides the input interface for the Solo AI Tutor chat.
 * It handles:
 * - Text input with multiline support and auto-expanding height
 * - Image upload from gallery with preview functionality
 * - Send button with loading states during AI processing
 * - Glass morphism design per UIDesign.md specifications
 * - Keyboard management and proper focus handling
 * - Prepopulated instructional text that disappears when user starts typing
 * 
 * Features:
 * - Auto-expanding text input (1-4 lines)
 * - Instructional text "Ask Juni your art question" that appears when input is empty
 * - Text automatically clears when user focuses/starts typing
 * - Instructional text restores when input is empty and loses focus
 * - Image picker integration with plus icon for artwork uploads
 * - Send button with paper plane icon, disabled when empty or loading
 * - Image preview with remove functionality
 * - Proper keyboard avoidance and focus management
 * - Error handling for image upload failures
 * - Consistent IconSymbol usage matching app design system
 */

import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSoloStore } from '@/store/soloStore';

export interface ChatInputProps {
  onSendMessage: (message: string, imageUri?: string) => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onSharePress?: () => void;
}

export default function ChatInput({
  onSendMessage,
  isLoading = false,
  disabled = false,
  placeholder = "Ask Juni about art techniques, or upload your artwork for feedback...",
  onSharePress,
}: ChatInputProps) {
  // Minimal logging for essential debugging only

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { prepopulatedImageUri, clearPrepopulatedImageUri, showShareButton } = useSoloStore();

  // Instructional text constants
  const INSTRUCTIONAL_TEXT = "Ask Juni your art question";

  // Local state
  const [message, setMessage] = useState(INSTRUCTIONAL_TEXT);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [isShowingInstructionalText, setIsShowingInstructionalText] = useState(true);

  // Animation values for share button
  const shareButtonSlideAnim = useRef(new Animated.Value(-60)).current; // Start off-screen
  const shareButtonPulseAnim = useRef(new Animated.Value(1)).current;
  const hasShownPulse = useRef(false);

  // Handle prepopulated image from camera
  useEffect(() => {
    if (prepopulatedImageUri) {
      setSelectedImageUri(prepopulatedImageUri);
      clearPrepopulatedImageUri();
      
      // Clear instructional text and focus on the input for user to add their question
      setIsShowingInstructionalText(false);
      setMessage('');
    }
  }, [prepopulatedImageUri, clearPrepopulatedImageUri]);

  // Handle share button visibility animation
  useEffect(() => {
    if (showShareButton) {
      console.log('🎉 Chat Input - Animating share button in');
      
      // Slide in animation
      Animated.timing(shareButtonSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Pulse animation after slide in (only on first appearance)
        if (!hasShownPulse.current) {
          hasShownPulse.current = true;
          
          // Create a sequence of pulses
          Animated.sequence([
            Animated.timing(shareButtonPulseAnim, {
              toValue: 1.2,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(shareButtonPulseAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(shareButtonPulseAnim, {
              toValue: 1.1,
              duration: 150,
              useNativeDriver: true,
            }),
            Animated.timing(shareButtonPulseAnim, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }),
          ]).start();
        }
      });
    } else {
      console.log('👋 Chat Input - Hiding share button');
      
      // Slide out animation
      Animated.timing(shareButtonSlideAnim, {
        toValue: -60,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      // Reset pulse state when hidden
      hasShownPulse.current = false;
    }
  }, [showShareButton, shareButtonSlideAnim, shareButtonPulseAnim]);

  // Computed state
  const actualMessage = isShowingInstructionalText ? '' : message;
  const canSend = !isLoading && !disabled && (actualMessage.trim().length > 0 || selectedImageUri);
  const maxInputHeight = 92;  // Maximum height for exactly 3 lines (44px base + 24px per additional line + padding)
  const minInputHeight = 44;  // Minimum height for single line

  // Minimal state logging for debugging
  if (actualMessage.trim().length > 0) {
    console.log('💬 Chat Input - User message ready:', actualMessage.substring(0, 50) + (actualMessage.length > 50 ? '...' : ''));
  }

  /**
   * Handle text input changes with auto-expanding height
   */
  const handleTextChange = (text: string) => {
    // If user starts typing while instructional text is showing, clear it
    if (isShowingInstructionalText && text !== INSTRUCTIONAL_TEXT) {
      setIsShowingInstructionalText(false);
      setMessage(text);
    } else if (!isShowingInstructionalText) {
      setMessage(text);
    }
  };

  /**
   * Handle text input content size change for auto-expanding
   */
  const handleContentSizeChange = (event: any) => {
    // Height is now handled by minHeight/maxHeight in styles
    // When content exceeds maxHeight, TextInput will automatically scroll
  };

  /**
   * Handle text input focus - clear instructional text if showing
   */
  const handleTextInputFocus = () => {
    if (isShowingInstructionalText) {
      setIsShowingInstructionalText(false);
      setMessage('');
    }
  };

  /**
   * Handle text input blur - restore instructional text if empty
   */
  const handleTextInputBlur = () => {
    if (!isShowingInstructionalText && message.trim() === '') {
      setIsShowingInstructionalText(true);
      setMessage(INSTRUCTIONAL_TEXT);
    }
  };

  /**
   * Handle image picker selection
   */
  const handleImagePicker = async () => {
    try {
      // Request permissions
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photo library to upload artwork.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio for artwork
        quality: 0.8,   // Good quality balance
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setSelectedImageUri(selectedAsset.uri);
      }

    } catch (error) {
      console.error('❌ Chat Input - Image picker error:', error);
      Alert.alert(
        'Error',
        'Failed to open image picker. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  /**
   * Handle removing selected image
   */
  const handleRemoveImage = () => {
    setSelectedImageUri(null);
  };

  /**
   * Handle send message
   */
  const handleSendMessage = async () => {
    if (!canSend) return;

    console.log('🚀 Sending message:', actualMessage.substring(0, 100) + (actualMessage.length > 100 ? '...' : ''));

    try {
      await onSendMessage(actualMessage.trim(), selectedImageUri || undefined);
      
      // Clear input after successful send and restore instructional text
      console.log('✅ Chat Input - Message sent successfully, clearing input');
      setMessage(INSTRUCTIONAL_TEXT);
      setIsShowingInstructionalText(true);
      setSelectedImageUri(null);
      
    } catch (error) {
      console.error('❌ Chat Input - Failed to send message:', error);
      // Don't clear input on error so user can retry
      Alert.alert(
        'Send Failed',
        'Failed to send your message. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  /**
   * Render image preview
   */
  const renderImagePreview = () => {
    if (!selectedImageUri) return null;

    return (
      <View style={styles.imagePreviewContainer}>
        <View style={styles.imagePreview}>
          <Image
            source={{ uri: selectedImageUri }}
            style={styles.previewImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={[styles.removeImageButton, { backgroundColor: colors.accentCoral }]}
            onPress={handleRemoveImage}
            activeOpacity={0.8}
          >
            <ThemedText type="label" style={styles.removeImageText}>
              ✕
            </ThemedText>
          </TouchableOpacity>
        </View>
        <ThemedText type="caption" style={[styles.imagePreviewLabel, { color: colors.textSecondary }]}>
          Ask Juni about your artwork
        </ThemedText>
      </View>
    );
  };

  /**
   * Render input controls
   */
  const renderInputControls = () => {
    return (
      <View style={styles.inputControls}>
        {/* Text Input */}
        <TextInput
          style={[
            styles.textInput,
            {
              minHeight: minInputHeight,
              maxHeight: maxInputHeight,
              borderColor: colors.glassBorderSecondary,
              backgroundColor: colors.glassInput,
              color: isShowingInstructionalText ? colors.textSecondary : colors.text,
              fontSize: isShowingInstructionalText ? 14 : 16, // 50% smaller when showing instructional text
            }
          ]}
          value={message}
          onChangeText={handleTextChange}
          onContentSizeChange={handleContentSizeChange}
          onFocus={handleTextInputFocus}
          onBlur={handleTextInputBlur}
          placeholder={!isShowingInstructionalText ? placeholder : undefined}
          placeholderTextColor={colors.glassPlaceholder}
          multiline={true}
          textAlignVertical="top"
          editable={!disabled && !isLoading}
          returnKeyType="default"
          blurOnSubmit={false}
          scrollEnabled={true}
        />

        {/* Action Buttons - Always on line below text input */}
        <View style={styles.actionButtons}>
          {/* Animated Share Button - slides in from left */}
          {showShareButton && (
            <Animated.View
              style={[
                styles.shareButtonWrapper,
                {
                  transform: [{ translateX: shareButtonSlideAnim }, { scale: shareButtonPulseAnim }],
                }
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.shareButton,
                  { 
                    backgroundColor: '#4CAF50', // Green color for share button
                  }
                ]}
                onPress={onSharePress}
                disabled={disabled || isLoading}
                activeOpacity={0.8}
              >
                <IconSymbol
                  name="square.and.arrow.up"
                  size={20}
                  color="white"
                  weight="medium"
                />
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Spacer to push buttons to right */}
          <View style={{ flex: 1 }} />

          {/* Image Upload Button */}
          <TouchableOpacity
            style={[
              styles.imageButton,
              { 
                backgroundColor: selectedImageUri ? colors.accentSage : colors.glassSecondary,
                opacity: disabled || isLoading ? 0.5 : 1 
              }
            ]}
            onPress={handleImagePicker}
            disabled={disabled || isLoading}
            activeOpacity={0.8}
          >
            <IconSymbol
              name="plus"
              size={20}
              color={selectedImageUri ? 'white' : colors.text}
              weight="medium"
            />
          </TouchableOpacity>

          {/* Send Button */}
          <TouchableOpacity
            style={[
              styles.sendButton,
              { 
                backgroundColor: canSend ? colors.accentSage : colors.border,
                opacity: canSend ? 1 : 0.5 
              }
            ]}
            onPress={handleSendMessage}
            disabled={!canSend}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <IconSymbol
                name="paperplane.fill"
                size={18}
                color="white"
                weight="medium"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <GlassMorphismCard type="secondary" style={[styles.container, { borderColor: colors.border, borderWidth: 2 }]}>
      <View style={styles.content}>
        {/* Image Preview (if selected) */}
        {renderImagePreview()}
        
        {/* Input Controls */}
        {renderInputControls()}
      </View>
    </GlassMorphismCard>
  );
}

// Glass Morphism Input Styles per UIDesign.md
const styles = StyleSheet.create({
  // Main Container
  container: {
    margin: 0,                    // Remove margin to eliminate dead space
    paddingHorizontal: 12,        // Reduced padding to minimize dead space
    paddingVertical: 8,           // Reduced vertical padding to minimize dead space
    marginBottom: 0,              // Explicitly set marginBottom to 0
    marginTop: 0,                 // Explicitly set marginTop to 0
  },
  content: {
    gap: 8,                       // Reduced spacing to minimize dead space
  },

  // Image Preview
  imagePreviewContainer: {
    alignItems: 'center',
    gap: 8,                       // 8px spacing between image and label
  },
  imagePreview: {
    position: 'relative',
    borderRadius: 12,             // 12px border radius per UIDesign.md
    overflow: 'hidden',
  },
  previewImage: {
    width: 100,                   // Compact preview size
    height: 100,                  // Square aspect ratio
    borderRadius: 12,             // Match container border radius
  },
  removeImageButton: {
    position: 'absolute',
    top: 4,                       // 4px from top edge
    right: 4,                     // 4px from right edge
    width: 24,                    // 24px touch target
    height: 24,                   // 24px touch target
    borderRadius: 12,             // Circular button
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: 'white',               // White text on coral background
    fontSize: 12,                 // Small icon size
    fontWeight: 'bold',
  },
  imagePreviewLabel: {
    // Montserrat 11pt per UIDesign.md applied via ThemedText type="caption"
  },

  // Input Controls
  inputControls: {
    flexDirection: 'column',      // Stack vertically so buttons are below text input
    gap: 6,                       // Reduced spacing to minimize dead space
  },
  textInput: {
    width: '100%',                // Take full width since buttons are below
    borderWidth: 1,
    borderRadius: 16,             // 16px border radius per UIDesign.md
    paddingHorizontal: 0,         // No horizontal padding for maximum text space
    paddingVertical: 12,          // 12px vertical padding for text visibility
    fontSize: 16,                 // 16pt per UIDesign.md
    fontFamily: 'Montserrat_400Regular',
    // Height: minHeight to maxHeight (3 lines), then scrollable
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',         // Center buttons vertically
    gap: 8,                       // 8px spacing between buttons
    minHeight: 44,                // Ensure minimum height for buttons
  },
  shareButtonWrapper: {
    // No absolute positioning needed - let it flow naturally in the row
  },
  shareButton: {
    width: 44,                    // 44px touch target per UIDesign.md
    height: 44,                   // Square button
    borderRadius: 22,             // Circular button
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',          // Add subtle shadow for prominence
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,                 // Android shadow
  },
  imageButton: {
    width: 44,                    // 44px touch target per UIDesign.md
    height: 44,                   // Square button
    borderRadius: 22,             // Circular button
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 44,                    // 44px touch target per UIDesign.md
    height: 44,                   // Square button
    borderRadius: 22,             // Circular button
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 