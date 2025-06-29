/**
 * Class Feed List Component - Vertical Scrolling Container
 * 
 * Scrollable list container for artwork cards in the redesigned class feed.
 * Features:
 * - FlatList for efficient rendering of artwork cards
 * - Proper spacing between cards (16px per UIDesign.md)
 * - Pull-to-refresh functionality
 * - Loading states for individual cards
 * - Scroll-to-post functionality for Juni integration
 * - Empty state handling
 */

import React, { useCallback, useEffect, useRef } from 'react';
import {
    Dimensions,
    FlatList,
    RefreshControl,
    StyleSheet,
    View,
} from 'react-native';

import ArtworkCard from '@/components/feed/ArtworkCard';
import { ThemedText } from '@/components/ThemedText';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { PostWithUser } from '@/store/classStore';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface ClassFeedListProps {
  posts: PostWithUser[];
  isLoading: boolean;
  onRefresh: () => void;
  onArtworkPress: (post: PostWithUser) => void;
  onCommentPress: (post: PostWithUser) => void;
  className: string;
  headerHeight?: number; // Height of fixed header to add padding
  scrollToPostId?: string | null; // Post ID to scroll to when set
  onScrollToPostComplete?: () => void; // Callback when scroll completes
}

export default function ClassFeedList({
  posts,
  isLoading,
  onRefresh,
  onArtworkPress,
  onCommentPress,
  className,
  headerHeight = 100, // Default header height including safe area
  scrollToPostId,
  onScrollToPostComplete,
}: ClassFeedListProps) {
  console.log('📋 Class Feed List - Rendering list with', posts.length, 'posts');
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const listRef = useRef<FlatList<PostWithUser>>(null);

  /**
   * Effect to handle scroll-to-post when scrollToPostId is provided
   */
  useEffect(() => {
    if (scrollToPostId && posts.length > 0) {
      const index = posts.findIndex(post => post.id === scrollToPostId);
      if (index !== -1 && listRef.current) {
        console.log('📍 Class Feed List - Auto-scrolling to post:', scrollToPostId, 'at index:', index);
        
        // Small delay to ensure list is rendered
        setTimeout(() => {
          listRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5, // Center the post in view
          });
          
          // Notify parent that scroll is complete
          setTimeout(() => {
            onScrollToPostComplete?.();
          }, 500); // Wait for animation to complete
        }, 100);
      }
    }
  }, [scrollToPostId, posts, onScrollToPostComplete]);

  /**
   * Render individual artwork card
   */
  const renderItem = useCallback(({ item }: { item: PostWithUser }) => (
    <ArtworkCard
      post={item}
      onArtworkPress={onArtworkPress}
      onCommentPress={onCommentPress}
    />
  ), [onArtworkPress, onCommentPress]);

  /**
   * Key extractor for FlatList
   */
  const keyExtractor = useCallback((item: PostWithUser) => item.id, []);

  /**
   * Empty state when no posts
   */
  const renderEmptyState = () => (
    <View style={[styles.emptyStateContainer, { minHeight: SCREEN_HEIGHT - headerHeight - 100 }]}>
      <GlassMorphismCard type="primary" style={styles.emptyStateCard}>
        <ThemedText type="screenTitle" style={[styles.emptyStateTitle, { color: colors.text }]}>
          Share your art
        </ThemedText>
        <ThemedText type="bodyText" style={[styles.emptyStateText, { color: colors.textSecondary }]}>
          Be the first to share artwork in {className}
        </ThemedText>
      </GlassMorphismCard>
    </View>
  );

  /**
   * Scroll to a specific post by ID (for Juni integration)
   */
  const scrollToPost = useCallback((postId: string) => {
    const index = posts.findIndex(post => post.id === postId);
    if (index !== -1 && listRef.current) {
      console.log('📍 Class Feed List - Scrolling to post at index:', index);
      listRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5, // Center the post in view
      });
    }
  }, [posts]);

  return (
    <FlatList
      ref={listRef}
      data={posts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={[
        styles.listContent,
        { paddingTop: headerHeight }, // Add padding for fixed header
        posts.length === 0 && styles.emptyListContent,
      ]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
          tintColor={colors.textSecondary}
        />
      }
      ListEmptyComponent={renderEmptyState}
      // Performance optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={5}
      windowSize={10}
      initialNumToRender={5}
      // Item layout optimization for better scrollToIndex performance
      getItemLayout={(data, index) => ({
        length: 260, // Approximate height of each card (60% screen width + metadata)
        offset: 260 * index,
        index,
      })}
    />
  );
}

// Export scrollToPost functionality will be added when needed for Juni integration

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 100, // Space for tab bar
  },
  emptyListContent: {
    flexGrow: 1,
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
    gap: 16,
    maxWidth: 300,
  },
  emptyStateTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  emptyStateText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
}); 