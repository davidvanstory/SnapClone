/**
 * Class Feed Screen - Glass Morphism Artwork-as-Background System
 * 
 * This screen displays the ephemeral art sharing feed where students can:
 * - View classmates' artwork posts as full-screen backgrounds with glass morphism overlays
 * - Swipe vertically between posts with smooth artwork crossfades
 * - Access camera to share their own artwork
 * - Engage with posts through comments and interactions
 * - Experience anxiety-reducing, ephemeral content sharing
 * 
 * Design System: Glass morphism elegance per UIDesign.md specifications
 */

import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import ClassJoinModal from '@/components/feed/ClassJoinModal';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';
import { useClassStore } from '@/store/classStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ClassFeedScreen() {
  console.log('🎨 Class Feed Screen - Rendering glass morphism artwork-as-background feed');
  
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
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [backgroundOpacity] = useState(new Animated.Value(1));

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
    router.push('/camera');
  };

  /**
   * Handle join modal success
   */
  const handleJoinSuccess = () => {
    console.log('🎉 Class Feed Screen - Successfully joined class');
    // The class store will automatically update and load posts
  };

  /**
   * Get current user display name
   */
  const getUserDisplayName = () => {
    return profile?.username || user?.email?.split('@')[0] || 'Artist';
  };

  /**
   * Handle vertical swipe navigation between posts
   */
  const handleSwipeToNext = () => {
    if (currentPostIndex < classPosts.length - 1) {
      console.log('👆 Swiping to next post');
      // Crossfade animation (400ms ease-out per UIDesign.md)
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentPostIndex(currentPostIndex + 1);
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleSwipeToPrevious = () => {
    if (currentPostIndex > 0) {
      console.log('👇 Swiping to previous post');
      // Crossfade animation (400ms ease-out per UIDesign.md)
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentPostIndex(currentPostIndex - 1);
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  /**
   * Format time remaining for display
   */
  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date().getTime();
    const expiry = new Date(expiresAt).getTime();
    const diff = expiry - now;
    
    if (diff <= 0) return 'Expired';
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  // If no class or no posts, show traditional layout for join/empty states
  if (!currentClass || classPosts.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header with class context */}
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

        {/* Empty/Loading State Content */}
        <View style={styles.emptyStateContainer}>
          {!currentClass ? (
            // No class joined
            <GlassMorphismCard type="primary" style={styles.emptyStateCard}>
              <ThemedText type="screenTitle" style={[styles.emptyStateTitle, { color: colors.text }]}>
                Welcome, {getUserDisplayName()}
              </ThemedText>
              <ThemedText type="bodyText" style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                Join a class to start sharing your artwork with classmates in a supportive, 
                ephemeral environment where posts disappear after their timer expires.
              </ThemedText>
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: colors.accentSage }]}
                onPress={() => setShowJoinModal(true)}
                activeOpacity={0.8}
              >
                <ThemedText type="button" style={styles.primaryButtonText}>
                  Join a Class
                </ThemedText>
              </TouchableOpacity>
            </GlassMorphismCard>
          ) : isLoadingPosts ? (
            // Loading posts
            <GlassMorphismCard type="primary" style={styles.emptyStateCard}>
              <ThemedText type="screenTitle" style={[styles.emptyStateTitle, { color: colors.text }]}>
                Loading Feed...
              </ThemedText>
              <ThemedText type="bodyText" style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                Discovering artwork shared by your classmates.
              </ThemedText>
            </GlassMorphismCard>
          ) : (
            // No posts in class
            <GlassMorphismCard type="primary" style={styles.emptyStateCard}>
              <ThemedText type="screenTitle" style={[styles.emptyStateTitle, { color: colors.text }]}>
                No Posts Yet
              </ThemedText>
              <ThemedText type="bodyText" style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                Be the first to share artwork in {currentClass.name}! Your classmates will see your 
                post appear here with a live countdown timer.
              </ThemedText>
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: colors.accentSage }]}
                onPress={handleCameraPress}
                activeOpacity={0.8}
              >
                <ThemedText type="button" style={styles.primaryButtonText}>
                  📸 Share First Artwork
                </ThemedText>
              </TouchableOpacity>
            </GlassMorphismCard>
          )}
        </View>

        {/* Class Join Modal */}
        <ClassJoinModal
          visible={showJoinModal}
          onClose={() => setShowJoinModal(false)}
          onSuccess={handleJoinSuccess}
        />
      </SafeAreaView>
    );
  }

  // Glass Morphism Artwork-as-Background Feed
  const currentPost = classPosts[currentPostIndex];
  
  return (
    <View style={styles.feedContainer}>
      {/* Full-Screen Artwork Background with Dark Gradient Overlay */}
      <Animated.View style={[styles.artworkBackground, { opacity: backgroundOpacity }]}>
        <ImageBackground
          source={{ uri: currentPost.image_url }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* Dark gradient overlay (rgba(0,0,0,0.3) to transparent per UIDesign.md) */}
          <View style={styles.gradientOverlay} />
        </ImageBackground>
      </Animated.View>

      {/* Safe Area for glass morphism overlays */}
      <SafeAreaView style={styles.overlayContainer}>
        {/* Top Card - Post Information (20px margins per UIDesign.md) */}
        <GlassMorphismCard type="primary" style={styles.topCard}>
          <ThemedText 
            type="username" 
            glassText={true} 
            style={styles.artistName}
          >
            {currentPost.user?.username || 'Unknown Artist'}
          </ThemedText>
          <ThemedText 
            type="metadata" 
            glassText={true} 
            style={styles.className}
          >
            {currentClass.name}
          </ThemedText>
          
          {/* View Count and Expiration Side by Side */}
          <View style={styles.statsRow}>
            <ThemedText 
              type="metadata" 
              glassText={true} 
              style={styles.viewCountTop}
            >
              {currentPost.view_count}/{currentPost.max_viewers} views
            </ThemedText>
            <ThemedText 
              type="label" 
              glassText={true} 
              style={styles.timerTop}
            >
              Expires in {formatTimeRemaining(currentPost.expires_at)}
            </ThemedText>
          </View>
        </GlassMorphismCard>

        {/* Bottom Right - Actions Card (Always visible) */}
        <View style={styles.bottomActions}>
          <GlassMorphismCard type="secondary" style={styles.actionsCard}>
            <TouchableOpacity 
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <View style={styles.commentButtonContainer}>
                <ThemedText style={styles.actionIcon}>💬</ThemedText>
                {/* Comment count would go here */}
              </View>
            </TouchableOpacity>
            
            {/* Next Photo Button - Always visible for cycling through photos */}
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleSwipeToNext}
              activeOpacity={0.8}
            >
              <ThemedText type="caption" glassText={true} style={styles.nextLabel}>
                Next
              </ThemedText>
            </TouchableOpacity>
          </GlassMorphismCard>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Glass Morphism Design System Styles per UIDesign.md
