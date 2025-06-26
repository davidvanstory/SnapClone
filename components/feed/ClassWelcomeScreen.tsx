/**
 * Class Welcome Screen Component - Task 3.7
 * 
 * This screen appears after a user successfully joins a class, providing:
 * - Welcome message with class details
 * - Overview of what they can do in the class
 * - Encouraging messaging to reduce anxiety
 * - Call-to-action to start sharing artwork
 * 
 * Implements glass morphism design system per UIDesign.md specifications.
 */

import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import type { Class, ClassMember } from '../../lib/supabase';
import { ThemedText } from '../ThemedText';
import GlassMorphismCard from '../ui/GlassMorphismCard';

interface ClassWelcomeScreenProps {
  classData: Class & { membership: ClassMember };
  onGetStarted: () => void;
}

export default function ClassWelcomeScreen({ classData, onGetStarted }: ClassWelcomeScreenProps) {
  console.log('🎉 Class Welcome Screen - Rendering welcome for class:', classData.name);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  /**
   * Handle navigation to camera
   */
  const handleShareFirst = () => {
    console.log('📸 Class Welcome Screen - Navigating to camera for first share');
    router.push('/(tabs)/camera');
    onGetStarted();
  };

  /**
   * Handle continue to feed
   */
  const handleViewFeed = () => {
    console.log('👀 Class Welcome Screen - Continuing to class feed');
    onGetStarted();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header */}
        <GlassMorphismCard type="primary" style={styles.welcomeCard}>
          <View style={styles.welcomeHeader}>
            <ThemedText type="title" style={[styles.welcomeEmoji, { color: colors.accent }]}>
              🎉
            </ThemedText>
            <ThemedText type="screenTitle" style={[styles.welcomeTitle, { color: colors.text }]}>
              Welcome to the Class!
            </ThemedText>
            <ThemedText type="bodyText" style={[styles.classNameText, { color: colors.accent }]}>
              {classData.name}
            </ThemedText>
          </View>

          <View style={styles.welcomeContent}>
            <ThemedText type="bodyText" style={[styles.welcomeDescription, { color: colors.textSecondary }]}>
              You've successfully joined your class! This is a supportive, anxiety-free environment 
              where you can share your artwork with classmates and receive encouraging feedback.
            </ThemedText>
          </View>
        </GlassMorphismCard>

        {/* What You Can Do */}
        <GlassMorphismCard type="secondary" style={styles.featuresCard}>
          <ThemedText type="subheading" style={[styles.featuresTitle, { color: colors.text }]}>
            What You Can Do
          </ThemedText>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: colors.accentSage }]}>
                <ThemedText style={styles.featureIconText}>📸</ThemedText>
              </View>
              <View style={styles.featureContent}>
                <ThemedText type="username" style={[styles.featureTitle, { color: colors.text }]}>
                  Share Your Artwork
                </ThemedText>
                <ThemedText type="caption" style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  Capture photos with optional frames and share them with your classmates
                </ThemedText>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: colors.accentSage }]}>
                <ThemedText style={styles.featureIconText}>⏰</ThemedText>
              </View>
              <View style={styles.featureContent}>
                <ThemedText type="username" style={[styles.featureTitle, { color: colors.text }]}>
                  Set Your Own Timer
                </ThemedText>
                <ThemedText type="caption" style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  Choose how long your posts stay visible (30 minutes to tomorrow)
                </ThemedText>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: colors.accentSage }]}>
                <ThemedText style={styles.featureIconText}>💬</ThemedText>
              </View>
              <View style={styles.featureContent}>
                <ThemedText type="username" style={[styles.featureTitle, { color: colors.text }]}>
                  Receive Peer Support
                </ThemedText>
                <ThemedText type="caption" style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  Get encouraging comments and feedback from your classmates
                </ThemedText>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: colors.accentTan }]}>
                <ThemedText style={styles.featureIconText}>🤖</ThemedText>
              </View>
              <View style={styles.featureContent}>
                <ThemedText type="username" style={[styles.featureTitle, { color: colors.text }]}>
                  AI Feedback Available
                </ThemedText>
                <ThemedText type="caption" style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  Request AI analysis and constructive feedback on your own posts
                </ThemedText>
              </View>
            </View>
          </View>
        </GlassMorphismCard>

        {/* Encouraging Message */}
        <GlassMorphismCard type="secondary" style={styles.encouragementCard}>
          <ThemedText type="subheading" style={[styles.encouragementTitle, { color: colors.text }]}>
            Remember
          </ThemedText>
          <ThemedText type="bodyText" style={[styles.encouragementText, { color: colors.textSecondary }]}>
            This is a judgment-free space designed to build confidence. Your posts automatically 
            disappear, so there's no pressure for perfection. Focus on experimentation, 
            learning, and creative growth.
          </ThemedText>
        </GlassMorphismCard>

        {/* Class Information */}
        <GlassMorphismCard type="secondary" style={styles.classInfoCard}>
          <ThemedText type="subheading" style={[styles.classInfoTitle, { color: colors.text }]}>
            Class Information
          </ThemedText>
          
          <View style={styles.classInfoList}>
            <View style={styles.classInfoItem}>
              <ThemedText type="label" style={[styles.classInfoLabel, { color: colors.textSecondary }]}>
                Join Code:
              </ThemedText>
              <ThemedText type="bodyText" style={[styles.classInfoValue, { color: colors.text, fontFamily: 'Montserrat_600SemiBold' }]}>
                {classData.join_code}
              </ThemedText>
            </View>
            
            {classData.description && (
              <View style={styles.classInfoItem}>
                <ThemedText type="label" style={[styles.classInfoLabel, { color: colors.textSecondary }]}>
                  Description:
                </ThemedText>
                <ThemedText type="bodyText" style={[styles.classInfoValue, { color: colors.text }]}>
                  {classData.description}
                </ThemedText>
              </View>
            )}

            <View style={styles.classInfoItem}>
              <ThemedText type="label" style={[styles.classInfoLabel, { color: colors.textSecondary }]}>
                Your Role:
              </ThemedText>
              <ThemedText type="bodyText" style={[styles.classInfoValue, { color: colors.accent }]}>
                {classData.membership.role.charAt(0).toUpperCase() + classData.membership.role.slice(1)}
              </ThemedText>
            </View>
          </View>
        </GlassMorphismCard>
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.actionSection, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.accentSage }]}
          onPress={handleShareFirst}
          activeOpacity={0.8}
        >
          <ThemedText type="button" style={styles.primaryButtonText}>
            📸 Share Your First Artwork
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { borderColor: colors.border }]}
          onPress={handleViewFeed}
          activeOpacity={0.8}
        >
          <ThemedText type="button" style={[styles.secondaryButtonText, { color: colors.textSecondary }]}>
            Explore the Class Feed
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    gap: 24,
  },

  // Welcome Card
  welcomeCard: {
    padding: 32,
    alignItems: 'center',
  },
  welcomeHeader: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  welcomeEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  welcomeTitle: {
    textAlign: 'center',
  },
  classNameText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  welcomeContent: {
    alignItems: 'center',
  },
  welcomeDescription: {
    textAlign: 'center',
    lineHeight: 24,
  },

  // Features Card
  featuresCard: {
    padding: 24,
  },
  featuresTitle: {
    marginBottom: 20,
  },
  featuresList: {
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIconText: {
    fontSize: 20,
  },
  featureContent: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    fontWeight: '600',
  },
  featureDescription: {
    lineHeight: 18,
  },

  // Encouragement Card
  encouragementCard: {
    padding: 24,
    alignItems: 'center',
  },
  encouragementTitle: {
    marginBottom: 12,
    textAlign: 'center',
  },
  encouragementText: {
    textAlign: 'center',
    lineHeight: 24,
  },

  // Class Info Card
  classInfoCard: {
    padding: 24,
  },
  classInfoTitle: {
    marginBottom: 16,
  },
  classInfoList: {
    gap: 16,
  },
  classInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  classInfoLabel: {
    minWidth: 80,
  },
  classInfoValue: {
    flex: 1,
    textAlign: 'right',
  },

  // Action Section
  actionSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(229, 229, 229, 0.5)',
    gap: 12,
  },
  primaryButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 