import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';

export default function TabLayout() {
  console.log('📱 TabLayout - Rendering tabs layout');
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Onboarding state
  const { 
    shouldShowOnboarding, 
    isCheckingOnboarding, 
    checkOnboardingStatus,
    setShouldShowOnboarding,
    user,
    isInitialized
  } = useAuthStore();
  
  const [isOnboardingModalVisible, setIsOnboardingModalVisible] = useState(false);

  // Check onboarding status when user is available
  useEffect(() => {
    console.log('🎯 TabLayout - useEffect triggered', {
      hasUser: !!user,
      isInitialized,
      isCheckingOnboarding,
      shouldShowOnboarding
    });
    
    if (user && isInitialized && !isCheckingOnboarding) {
      console.log('✅ TabLayout - Checking onboarding status for user:', user.id);
      checkOnboardingStatus();
    } else if (!user && isInitialized) {
      // User logged out, hide onboarding modal
      console.log('👋 TabLayout - User logged out, hiding onboarding modal');
      setIsOnboardingModalVisible(false);
      setShouldShowOnboarding(false);
    }
  }, [user, isInitialized, isCheckingOnboarding, checkOnboardingStatus, setShouldShowOnboarding]);

  // Show modal when onboarding should be displayed
  useEffect(() => {
    console.log('🎯 TabLayout - Onboarding status effect', {
      shouldShowOnboarding,
      isCheckingOnboarding,
      currentModalVisible: isOnboardingModalVisible
    });
    
    if (shouldShowOnboarding && !isCheckingOnboarding) {
      console.log('🎨 TabLayout - Showing onboarding modal');
      setIsOnboardingModalVisible(true);
    }
  }, [shouldShowOnboarding, isCheckingOnboarding]);

  /**
   * Handle onboarding modal close
   */
  const handleOnboardingClose = () => {
    console.log('❌ TabLayout - Onboarding modal closed');
    setIsOnboardingModalVisible(false);
    setShouldShowOnboarding(false);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.accentSage,
          tabBarInactiveTintColor: colors.tabIconDefault,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.glassPrimary,
            borderTopColor: colors.glassBorderPrimary,
            borderTopWidth: 1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 88,
            paddingBottom: 34,
            paddingTop: 8,
            backdropFilter: 'blur(12px)',
          },
          tabBarLabelStyle: {
            fontFamily: 'Montserrat_500Medium',
            fontSize: 12,
            fontWeight: '500',
          },
        }}
        initialRouteName="camera"
      >
        <Tabs.Screen
          name="camera"
          options={{
            title: 'Camera',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol 
                size={focused ? 30 : 28} 
                name="camera.fill" 
                color={color}
                weight={focused ? 'semibold' : 'regular'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Class Feed',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol 
                size={focused ? 30 : 28} 
                name="house.fill" 
                color={color}
                weight={focused ? 'semibold' : 'regular'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="solo"
          options={{
            title: 'Juni',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol 
                size={focused ? 30 : 28} 
                name="brain" 
                color={color}
                weight={focused ? 'semibold' : 'regular'}
              />
            ),
          }}
        />
      </Tabs>
      
      {/* Onboarding Modal */}
      <OnboardingModal
        visible={isOnboardingModalVisible}
        onClose={handleOnboardingClose}
      />
    </>
  );
}
