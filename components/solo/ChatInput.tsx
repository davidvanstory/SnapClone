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
 * 
 * Features:
 * - Auto-expanding text input (1-4 lines)
 * - Image picker integration for artwork uploads
 * - Send button disabled when empty or loading
 * - Image preview with remove functionality
 * - Proper keyboard avoidance and focus management
 * - Error handling for image upload failures
 */

import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export interface ChatInputProps {
  onSendMessage: (message: string, imageUri?: string) => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSendMessage,
  isLoading = false,
  disabled = false,
  placeholder = "Ask Canvas about art techniques, or upload your artwork for feedback...",
}: ChatInputProps) {
  console.log('💬 Chat Input - Rendering with state:', { isLoading, disabled });

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Local state
  const [message, setMessage] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [inputHeight, setInputHeight] = useState(44); // Base height for single line

  // Computed state
  const canSend = !isLoading && !disabled && (message.trim().length > 0 || selectedImageUri);
  const maxInputHeight = 100; // Maximum height for 4 lines
  const minInputHeight = 44;  // Minimum height for single line

  /**
   * Handle text input changes with auto-expanding height
   */
  const handleTextChange = (text: string) => {
    console.log('📝 Chat Input - Text changed, length:', text.length);
    setMessage(text);
  };

  /**
   * Handle text input content size change for auto-expanding
   */
  const handleContentSizeChange = (event: any) => {
    const { height } = event.nativeEvent.contentSize;
    const newHeight = Math.min(Math.max(height + 16, minInputHeight), maxInputHeight);
    console.log('📏 Chat Input - Content size changed, new height:', newHeight);
    setInputHeight(newHeight);
  };

  /**
   * Handle image picker selection
   */
  const handleImagePicker = async () => {
    console.log('🖼️ Chat Input - Opening image picker');

    try {
      // Request permissions
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        console.log('❌ Chat Input - Media library permission denied');
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
        console.log('✅ Chat Input - Image selected:', selectedAsset.uri);
        setSelectedImageUri(selectedAsset.uri);
      } else {
        console.log('ℹ️ Chat Input - Image picker cancelled');
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
    console.log('🗑️ Chat Input - Removing selected image');
    setSelectedImageUri(null);
  };

  /**
   * Handle send message
   */
  const handleSendMessage = async () => {
    if (!canSend) {
      console.log('⚠️ Chat Input - Cannot send message, conditions not met');
      return;
    }

    console.log('🚀 Chat Input - Sending message:', {
      messageLength: message.length,
      hasImage: !!selectedImageUri
    });

    try {
      await onSendMessage(message.trim(), selectedImageUri || undefined);
      
      // Clear input after successful send
      console.log('✅ Chat Input - Message sent successfully, clearing input');
      setMessage('');
      setSelectedImageUri(null);
      setInputHeight(minInputHeight);
      
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

    console.log('🖼️ Chat Input - Rendering image preview');

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
          Artwork to analyze
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
              height: inputHeight,
              borderColor: colors.glassBorderSecondary,
              backgroundColor: colors.glassInput,
              color: colors.text,
            }
          ]}
          value={message}
          onChangeText={handleTextChange}
          onContentSizeChange={handleContentSizeChange}
          placeholder={placeholder}
          placeholderTextColor={colors.glassPlaceholder}
          multiline={true}
          textAlignVertical="top"
          editable={!disabled && !isLoading}
          returnKeyType="default"
          blurOnSubmit={false}
        />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
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
            <ThemedText type="label" style={[
              styles.imageButtonText,
              { color: selectedImageUri ? 'white' : colors.text }
            ]}>
              📷
            </ThemedText>
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
              <ThemedText type="label" style={styles.sendButtonText}>
                ➤
              </ThemedText>
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
    margin: 16,                   // 16px margin from screen edges
    paddingHorizontal: 16,        // 16px internal padding per UIDesign.md
    paddingVertical: 12,          // 12px vertical padding
  },
  content: {
    gap: 12,                      // 12px spacing between elements
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
    flexDirection: 'row',
    alignItems: 'flex-end',       // Align to bottom for multi-line input
    gap: 8,                       // 8px spacing between input and buttons
  },
  textInput: {
    flex: 1,                      // Take remaining space
    borderWidth: 1,
    borderRadius: 16,             // 16px border radius per UIDesign.md
    paddingHorizontal: 16,        // 16px horizontal padding
    paddingVertical: 12,          // 12px vertical padding
    fontSize: 16,                 // 16pt per UIDesign.md
    fontFamily: 'Montserrat_400Regular',
    // Dynamic height handled by state
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 8,                       // 8px spacing between buttons
  },
  imageButton: {
    width: 44,                    // 44px touch target per UIDesign.md
    height: 44,                   // Square button
    borderRadius: 22,             // Circular button
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButtonText: {
    fontSize: 18,                 // Larger emoji size
    // Montserrat 14pt Medium per UIDesign.md applied via ThemedText type="label"
  },
  sendButton: {
    width: 44,                    // 44px touch target per UIDesign.md
    height: 44,                   // Square button
    borderRadius: 22,             // Circular button
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',               // White text on sage background
    fontSize: 18,                 // Larger arrow size
    // Montserrat 14pt Medium per UIDesign.md applied via ThemedText type="label"
  },
}); 