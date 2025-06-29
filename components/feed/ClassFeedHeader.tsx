/**
 * Class Feed Header Component - Fixed Header with Glass Morphism
 * 
 * Fixed header component that stays visible during vertical scrolling.
 * Features:
 * - Fixed positioning at top of screen
 * - Class name display using Instrument Serif typography
 * - Glass morphism styling consistent with app design system
 * - Safe area handling for iOS notches and Android status bars
 * - Subtle shadow/border to separate from scrolling content
 */

import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export interface ClassFeedHeaderProps {
  className: string;
}

export default function ClassFeedHeader({ className }: ClassFeedHeaderProps) {
  console.log('📚 Class Feed Header - Rendering header for class:', className);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.headerContainer}>
      <SafeAreaView style={styles.safeArea}>
        <GlassMorphismCard type="primary" style={styles.headerCard}>
          <View style={styles.headerContent}>
            <ThemedText 
              type="screenTitle" 
              style={[styles.className, { color: colors.text }]}
            >
              {className}
            </ThemedText>
          </View>
        </GlassMorphismCard>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100, // Ensure header stays above scrolling content
  },
  safeArea: {
    backgroundColor: 'transparent',
  },
  headerCard: {
    marginHorizontal: 20, // Screen margins per UIDesign.md
    marginTop: Platform.OS === 'ios' ? 0 : 10, // Additional margin for Android status bar
    // Add subtle shadow to separate from content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  className: {
    fontSize: 24, // Screen titles per UIDesign.md
    fontWeight: '500', // Medium weight for Instrument Serif
    fontFamily: Platform.OS === 'ios' ? 'InstrumentSerif-Regular' : 'serif', // Instrument Serif per UIDesign.md
    textAlign: 'center',
  },
}); 