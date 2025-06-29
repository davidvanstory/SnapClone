/**
 * OnboardingModal Component
 * 
 * Main modal component that manages the three-step onboarding flow.
 * Shows Camera → Juni → Community steps and handles navigation between them.
 * Integrates with auth store to mark onboarding as complete.
 */

import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Modal, StatusBar } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { OnboardingStep } from './OnboardingStep';

export interface OnboardingModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Called when modal should be closed */
  onClose: () => void;
}

interface StepConfig {
  feature: 'camera' | 'juni' | 'community';
  title: string;
  description: string;
  iconName: 'camera.fill' | 'brain' | 'house.fill';
  navigationTarget: string;
}

const ONBOARDING_STEPS: StepConfig[] = [
  {
    feature: 'camera',
    title: 'Capture Your Art',
    description: 'Take photos of your art and share them',
    iconName: 'camera.fill',
    navigationTarget: '/(tabs)/camera',
  },
  {
    feature: 'juni',
    title: 'Ask Juni Questions',
    description: 'Get AI-powered feedback and tips on how to improve',
    iconName: 'brain',
    navigationTarget: '/(tabs)/solo',
  },
  {
    feature: 'community',
    title: 'Share With Your Community',
    description: 'Give and get feedback in a supportive environment',
    iconName: 'house.fill',
    navigationTarget: '/(tabs)',
  },
];

export function OnboardingModal({ visible, onClose }: OnboardingModalProps) {
  console.log('🎯 OnboardingModal - Rendering modal, visible:', visible);
  
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const { markOnboardingComplete } = useAuthStore();

  /**
   * Handle navigation to a specific feature
   */
  const handleFeatureNavigation = useCallback(async (targetRoute: string) => {
    console.log('🚀 OnboardingModal - Navigating to feature:', targetRoute);
    
    try {
      // Mark onboarding as complete
      console.log('✅ OnboardingModal - Marking onboarding complete...');
      const result = await markOnboardingComplete();
      
      if (result.success) {
        console.log('✅ OnboardingModal - Onboarding marked complete successfully');
      } else {
        console.error('❌ OnboardingModal - Failed to mark onboarding complete:', result.error);
      }
      
      // Close modal first
      onClose();
      
      // Navigate to the target route
      console.log('🔄 OnboardingModal - Navigating to:', targetRoute);
      router.push(targetRoute as any);
      
    } catch (error) {
      console.error('❌ OnboardingModal - Error during feature navigation:', error);
      // Still close modal and navigate even if marking complete fails
      onClose();
      router.push(targetRoute as any);
    }
  }, [markOnboardingComplete, onClose, router]);

  /**
   * Handle moving to next step or completing onboarding
   */
  const handleNext = useCallback(async () => {
    console.log('➡️ OnboardingModal - Next pressed, current step:', currentStep);
    
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      // Move to next step
      const nextStep = currentStep + 1;
      console.log('➡️ OnboardingModal - Moving to step:', nextStep + 1);
      setCurrentStep(nextStep);
    } else {
      // Last step - complete onboarding and navigate to camera
      console.log('🏁 OnboardingModal - Last step, completing onboarding...');
      await handleFeatureNavigation('/(tabs)/camera');
    }
  }, [currentStep, handleFeatureNavigation]);

  /**
   * Handle closing modal without completing onboarding
   */
  const handleClose = useCallback(async () => {
    console.log('❌ OnboardingModal - Modal closed by user');
    
    try {
      // Still mark as complete even if they close early
      console.log('✅ OnboardingModal - Marking onboarding complete on close...');
      const result = await markOnboardingComplete();
      
      if (result.success) {
        console.log('✅ OnboardingModal - Onboarding marked complete on close');
      } else {
        console.error('❌ OnboardingModal - Failed to mark onboarding complete on close:', result.error);
      }
    } catch (error) {
      console.error('❌ OnboardingModal - Error marking complete on close:', error);
    }
    
    onClose();
  }, [markOnboardingComplete, onClose]);

  if (!visible) {
    return null;
  }

  const currentStepConfig = ONBOARDING_STEPS[currentStep];
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  console.log('🎯 OnboardingModal - Current step config:', {
    step: currentStep + 1,
    total: ONBOARDING_STEPS.length,
    feature: currentStepConfig.feature,
    isLastStep
  });

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={handleClose}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <OnboardingStep
        feature={currentStepConfig.feature}
        title={currentStepConfig.title}
        description={currentStepConfig.description}
        iconName={currentStepConfig.iconName}
        onNext={handleNext}
        onClose={handleClose}
        isLastStep={isLastStep}
        stepNumber={currentStep + 1}
        totalSteps={ONBOARDING_STEPS.length}
      />
    </Modal>
  );
} 