const styles = StyleSheet.create({
  // Base Container
  container: {
    flex: 1,
  },
  
  // Feed Container - Full Screen
  feedContainer: {
    flex: 1,
  },
  
  // Artwork Background System
  artworkBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    flex: 1,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark gradient overlay per UIDesign.md
  },
  
  // Glass Morphism Overlay Container
  overlayContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20, // 20px screen margins per UIDesign.md
    paddingTop: 20,
    paddingBottom: 20,
  },
  
  // Top Card - Post Information (Primary Glass Card specs)
  topCard: {
    padding: 20,
    gap: 8,
    alignSelf: 'stretch',
  },
  artistName: {
    fontSize: 18,        // 18pt per UIDesign.md
    fontWeight: '400',   // Regular weight for Instrument Serif
  },
  className: {
    fontSize: 12,        // 12pt per UIDesign.md
    opacity: 0.7,        // rgba(255,255,255,0.7) applied via glassTextSecondary
  },
  timer: {
    fontSize: 14,        // 14pt per UIDesign.md
    fontWeight: '500',   // Medium weight for emphasis
  },
  
  // Stats Row in Top Card (Side by Side)
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8, // Space below class name
  },
  
  // Bottom Actions Container (Above tab bar)
  bottomActions: {
    position: 'absolute',
    bottom: 100, // Space above tab bar (88px tab bar + 12px margin)
    right: 20, // 20px from edge per UIDesign.md
    left: 20,
    alignItems: 'flex-end', // Align to right side
  },
  
  // Next Button (beside comments)
  nextButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle button background
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  nextLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Bottom Left - Stats Card (Secondary Glass specs)
  statsCard: {
    padding: 16,
    gap: 4,
    flex: 0,
    minWidth: 120,
  },
  viewCount: {
    fontSize: 12,        // 12pt per UIDesign.md
  },
  viewCountTop: {
    fontSize: 12,        // 12pt per UIDesign.md
  },
  timerTop: {
    fontSize: 12,        // 12pt per UIDesign.md
  },
  
  // Bottom Right - Actions Card (Secondary Glass specs)  
  actionsCard: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,             // 12px gaps between buttons per UIDesign.md
    alignItems: 'center',
  },
  actionButton: {
    width: 44,           // 44px minimum touch target
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle button background
  },
  actionIcon: {
    fontSize: 24,        // 24px icons per UIDesign.md
    color: 'white',
  },
  commentButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Empty State Styles (Traditional layout)
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
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyStateCard: {
    padding: 32,
    alignItems: 'center',
    gap: 20,
    maxWidth: 400,
  },
  emptyStateTitle: {
    textAlign: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    lineHeight: 24,
  },
  primaryButton: {
    height: 50,
    paddingHorizontal: 32,
    borderRadius: 28,        // 28px fully rounded per UIDesign.md
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    
    // Glass morphism button shadow per UIDesign.md
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});
