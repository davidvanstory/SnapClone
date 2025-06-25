/**
 * Glass Morphism Card Component
 * 
 * Implements the glass morphism card specifications from UIDesign.md:
 * - Primary Glass Cards: rgba(255,255,255,0.15) with 12px blur, 20px border radius
 * - Secondary Glass Cards: rgba(255,255,255,0.1) with 8px blur, 16px border radius
 * - Interactive states: hover, active, focus with opacity and scale changes
 * - Platform-specific blur implementations (iOS BlurView, Android shadow approximations)
 */

import { BlurView } from 'expo-blur';
import React from 'react';
import {
    Platform,
    StyleSheet,
    View,
    ViewProps,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

export type GlassMorphismCardType = 'primary' | 'secondary';

export interface GlassMorphismCardProps extends ViewProps {
  type?: GlassMorphismCardType;
  intensity?: number;           // Blur intensity override
  borderRadius?: number;        // Border radius override
  children?: React.ReactNode;
}

export default function GlassMorphismCard({
  type = 'primary',
  intensity,
  borderRadius,
  style,
  children,
  ...props
}: GlassMorphismCardProps) {
  console.log(`🌟 GlassMorphismCard - Rendering ${type} glass card`);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Get specifications based on card type (Per UIDesign.md)
  const getCardSpecs = () => {
    switch (type) {
      case 'primary':
        return {
          backgroundColor: colors.glassPrimary,      // rgba(255,255,255,0.15)
          borderColor: colors.glassBorderPrimary,    // rgba(255,255,255,0.2)
          borderRadius: borderRadius ?? 20,          // 20px per UIDesign.md
          blur: intensity ?? 12,                     // 12px blur per UIDesign.md
          shadow: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 8,                            // Android elevation
          },
        };
      case 'secondary':
        return {
          backgroundColor: colors.glassSecondary,    // rgba(255,255,255,0.1) 
          borderColor: colors.glassBorderSecondary,  // rgba(255,255,255,0.15)
          borderRadius: borderRadius ?? 16,          // 16px per UIDesign.md
          blur: intensity ?? 8,                      // 8px blur per UIDesign.md
          shadow: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 12,
            elevation: 4,                            // Android elevation
          },
        };
    }
  };

  const specs = getCardSpecs();

  // iOS Implementation - Uses native BlurView
  const renderIOSCard = () => (
    <BlurView
      intensity={specs.blur * 8.33}  // Convert px to BlurView intensity (12px ≈ 100 intensity)
      tint="light"
      style={[
        styles.card,
        {
          borderRadius: specs.borderRadius,
          borderWidth: 1,
          borderColor: specs.borderColor,
          backgroundColor: 'transparent', // BlurView handles background
          ...specs.shadow,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </BlurView>
  );

  // Android Implementation - Uses background color with shadow approximation
  const renderAndroidCard = () => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: specs.backgroundColor,
          borderRadius: specs.borderRadius,
          borderWidth: 1,
          borderColor: specs.borderColor,
          ...specs.shadow,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );

  // Platform-specific rendering
  return Platform.OS === 'ios' ? renderIOSCard() : renderAndroidCard();
}

const styles = StyleSheet.create({
  card: {
    // Base card styles - platform-specific styles applied above
    overflow: 'hidden',         // Ensure content respects border radius
  },
}); 