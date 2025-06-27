/**
 * Class Join Modal Component
 * 
 * This modal appears when users access the class feed without being in a class.
 * It allows them to enter a join code to join a class and start accessing the feed.
 * Implements glass morphism design system per UIDesign.md specifications.
 */

import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuthStore } from '../../store/authStore';
import { useClassStore } from '../../store/classStore';
import { ThemedText } from '../ThemedText';
import GlassMorphismCard from '../ui/GlassMorphismCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ClassJoinModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ClassJoinModal({ visible, onClose, onSuccess }: ClassJoinModalProps) {
  console.log('🏫 Class Join Modal - Rendering class join modal');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Form state
  const [joinCode, setJoinCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);

  // Stores
  const { user } = useAuthStore();
  const { joinClassWithCode, isLoading } = useClassStore();

  /**
   * Handle join code input formatting
   */
  const handleJoinCodeChange = (text: string) => {
    // Convert to uppercase and remove non-alphanumeric characters
    const formattedCode = text.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    // Limit to 6 characters
    if (formattedCode.length <= 6) {
      setJoinCode(formattedCode);
    }
  };

  /**
   * Handle class joining
   */
  const handleJoinClass = async () => {
    console.log('🚀 Class Join Modal - Attempting to join class with code:', joinCode);

    if (!user) {
      Alert.alert('Error', 'You must be logged in to join a class.');
      return;
    }

    if (joinCode.length !== 6) {
      Alert.alert('Invalid Code', 'Join codes must be exactly 6 characters (letters and numbers).');
      return;
    }

    setIsJoining(true);

    try {
      const result = await joinClassWithCode(joinCode, user.id);

      if (result.success) {
        console.log('🎉 Class Join Modal - Successfully joined class');
        setJoinCode('');
        
        if (result.isExistingMember) {
          // User was already a member - show different message and don't trigger navigation
          console.log('ℹ️ Class Join Modal - User was already a member, staying on class list');
          onClose();
          Alert.alert(
            'Already a Member!',
            'You are already a member of this class. You can find it in your class list.',
            [{ text: 'Got It', style: 'default' }]
          );
        } else {
          // New member - trigger success callback for navigation
          console.log('🎉 Class Join Modal - New member joined, triggering success callback');
          onSuccess?.();
          onClose();
          Alert.alert(
            'Welcome to the Class!',
            'You can now share artwork and view your classmates\' posts.',
            [{ text: 'Get Started', style: 'default' }]
          );
        }
      } else {
        console.log('❌ Class Join Modal - Failed to join class:', result.error);
        Alert.alert('Unable to Join Class', result.error || 'Please check your join code and try again.');
      }
    } catch (error) {
      console.error('❌ Class Join Modal - Unexpected error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  /**
   * Handle modal dismissal
   */
  const handleClose = () => {
    if (!isJoining && !isLoading) {
      setJoinCode('');
      onClose();
    }
  };

  /**
   * Handle background press to close modal
   */
  const handleBackgroundPress = () => {
    if (!isJoining && !isLoading) {
      handleClose();
    }
  };

  const isFormDisabled = isJoining || isLoading;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleBackgroundPress}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.modalContainer}
            >
              {/* Main Modal Card */}
              <GlassMorphismCard type="primary" style={styles.modalCard}>
                <View style={styles.modalContent}>
                  {/* Header */}
                  <View style={styles.header}>
                    <ThemedText type="screenTitle" style={[styles.title, { color: colors.text }]}>
                      Join a Class
                    </ThemedText>
                    <ThemedText type="bodyText" style={[styles.subtitle, { color: colors.textSecondary }]}>
                      Enter your class join code to start sharing artwork with your classmates.
                    </ThemedText>
                  </View>

                  {/* Join Code Input */}
                  <View style={styles.inputSection}>
                    <ThemedText type="label" style={[styles.label, { color: colors.text }]}>
                      Class Join Code
                    </ThemedText>
                    <TextInput
                      style={[
                        styles.codeInput,
                        {
                          borderColor: codeFocused ? colors.accentSage : colors.border,
                          backgroundColor: codeFocused ? colors.surface : colors.background,
                          color: colors.text,
                          fontFamily: 'Montserrat_600SemiBold',
                        }
                      ]}
                      value={joinCode}
                      onChangeText={handleJoinCodeChange}
                      onFocus={() => setCodeFocused(true)}
                      onBlur={() => setCodeFocused(false)}
                      placeholder="DRAW01"
                      placeholderTextColor={colors.textTertiary}
                      autoCapitalize="characters"
                      autoCorrect={false}
                      autoComplete="off"
                      maxLength={6}
                      editable={!isFormDisabled}
                      keyboardType="default"
                      returnKeyType="go"
                      onSubmitEditing={handleJoinClass}
                    />
                    <ThemedText type="caption" style={[styles.helperText, { color: colors.textTertiary }]}>
                      6-character code (letters and numbers)
                    </ThemedText>
                  </View>

                  {/* Example Code Hint */}
                  <View style={[styles.exampleCard, { backgroundColor: colors.surface }]}>
                    <ThemedText type="bodyText" style={[styles.exampleTitle, { color: colors.accentSage }]}>
                      Try the Demo Class
                    </ThemedText>
                    <ThemedText type="caption" style={[styles.exampleText, { color: colors.textSecondary }]}>
                      Use code <ThemedText style={{ color: colors.accent, fontFamily: 'Montserrat_600SemiBold' }}>DRAW01</ThemedText> to join "Monday Drawing Fundamentals" and explore the app with pre-populated content.
                    </ThemedText>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.joinButton,
                        {
                          backgroundColor: joinCode.length === 6 ? colors.accentSage : colors.surface,
                          opacity: isFormDisabled ? 0.6 : 1,
                        }
                      ]}
                      onPress={handleJoinClass}
                      disabled={isFormDisabled || joinCode.length !== 6}
                      activeOpacity={0.8}
                    >
                      <ThemedText type="button" style={[
                        styles.joinButtonText,
                        { color: joinCode.length === 6 ? '#FFFFFF' : colors.textSecondary }
                      ]}>
                        {isFormDisabled ? 'Joining...' : 'Join Class'}
                      </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.cancelButton,
                        { 
                          borderColor: colors.border,
                          opacity: isFormDisabled ? 0.6 : 1,
                        }
                      ]}
                      onPress={handleClose}
                      disabled={isFormDisabled}
                      activeOpacity={0.8}
                    >
                      <ThemedText type="button" style={[styles.cancelButtonText, { color: colors.textSecondary }]}>
                        Cancel
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </GlassMorphismCard>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    width: '100%',
  },
  modalCard: {
    width: Math.min(screenWidth - 48, 400),
    maxHeight: screenHeight * 0.8,
  },
  modalContent: {
    padding: 32,
    gap: 24,
  },

  // Header
  header: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 22,
  },

  // Input Section
  inputSection: {
    gap: 12,
  },
  label: {
    marginBottom: 4,
  },
  codeInput: {
    height: 56,
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 2,
  },
  helperText: {
    textAlign: 'center',
    marginTop: 4,
  },

  // Example Card
  exampleCard: {
    padding: 20,
    borderRadius: 16,
    gap: 8,
    alignItems: 'center',
  },
  exampleTitle: {
    fontWeight: '600',
  },
  exampleText: {
    textAlign: 'center',
    lineHeight: 18,
  },

  // Buttons
  buttonContainer: {
    gap: 12,
    marginTop: 8,
  },
  joinButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 