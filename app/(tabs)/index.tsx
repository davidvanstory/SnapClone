/**
 * Class Feed Screen - Main Draft App Screen
 * 
 * This screen displays the ephemeral art sharing feed where students can:
 * - View classmates' artwork posts with countdown timers
 * - Access camera to share their own artwork
 * - Engage with posts through comments and interactions
 * - Experience anxiety-reducing, ephemeral content sharing
 * 
 * Design System: Draft monochromatic elegance with Instrument Serif + Montserrat
 */

import { router } from 'expo-router';
import React from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';

export default function ClassFeedScreen() {
  console.log('🎨 Class Feed Screen - Rendering main feed');
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, profile } = useAuthStore();
  
  const handleCameraPress = () => {
    console.log('📸 Class Feed Screen - Opening camera');
    router.push('/(tabs)/camera');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Draft Branding - Instrument Serif */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerContent}>
          <ThemedText type="title" style={[styles.appTitle, { color: colors.text }]}>
            Draft
          </ThemedText>
          <ThemedText type="metadata" style={[styles.classTitle, { color: colors.textSecondary }]}>
            Monday Drawing Fundamentals
          </ThemedText>
        </View>
      </View>

      {/* Feed Content with 8px Grid System */}
      <ScrollView 
        style={styles.feedContainer} 
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Card - Beautiful Typography */}
        <View style={[styles.welcomeCard, { backgroundColor: colors.surface }]}>
          <ThemedText type="heading" style={[styles.welcomeTitle, { color: colors.text }]}>
            Welcome, {profile?.username || user?.email?.split('@')[0]}
          </ThemedText>
          <ThemedText type="body" style={[styles.welcomeText, { color: colors.textSecondary }]}>
            Share your artwork with classmates in this anxiety-free, ephemeral environment. 
            Posts automatically disappear after their timer expires, creating a supportive 
            space for creative exploration.
          </ThemedText>
          
          {/* Elegant Feature Highlights */}
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <ThemedText type="body" style={{ color: colors.accent }}>✦</ThemedText>
              <ThemedText type="caption" style={[styles.featureText, { color: colors.textSecondary }]}>
                Ephemeral sharing reduces anxiety
              </ThemedText>
            </View>
            <View style={styles.featureItem}>
              <ThemedText type="body" style={{ color: colors.accent }}>✦</ThemedText>
              <ThemedText type="caption" style={[styles.featureText, { color: colors.textSecondary }]}>
                AI feedback when you need it
              </ThemedText>
            </View>
            <View style={styles.featureItem}>
              <ThemedText type="body" style={{ color: colors.accent }}>✦</ThemedText>
              <ThemedText type="caption" style={[styles.featureText, { color: colors.textSecondary }]}>
                Supportive peer community
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Coming Soon Notice - Elegant Design */}
        <View style={[styles.comingSoonCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
          <ThemedText type="subheading" style={[styles.comingSoonTitle, { color: colors.text }]}>
            Class Feed
          </ThemedText>
          <ThemedText type="body" style={[styles.comingSoonText, { color: colors.textSecondary }]}>
            Your classmates' ephemeral artwork will appear here. Posts with live countdown 
            timers, encouraging comments, and beautiful frame options.
          </ThemedText>
          <ThemedText type="metadata" style={[styles.buildingText, { color: colors.textTertiary }]}>
            Currently building the feed display, demo content, and social features...
          </ThemedText>
        </View>

        {/* Quick Start Guide */}
        <View style={[styles.quickStartCard, { backgroundColor: colors.accentSoft }]}>
          <ThemedText type="username" style={[styles.quickStartTitle, { color: colors.accent }]}>
            Ready to share?
          </ThemedText>
          <ThemedText type="body" style={[styles.quickStartText, { color: colors.text }]}>
            Tap the camera button below to capture your artwork. You'll be able to add 
            frames, set viewing limits, and choose how long it stays visible.
          </ThemedText>
        </View>
      </ScrollView>

      {/* Large Camera Button - Single Accent Color */}
      <View style={[styles.cameraSection, { backgroundColor: colors.background }]}>
        <TouchableOpacity 
          style={[styles.cameraButton, { backgroundColor: colors.accent }]}
          onPress={handleCameraPress}
          activeOpacity={0.8}
        >
          <ThemedText type="button" style={styles.cameraButtonText}>
            📸 Capture Artwork
          </ThemedText>
        </TouchableOpacity>
        <ThemedText type="caption" style={[styles.cameraHint, { color: colors.textTertiary }]}>
          Full-screen camera with optional framing
        </ThemedText>
      </View>
    </SafeAreaView>
  );
}

// Draft Design System - 8px Grid with Generous Whitespace
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Header Section
  header: {
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 24,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  appTitle: {
    marginBottom: 4,
    textAlign: 'center',
  },
  classTitle: {
    textAlign: 'center',
  },
  
  // Feed Container - 8px Grid System
  feedContainer: {
    flex: 1,
  },
  feedContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 24, // 8px × 3 = consistent spacing
  },
  
  // Welcome Card
  welcomeCard: {
    padding: 24,
    borderRadius: 16,
    gap: 16,
  },
  welcomeTitle: {
    marginBottom: 4,
  },
  welcomeText: {
    marginBottom: 8,
  },
  featureList: {
    gap: 8,
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    flex: 1,
  },
  
  // Coming Soon Card
  comingSoonCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  comingSoonTitle: {
    marginBottom: 4,
  },
  comingSoonText: {
    marginBottom: 8,
  },
  buildingText: {
    fontStyle: 'italic',
  },
  
  // Quick Start Card
  quickStartCard: {
    padding: 24,
    borderRadius: 16,
    gap: 12,
  },
  quickStartTitle: {
    marginBottom: 4,
  },
  quickStartText: {
    // Inherits from ThemedText
  },
  
  // Camera Section - Thumb-friendly Design
  cameraSection: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    paddingTop: 16,
    gap: 8,
  },
  cameraButton: {
    height: 56, // Thumb-friendly 44px+ touch target
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    
    // Subtle shadow for elevation
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cameraButtonText: {
    color: '#FFFFFF',
  },
  cameraHint: {
    textAlign: 'center',
    marginTop: 4,
  },
});
