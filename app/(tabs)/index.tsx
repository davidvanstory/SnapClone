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
import React, { useEffect, useState } from 'react';
import {
    Platform,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import ClassJoinModal from '@/components/feed/ClassJoinModal';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';
import { useClassStore } from '@/store/classStore';

export default function ClassFeedScreen() {
  console.log('🎨 Class Feed Screen - Rendering main feed');
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Auth state
  const { user, profile } = useAuthStore();
  
  // Class state
  const { 
    currentClass, 
    userClasses, 
    classPosts, 
    isLoading, 
    isLoadingPosts,
    loadUserClasses, 
    loadClassPosts,
    refreshFeed 
  } = useClassStore();
  
  // Local state
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Load user's classes on mount and when user changes
   */
  useEffect(() => {
    console.log('📚 Class Feed Screen - Loading user classes for:', user?.id);
    if (user?.id) {
      loadUserClasses(user.id);
    }
  }, [user?.id, loadUserClasses]);

  /**
   * Load class posts when current class changes
   */
  useEffect(() => {
    console.log('📰 Class Feed Screen - Current class changed:', currentClass?.name);
    if (currentClass && user?.id) {
      loadClassPosts(currentClass.id, user.id);
    }
  }, [currentClass?.id, user?.id, loadClassPosts]);

  /**
   * Check if user needs to join a class
   */
  useEffect(() => {
    console.log('🔍 Class Feed Screen - Checking class membership status');
    if (user && !isLoading && userClasses.length === 0) {
      console.log('⚠️ Class Feed Screen - User has no classes, showing join modal');
      setShowJoinModal(true);
    }
  }, [user, isLoading, userClasses.length]);

  /**
   * Handle camera navigation
   */
  const handleCameraPress = () => {
    console.log('📸 Class Feed Screen - Opening camera');
    router.push('/(tabs)/camera');
  };

  /**
   * Handle join modal success
   */
  const handleJoinSuccess = () => {
    console.log('🎉 Class Feed Screen - Successfully joined class');
    // The class store will automatically update and load posts
  };

  /**
   * Handle pull to refresh
   */
  const handleRefresh = async () => {
    console.log('🔄 Class Feed Screen - Refreshing feed');
    setIsRefreshing(true);
    
    try {
      if (user?.id) {
        await loadUserClasses(user.id);
        if (currentClass) {
          await loadClassPosts(currentClass.id, user.id);
        }
      }
      refreshFeed();
    } catch (error) {
      console.error('❌ Class Feed Screen - Error refreshing:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  /**
   * Get current user display name
   */
  const getUserDisplayName = () => {
    return profile?.username || user?.email?.split('@')[0] || 'Artist';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with class context - Task 3.8 */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerContent}>
          <ThemedText type="title" style={[styles.appTitle, { color: colors.text }]}>
            Draft
          </ThemedText>
          {currentClass ? (
            <ThemedText type="metadata" style={[styles.classTitle, { color: colors.textSecondary }]}>
              {currentClass.name}
            </ThemedText>
          ) : (
            <ThemedText type="metadata" style={[styles.classTitle, { color: colors.textTertiary }]}>
              No class joined
            </ThemedText>
          )}
        </View>
      </View>

      {/* Feed Content */}
      <ScrollView 
        style={styles.feedContainer} 
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
            title="Pull to refresh"
            titleColor={colors.textSecondary}
          />
        }
      >
        {currentClass ? (
          // User is in a class - show feed content
          <>
            {/* Welcome Card */}
            <View style={[styles.welcomeCard, { backgroundColor: colors.surface }]}>
              <ThemedText type="heading" style={[styles.welcomeTitle, { color: colors.text }]}>
                Welcome to {currentClass.name}
              </ThemedText>
              <ThemedText type="body" style={[styles.welcomeText, { color: colors.textSecondary }]}>
                Share your artwork with classmates in this anxiety-free, ephemeral environment. 
                Posts automatically disappear after their timer expires.
              </ThemedText>
            </View>

            {/* Feed Posts */}
            {isLoadingPosts ? (
              <View style={[styles.loadingCard, { backgroundColor: colors.surface }]}>
                <ThemedText type="body" style={[styles.loadingText, { color: colors.textSecondary }]}>
                  Loading class feed...
                </ThemedText>
              </View>
            ) : classPosts.length > 0 ? (
              <View style={[styles.postsContainer, { backgroundColor: colors.surface }]}>
                <ThemedText type="subheading" style={[styles.postsTitle, { color: colors.text }]}>
                  Recent Artwork ({classPosts.length})
                </ThemedText>
                <ThemedText type="body" style={[styles.postsDescription, { color: colors.textSecondary }]}>
                  Your classmates have shared {classPosts.length} piece{classPosts.length !== 1 ? 's' : ''} of artwork. 
                  Tap the camera below to add your own!
                </ThemedText>
              </View>
            ) : (
              <View style={[styles.emptyCard, { backgroundColor: colors.surface }]}>
                <ThemedText type="subheading" style={[styles.emptyTitle, { color: colors.text }]}>
                  No Posts Yet
                </ThemedText>
                <ThemedText type="body" style={[styles.emptyText, { color: colors.textSecondary }]}>
                  Be the first to share artwork in {currentClass.name}! Your classmates will see your 
                  post appear here with a live countdown timer.
                </ThemedText>
              </View>
            )}

            {/* Quick Start Guide */}
            <View style={[styles.quickStartCard, { backgroundColor: colors.surface }]}>
              <ThemedText type="username" style={[styles.quickStartTitle, { color: colors.accent }]}>
                Ready to share?
              </ThemedText>
              <ThemedText type="body" style={[styles.quickStartText, { color: colors.text }]}>
                Tap the camera button below to capture your artwork. You'll be able to add 
                frames, set viewing limits, and choose how long it stays visible.
              </ThemedText>
            </View>
          </>
        ) : (
          // User has no class - show placeholder content
          <>
            {/* Welcome Card */}
            <View style={[styles.welcomeCard, { backgroundColor: colors.surface }]}>
              <ThemedText type="heading" style={[styles.welcomeTitle, { color: colors.text }]}>
                Welcome, {getUserDisplayName()}
              </ThemedText>
              <ThemedText type="body" style={[styles.welcomeText, { color: colors.textSecondary }]}>
                Join a class to start sharing your artwork with classmates in a supportive, 
                ephemeral environment where posts disappear after their timer expires.
              </ThemedText>
            </View>

            {/* Join Class Prompt */}
            <View style={[styles.joinPromptCard, { backgroundColor: colors.surface, borderColor: colors.accent }]}>
              <ThemedText type="subheading" style={[styles.joinPromptTitle, { color: colors.accent }]}>
                Join Your First Class
              </ThemedText>
              <ThemedText type="body" style={[styles.joinPromptText, { color: colors.textSecondary }]}>
                Ask your instructor for a class join code to get started. You'll be able to 
                share artwork and see your classmates' posts.
              </ThemedText>
              <TouchableOpacity
                style={[styles.joinPromptButton, { backgroundColor: colors.accent }]}
                onPress={() => setShowJoinModal(true)}
                activeOpacity={0.8}
              >
                <ThemedText type="button" style={styles.joinPromptButtonText}>
                  Enter Join Code
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Feature Highlights */}
            <View style={[styles.featuresCard, { backgroundColor: colors.surface }]}>
              <ThemedText type="subheading" style={[styles.featuresTitle, { color: colors.text }]}>
                What You Can Do
              </ThemedText>
              <View style={styles.featureList}>
                <View style={styles.featureItem}>
                  <ThemedText type="body" style={{ color: colors.accent }}>📸</ThemedText>
                  <ThemedText type="caption" style={[styles.featureText, { color: colors.textSecondary }]}>
                    Share artwork with optional frames
                  </ThemedText>
                </View>
                <View style={styles.featureItem}>
                  <ThemedText type="body" style={{ color: colors.accent }}>⏰</ThemedText>
                  <ThemedText type="caption" style={[styles.featureText, { color: colors.textSecondary }]}>
                    Set timers for anxiety-free sharing
                  </ThemedText>
                </View>
                <View style={styles.featureItem}>
                  <ThemedText type="body" style={{ color: colors.accent }}>💬</ThemedText>
                  <ThemedText type="caption" style={[styles.featureText, { color: colors.textSecondary }]}>
                    Receive supportive peer feedback
                  </ThemedText>
                </View>
                <View style={styles.featureItem}>
                  <ThemedText type="body" style={{ color: colors.accent }}>🤖</ThemedText>
                  <ThemedText type="caption" style={[styles.featureText, { color: colors.textSecondary }]}>
                    Get AI feedback when you need it
                  </ThemedText>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Camera Button */}
      <View style={[styles.cameraSection, { backgroundColor: colors.background }]}>
        <TouchableOpacity 
          style={[
            styles.cameraButton, 
            { 
              backgroundColor: currentClass ? colors.accent : colors.surface,
              opacity: currentClass ? 1 : 0.6,
            }
          ]}
          onPress={handleCameraPress}
          disabled={!currentClass}
          activeOpacity={0.8}
        >
          <ThemedText type="button" style={[
            styles.cameraButtonText,
            { color: currentClass ? '#FFFFFF' : colors.textSecondary }
          ]}>
            📸 {currentClass ? 'Capture Artwork' : 'Join Class to Share'}
          </ThemedText>
        </TouchableOpacity>
        <ThemedText type="caption" style={[styles.cameraHint, { color: colors.textTertiary }]}>
          {currentClass ? 'Full-screen camera with optional framing' : 'Join a class to start sharing'}
        </ThemedText>
      </View>

      {/* Class Join Modal - Task 3.5 */}
      <ClassJoinModal
        visible={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onSuccess={handleJoinSuccess}
      />
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
  
  // Loading State
  loadingCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
  },
  
  // Posts Container
  postsContainer: {
    padding: 24,
    borderRadius: 16,
    gap: 12,
  },
  postsTitle: {
    marginBottom: 4,
  },
  postsDescription: {
    lineHeight: 22,
  },
  
  // Empty State
  emptyCard: {
    padding: 24,
    borderRadius: 16,
    gap: 12,
    alignItems: 'center',
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  
  // Join Prompt Card
  joinPromptCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    gap: 16,
    alignItems: 'center',
  },
  joinPromptTitle: {
    textAlign: 'center',
  },
  joinPromptText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  joinPromptButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    marginTop: 8,
  },
  joinPromptButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  
  // Features Card
  featuresCard: {
    padding: 24,
    borderRadius: 16,
    gap: 16,
  },
  featuresTitle: {
    marginBottom: 8,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureText: {
    flex: 1,
  },
  
  // Quick Start Card
  quickStartCard: {
    padding: 24,
    borderRadius: 16,
    gap: 12,
    alignItems: 'center',
  },
  quickStartTitle: {
    textAlign: 'center',
  },
  quickStartText: {
    textAlign: 'center',
    lineHeight: 22,
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
