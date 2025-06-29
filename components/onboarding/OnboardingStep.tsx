/**
 * OnboardingStep Component
 * 
 * Individual step component for the onboarding modal that highlights
 * each main feature (Camera, Juni, Community) with glass morphism styling.
 * Follows the design system from UIDesign.md with clean, action-focused content.
 */

import { IconSymbol } from '@/components/ui/IconSymbol';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface OnboardingStepProps {
  /** The main feature being highlighted */
  feature: 'camera' | 'juni' | 'community';
  /** Brief, action-focused title */
  title: string;
  /** Short description of what the user can do */
  description: string;
  /** Icon name from IconSymbol */
  iconName: 'camera.fill' | 'brain' | 'house.fill';
  /** Called when user taps anywhere on the modal card or Next button */
  onNext: () => void;
  /** Called when user wants to close the modal (tap outside) */
  onClose: () => void;
  /** Whether this is the last step */
  isLastStep?: boolean;
  /** Current step number (1, 2, or 3) */
  stepNumber: number;
  /** Total number of steps */
  totalSteps: number;
}

export function OnboardingStep({
  feature,
  title,
  description,
  iconName,
  onNext,
  onClose,
  isLastStep = false,
  stepNumber,
  totalSteps
}: OnboardingStepProps) {
  console.log(`🎯 OnboardingStep - Rendering step ${stepNumber}/${totalSteps} for feature: ${feature}`);

  return (
    <View style={styles.container}>
      {/* Background Overlay - Tap to close */}
      <TouchableOpacity 
        style={styles.backgroundOverlay} 
        onPress={onClose}
        activeOpacity={1}
      />
      
      {/* Main Content Card - Tap anywhere to continue */}
      <TouchableOpacity
        style={styles.contentCardContainer}
        onPress={onNext}
        activeOpacity={0.95}
      >
        <BlurView intensity={12} style={styles.contentCard}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            {Array.from({ length: totalSteps }, (_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index < stepNumber ? styles.progressDotActive : styles.progressDotInactive
                ]}
              />
            ))}
          </View>

          {/* Feature Icon */}
          <View style={styles.iconContainer}>
            <BlurView intensity={8} style={styles.iconBackground}>
              <IconSymbol 
                name={iconName} 
                size={32} 
                color="rgba(255, 255, 255, 0.9)" 
              />
            </BlurView>
          </View>

          {/* Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {/* Next/Finish Button */}
            <TouchableOpacity
              style={styles.nextButton}
              onPress={onNext}
              activeOpacity={0.8}
            >
              <BlurView intensity={15} style={styles.nextButtonBlur}>
                <Text style={styles.nextButtonText}>
                  {isLastStep ? 'Finish' : 'Next'}
                </Text>
                <IconSymbol 
                  name={isLastStep ? 'checkmark' : 'chevron.right'} 
                  size={16} 
                  color="rgba(255, 255, 255, 0.9)" 
                  style={styles.buttonIcon}
                />
              </BlurView>
            </TouchableOpacity>

            {/* Tap anywhere hint */}
            <Text style={styles.tapHint}>
              Tap anywhere to {isLastStep ? 'finish' : 'continue'}
            </Text>
          </View>

          {/* Step Counter */}
          <Text style={styles.stepCounter}>
            {stepNumber} of {totalSteps}
          </Text>
        </BlurView>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  
  contentCardContainer: {
    width: screenWidth - 40, // 20px margins on each side
    maxWidth: 340,
  },
  
  contentCard: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    // Glass morphism shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    // Glass morphism border
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  
  progressDotActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  
  progressDotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  iconContainer: {
    marginBottom: 20,
  },
  
  iconBackground: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  
  title: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 24,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.02,
  },
  
  description: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  
  nextButton: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  
  nextButtonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    gap: 8,
  },
  
  nextButtonText: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  
  buttonIcon: {
    marginLeft: 4,
  },
  
  tapHint: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
  },
  
  stepCounter: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 20,
  },
}); 