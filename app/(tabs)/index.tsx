/**
 * Class Feed Screen - Chat-Style Vertical Feed Design
 * 
 * This screen displays the ephemeral art sharing feed where students can:
 * - View classmates' artwork posts as individual cards in a vertical feed
 * - Scroll through posts with efficient rendering
 * - Access camera to share their own artwork
 * - Engage with posts through comments and interactions
 * - Experience anxiety-reducing, ephemeral content sharing
 * 
 * Design System: Glass morphism cards on white background per redesign specs
 */

import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import ClassFeedHeader from '@/components/feed/ClassFeedHeader';
import ClassFeedList from '@/components/feed/ClassFeedList';
import ClassJoinModal from '@/components/feed/ClassJoinModal';
import ClassListScreen from '@/components/feed/ClassListScreen';
import CommentInputModal from '@/components/feed/CommentInputModal';
import FullScreenArtworkView from '@/components/feed/FullScreenArtworkView';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';
import { useClassStore, type PostWithUser } from '@/store/classStore';

export default function ClassFeedScreen() {
  console.log('🎨 Class Feed Screen - Rendering chat-style vertical feed');
  
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
    setCurrentClass,
    refreshFeed,
    createComment,
    markPostAsViewed,
  } = useClassStore();
  
  // Local state
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showClassList, setShowClassList] = useState(true); // Show class selection by default
  const [selectedPost, setSelectedPost] = useState<PostWithUser | null>(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentPost, setCommentPost] = useState<PostWithUser | null>(null);
  const [scrollToPostId, setScrollToPostId] = useState<string | null>(null);

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
   * Check if user should see class list vs feed
   */
  useEffect(() => {
    console.log('🔍 Class Feed Screen - Checking class membership status');
    
    // Always show class list first when user loads the feed tab
    if (user && !isLoading) {
      if (!currentClass) {
        console.log('📚 Class Feed Screen - No class selected, showing class list');
        setShowClassList(true);
        setShowJoinModal(false);
      } else {
        console.log('🎨 Class Feed Screen - Class selected, showing feed');
        setShowClassList(false);
      }
    }
  }, [user, isLoading, currentClass]);

  /**
   * Handle class selection from class list
   */
  const handleClassSelect = (classId: string) => {
    console.log('🎯 Class Feed Screen - Class selected from list:', classId);
    const selectedClass = userClasses.find(c => c.id === classId);
    if (selectedClass) {
      setCurrentClass(selectedClass);
      
      // Force load posts immediately when selecting a class
      if (user?.id) {
        console.log('🔄 Class Feed Screen - Force loading posts for selected class');
        loadClassPosts(selectedClass.id, user.id);
      }
    }
  };

  /**
   * Handle join class button from class list
   */
  const handleJoinClassFromList = () => {
    console.log('➕ Class Feed Screen - Opening join modal from class list');
    setShowJoinModal(true);
  };

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
    setShowJoinModal(false);
    
    // Force refresh of user classes to ensure UI updates
    if (user?.id) {
      console.log('🔄 Class Feed Screen - Refreshing user classes after join');
      loadUserClasses(user.id);
    }
  };

  /**
   * Get current user display name
   */
  const getUserDisplayName = () => {
    return profile?.username || user?.email?.split('@')[0] || 'Artist';
  };

  /**
   * Handle artwork tap - opens full-screen view
   */
  const handleArtworkPress = useCallback((post: PostWithUser) => {
    console.log('🖼️ Class Feed Screen - Opening full-screen view for post:', post.id);
    setSelectedPost(post);
    setShowFullScreen(true);
    
    // Mark post as viewed
    if (user?.id && !post.user_has_viewed) {
      console.log('👁️ Class Feed Screen - Marking post as viewed');
      markPostAsViewed(post.id, user.id);
    }
  }, [user?.id, markPostAsViewed]);

  /**
   * Handle comment tap - opens comment input
   */
  const handleCommentPress = useCallback((post: PostWithUser) => {
    console.log('💬 Class Feed Screen - Opening comments for post:', post.id);
    setCommentPost(post);
    setShowCommentModal(true);
  }, []);

  /**
   * Handle comment submission
   */
  const handleCommentSubmit = useCallback(async (postId: string, comment: string) => {
    console.log('📤 Class Feed Screen - Submitting comment for post:', postId);
    
    if (!user?.id) {
      console.error('❌ Class Feed Screen - No user ID for comment submission');
      return;
    }

    const result = await createComment(postId, user.id, comment);
    
    if (result.success) {
      console.log('✅ Class Feed Screen - Comment submitted successfully');
      // Optionally show success feedback
    } else {
      console.error('❌ Class Feed Screen - Failed to submit comment:', result.error);
      // Optionally show error feedback
    }
  }, [user?.id, createComment]);

  /**
   * Handle refresh
   */
  const handleRefresh = useCallback(() => {
    console.log('🔄 Class Feed Screen - Refreshing feed');
    if (currentClass && user?.id) {
      loadClassPosts(currentClass.id, user.id);
    }
  }, [currentClass, user?.id, loadClassPosts]);

  /**
   * Handle scroll to specific post (for Juni integration)
   * This will be called when navigating from Juni after sharing
   */
  const scrollToPost = useCallback((postId: string) => {
    console.log('📍 Class Feed Screen - Scrolling to post:', postId);
    setScrollToPostId(postId);
  }, []);

  /**
   * Handle scroll completion
   */
  const handleScrollToPostComplete = useCallback(() => {
    console.log('✅ Class Feed Screen - Scroll to post complete');
    setScrollToPostId(null);
  }, []);

  // Store scrollToPost reference for Juni integration
  // In React Native, we'll use navigation params or global state instead of window
  React.useEffect(() => {
    // This will be accessed via navigation params when coming from Juni
    // For now, we have the infrastructure ready
    console.log('📍 Class Feed Screen - Scroll-to-post functionality ready for Juni integration');
  }, [scrollToPost]);

  // Show class selection screen when showClassList is true
  if (showClassList) {
    return (
      <>
        <ClassListScreen 
          onClassSelect={handleClassSelect}
          onJoinClass={handleJoinClassFromList}
        />
        
        {/* Join Class Modal */}
        <ClassJoinModal
          visible={showJoinModal}
          onClose={() => setShowJoinModal(false)}
          onSuccess={handleJoinSuccess}
        />
      </>
    );
  }

  // If no class, show join class state
  if (!currentClass) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View style={styles.headerContent}>
            <ThemedText type="title" style={[styles.appTitle, { color: colors.text }]}>
              Draft
            </ThemedText>
            <ThemedText type="metadata" style={[styles.classTitle, { color: colors.textTertiary }]}>
              No class joined
            </ThemedText>
          </View>
        </View>

        {/* Empty State */}
        <View style={styles.emptyStateContainer}>
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

  // Main feed with vertical scrolling cards
  return (
    <View style={[styles.feedContainer, { backgroundColor: colors.background }]}>
      {/* Fixed Header */}
      <ClassFeedHeader className={currentClass.name} />

      {/* Scrollable Feed */}
      <ClassFeedList
        posts={classPosts}
        isLoading={isLoadingPosts}
        onRefresh={handleRefresh}
        onArtworkPress={handleArtworkPress}
        onCommentPress={handleCommentPress}
        className={currentClass.name}
        headerHeight={100} // Adjust based on actual header height
        scrollToPostId={scrollToPostId}
        onScrollToPostComplete={handleScrollToPostComplete}
      />

      {/* Floating Camera Button */}
      <TouchableOpacity
        style={[styles.cameraButton, { backgroundColor: colors.accentSage }]}
        onPress={handleCameraPress}
        activeOpacity={0.8}
      >
        <ThemedText style={styles.cameraIcon}>📸</ThemedText>
      </TouchableOpacity>

      {/* Full-Screen Artwork View */}
      <FullScreenArtworkView
        visible={showFullScreen}
        post={selectedPost}
        className={currentClass.name}
        onClose={() => {
          console.log('🔙 Class Feed Screen - Closing full-screen view');
          setShowFullScreen(false);
          setSelectedPost(null);
        }}
        onCommentPress={handleCommentPress}
      />

      {/* Comment Input Modal */}
      <CommentInputModal
        visible={showCommentModal}
        post={commentPost}
        onClose={() => {
          console.log('🔙 Class Feed Screen - Closing comment modal');
          setShowCommentModal(false);
          setCommentPost(null);
        }}
        onSubmit={handleCommentSubmit}
      />

      {/* Class Join Modal (in case needed) */}
      <ClassJoinModal
        visible={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onSuccess={handleJoinSuccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Base Container
  container: {
    flex: 1,
  },
  
  // Feed Container
  feedContainer: {
    flex: 1,
  },
  
  // Empty State Styles
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
    borderRadius: 28, // Fully rounded per UIDesign.md
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
  
  // Floating Camera Button
  cameraButton: {
    position: 'absolute',
    bottom: 100, // Above tab bar
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cameraIcon: {
    fontSize: 24,
  },
});
