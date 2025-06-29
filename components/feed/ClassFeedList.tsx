/**
 * Class Feed List Component - Vertical Scrolling Container
 * 
 * Scrollable list container for artwork cards in the redesigned class feed.
 * Features:
 * - FlatList for efficient rendering of artwork cards
 * - Proper spacing between cards (32px doubled from 16px per UIDesign.md)
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
  onJuniPress?: (post: PostWithUser) => void; // New prop for Juni navigation
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
  onJuniPress,
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
      onJuniPress={onJuniPress}
    />
  ), [onArtworkPress, onCommentPress, onJuniPress]);

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
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: headerHeight },
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
          length: 390, // Updated height: caption (70) + artwork (70% screen) + metadata (50) + margin (48)
          offset: 390 * index,
          index,
        })}
      />
    </View>
  );
}

// Export scrollToPost functionality will be added when needed for Juni integration

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,           // Space for floating camera button
    paddingHorizontal: 20,        // Add horizontal padding to prevent icon cutoff
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