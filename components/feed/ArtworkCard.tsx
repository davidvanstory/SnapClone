/**
 * Artwork Card Component - Class Feed Chat-Style Design
 * 
 * Individual artwork card for the redesigned class feed interface.
 * Features:
 * - 60% screen width with fixed aspect ratio
 * - Primary glass morphism card for artwork container
 * - Secondary glass morphism metadata strip (no gap)
 * - Artist name, view count, expiry timer, and comment icon
 * - Tap handlers for artwork (full-screen) and comment icon
 * - Typography per UIDesign.md specifications
 */

import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { PostWithUser } from '@/store/classStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface ArtworkCardProps {
  post: PostWithUser;
  onArtworkPress: (post: PostWithUser) => void;
  onCommentPress: (post: PostWithUser) => void;
  isLoading?: boolean; // Loading state for individual card
}

export default function ArtworkCard({
  post,
  onArtworkPress,
  onCommentPress,
  isLoading = false,
}: ArtworkCardProps) {
  console.log('🎨 Artwork Card - Rendering card for post:', post.id, 'Loading:', isLoading);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  /**
   * Calculate card dimensions
   * 60% screen width with square aspect ratio
   */
  const cardWidth = SCREEN_WIDTH * 0.6;
  const cardHeight = cardWidth; // Square aspect ratio

  /**
   * Format time remaining for expiry timer
   */
  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diffMs = expires.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Expired';
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  /**
   * Get user display name
   */
  const getArtistName = () => {
    return post.user?.username || 'Anonymous Artist';
  };

  /**
   * Handle artwork tap - opens full-screen view
   */
  const handleArtworkPress = () => {
    console.log('🖼️ Artwork Card - Artwork tapped for post:', post.id);
    onArtworkPress(post);
  };

  /**
   * Handle comment icon tap - opens comment input
   */
  const handleCommentPress = () => {
    console.log('💬 Artwork Card - Comment icon tapped for post:', post.id);
    onCommentPress(post);
  };

  /**
   * Render loading skeleton
   */
  if (isLoading) {
    return (
      <View style={styles.cardContainer}>
        {/* Primary Glass Morphism Card - Loading Skeleton */}
        <GlassMorphismCard type="primary" style={[styles.artworkCard, { width: cardWidth, height: cardHeight }]}>
          <View style={[styles.loadingSkeleton, { backgroundColor: colors.surface }]} />
        </GlassMorphismCard>

        {/* Secondary Glass Morphism Metadata Strip - Loading */}
        <GlassMorphismCard type="secondary" style={[styles.metadataCard, { width: cardWidth }]}>
          <View style={styles.metadataContent}>
            <View style={styles.metadataLeft}>
              <View style={[styles.loadingText, { backgroundColor: colors.surface, width: 100 }]} />
              <View style={[styles.loadingText, { backgroundColor: colors.surface, width: 80, marginTop: 4 }]} />
            </View>
            <View style={[styles.loadingIcon, { backgroundColor: colors.surface }]} />
          </View>
        </GlassMorphismCard>
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      {/* Primary Glass Morphism Card - Artwork Container */}
      <GlassMorphismCard type="primary" style={[styles.artworkCard, { width: cardWidth, height: cardHeight }]}>
        <TouchableOpacity
          style={styles.artworkTouchable}
          onPress={handleArtworkPress}
          activeOpacity={0.98}
        >
          <Image
            source={{ uri: post.image_url }}
            style={styles.artworkImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </GlassMorphismCard>

      {/* Secondary Glass Morphism Metadata Strip - No Gap */}
      <GlassMorphismCard type="secondary" style={[styles.metadataCard, { width: cardWidth }]}>
        <View style={styles.metadataContent}>
          {/* Left Side - Artist Name and Stats */}
          <View style={styles.metadataLeft}>
            <ThemedText 
              style={[styles.artistName, { color: colors.textSecondary }]}
            >
              {getArtistName()}
            </ThemedText>
            <View style={styles.statsRow}>
              <ThemedText 
                style={[styles.statText, { color: colors.textSecondary }]}
              >
                👁 {post.view_count}/{post.max_viewers}
              </ThemedText>
              <ThemedText 
                style={[styles.statText, { color: colors.textSecondary }]}
              >
                ⏰ {formatTimeRemaining(post.expires_at)}
              </ThemedText>
            </View>
          </View>

          {/* Right Side - Comment Icon */}
          <TouchableOpacity
            style={styles.commentButton}
            onPress={handleCommentPress}
            activeOpacity={0.7}
          >
            <ThemedText 
              style={[styles.commentIcon, { color: colors.textSecondary }]}
            >
              💬
            </ThemedText>
          </TouchableOpacity>
        </View>
      </GlassMorphismCard>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginBottom: 16, // 16px spacing between cards per UIDesign.md
  },
  artworkCard: {
    padding: 0, // No padding for artwork container
    overflow: 'hidden',
  },
  artworkTouchable: {
    width: '100%',
    height: '100%',
  },
  artworkImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20, // Match primary card border radius
  },
  metadataCard: {
    marginTop: -1, // Slight overlap to ensure no visual gap
    paddingHorizontal: 12,
    paddingVertical: 6, // Reduced padding to keep metadata compact
  },
  metadataContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metadataLeft: {
    flex: 1,
  },
  artistName: {
    fontSize: 16, // User Names/Artist Credits: 16-18pt per UIDesign.md
    fontWeight: '400', // Regular weight for Instrument Serif
    fontFamily: Platform.OS === 'ios' ? 'InstrumentSerif-Regular' : 'serif', // Instrument Serif per UIDesign.md
    lineHeight: 20, // 1.25x line height for headers
    marginBottom: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statText: {
    fontSize: 11, // Small details per UIDesign.md
    fontWeight: '400', // Regular weight for Montserrat
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Regular' : 'sans-serif', // Montserrat per UIDesign.md
    lineHeight: 15, // 1.36x line height for metadata
  },
  commentButton: {
    padding: 4,
    marginLeft: 8,
  },
  commentIcon: {
    fontSize: 16,
  },
  // Loading skeleton styles
  loadingSkeleton: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    opacity: 0.5,
  },
  loadingText: {
    height: 12,
    borderRadius: 6,
    opacity: 0.5,
  },
  loadingIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    opacity: 0.5,
  },
}); 