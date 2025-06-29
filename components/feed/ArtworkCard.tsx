/**
 * Artwork Card Component - Class Feed Chat-Style Design
 * 
 * Individual artwork card for the redesigned class feed interface.
 * Features:
 * - 70% screen width with fixed aspect ratio
 * - Caption/question header from artist for feedback requests
 * - Primary glass morphism card for artwork container
 * - Secondary glass morphism metadata strip (no gap)
 * - Artist name, view count, expiry timer, and comment icon
 * - Juni AI icon positioned on side border of artwork
 * - Tap handlers for artwork (full-screen) and comment icon
 * - Typography per UIDesign.md specifications
 */

import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { PostWithUser } from '@/store/classStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface ArtworkCardProps {
  post: PostWithUser;
  onArtworkPress: (post: PostWithUser) => void;
  onCommentPress: (post: PostWithUser) => void;
  onJuniPress?: (post: PostWithUser) => void; // New prop for Juni navigation
  isLoading?: boolean; // Loading state for individual card
}

export default function ArtworkCard({
  post,
  onArtworkPress,
  onCommentPress,
  onJuniPress,
  isLoading = false,
}: ArtworkCardProps) {
  console.log('🎨 Artwork Card - Rendering card for post:', post.id, 'Loading:', isLoading);
  console.log('📝 Artwork Card - Post caption/question:', post.description);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  /**
   * Calculate card dimensions
   * 70% screen width with square aspect ratio
   */
  const cardWidth = SCREEN_WIDTH * 0.7;
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
   * Get artist name with fallback
   */
  const getArtistName = () => {
    return post.user?.username || 'Anonymous';
  };

  /**
   * Get artist caption/question with fallback
   */
  const getArtistCaption = () => {
    // If no description, provide default encouraging prompts
    if (!post.description || post.description.trim() === '') {
      const defaultCaptions = [
        "What do you think?",
        "Looking for feedback!",
        "Work in progress...",
        "Thoughts?",
      ];
      // Use post ID to consistently select a default
      const index = post.id.charCodeAt(0) % defaultCaptions.length;
      return defaultCaptions[index];
    }
    return post.description;
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
   * Handle Juni icon tap - opens Juni with this image
   */
  const handleJuniPress = () => {
    console.log('🧠 Artwork Card - Juni icon tapped for post:', post.id);
    onJuniPress?.(post);
  };

  /**
   * Render loading skeleton
   */
  if (isLoading) {
    return (
      <View style={styles.container}>
        {/* Caption Header Loading Skeleton */}
        <GlassMorphismCard type="secondary" style={[styles.captionCard, { width: cardWidth }]}>
          <View style={[styles.loadingText, { backgroundColor: colors.border, width: '80%', height: 16, marginBottom: 4 }]} />
          <View style={[styles.loadingText, { backgroundColor: colors.border, width: '60%', height: 16 }]} />
        </GlassMorphismCard>

        {/* Primary Glass Morphism Card - Artwork Container */}
        <GlassMorphismCard type="primary" style={[styles.card, { width: cardWidth }]}>
          <View style={[styles.artworkWrapper, { height: cardHeight }]}>
            <View style={[styles.artworkContainer, styles.loadingSkeleton, { backgroundColor: colors.border }]}>
              <ActivityIndicator size="large" color={colors.accentSage} />
            </View>
          </View>
        </GlassMorphismCard>

        {/* Secondary Glass Morphism Metadata Strip */}
        <GlassMorphismCard type="secondary" style={[styles.metadataCard, { width: cardWidth }]}>
          <View style={styles.metadataContent}>
            <View style={styles.metadataLeft}>
              <View style={[styles.loadingText, { backgroundColor: colors.border, width: 100, marginBottom: 4 }]} />
              <View style={[styles.loadingText, { backgroundColor: colors.border, width: 80 }]} />
            </View>
          </View>
        </GlassMorphismCard>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Caption/Question Header */}
      <GlassMorphismCard type="secondary" style={[styles.captionCard, { width: cardWidth }]}>
        <ThemedText type="bodyText" style={[styles.captionText, { color: colors.accentDarkSage }]}>
          {getArtistCaption()}
        </ThemedText>
      </GlassMorphismCard>

      <GlassMorphismCard type="primary" style={[styles.card, { width: cardWidth }]}>
        {/* Artwork Container with relative positioning for overlay */}
        <View style={styles.artworkWrapper}>
          {/* Artwork Image */}
          <TouchableOpacity
            style={styles.artworkContainer}
            onPress={handleArtworkPress}
            activeOpacity={0.9}
          >
            {isLoading ? (
              // Loading skeleton
              <View style={[styles.artwork, styles.loadingSkeleton, { backgroundColor: colors.border }]}>
                <ActivityIndicator size="large" color={colors.accentSage} />
              </View>
            ) : (
              <Image
                source={{ uri: post.image_url }}
                style={styles.artwork}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
          
          {/* Juni AI Icon Overlay - Right Side Border */}
          {onJuniPress && !isLoading && (
            <TouchableOpacity
              style={styles.juniOverlayButton}
              onPress={handleJuniPress}
              activeOpacity={0.8}
            >
              <View style={[styles.juniIconCircle, { backgroundColor: colors.accentSage }]}>
                <IconSymbol
                  name="brain"
                  size={20}
                  color="white"
                  weight="regular"
                />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Metadata Strip with Secondary Glass Morphism */}
        <GlassMorphismCard type="secondary" style={styles.metadataCard}>
          <View style={styles.metadataContent}>
            {/* Left Side - Artist Info */}
            <View style={styles.metadataLeft}>
              <ThemedText type="username" style={[styles.artistName, { color: colors.text }]}>
                {getArtistName()}
              </ThemedText>
              <View style={styles.statsRow}>
                <ThemedText type="metadata" style={[styles.metadata, { color: colors.textSecondary }]}>
                  👁 {post.view_count}/{post.max_viewers}
                </ThemedText>
                <ThemedText type="metadata" style={[styles.metadata, { color: colors.textSecondary }]}>
                  ⏰ {formatTimeRemaining(post.expires_at)}
                </ThemedText>
              </View>
            </View>

            {/* Right Side - Comment Icon */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleCommentPress}
                activeOpacity={0.7}
              >
                <ThemedText 
                  style={[styles.actionIcon, { color: colors.textSecondary }]}
                >
                  💬
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </GlassMorphismCard>
      </GlassMorphismCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 48,             // Doubled from 24px for 100% increase in spacing
  },
  captionCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,              // Small gap between caption and artwork
  },
  captionText: {
    fontSize: 15,                 // Body text size per UIDesign.md (14-16pt)
    fontWeight: '400',            // Regular weight for Montserrat
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Regular' : 'sans-serif',
    lineHeight: 22,               // 1.47x line height for readability
    textAlign: 'center',          // Center align caption
  },
  card: {
    padding: 0,                   // No padding for artwork container
    overflow: 'visible',          // Allow Juni icon to extend outside
    width: '70%',                 // 70% screen width per requirements
  },
  artworkWrapper: {
    position: 'relative',         // For absolute positioning of overlay
    overflow: 'visible',          // Allow icon to extend outside
  },
  artworkContainer: {
    width: '100%',
    aspectRatio: 1,               // Square aspect ratio
    borderRadius: 16,             // 16px border radius per UIDesign.md
    overflow: 'hidden',
  },
  artwork: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  loadingSkeleton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  metadataCard: {
    marginTop: -1,                // Slight overlap to ensure no visual gap
    paddingHorizontal: 12,
    paddingVertical: 6,           // Reduced padding to keep metadata compact
    width: '100%',                // Match parent width
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
  metadata: {
    fontSize: 11, // Small details per UIDesign.md
    fontWeight: '400', // Regular weight for Montserrat
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Regular' : 'sans-serif', // Montserrat per UIDesign.md
    lineHeight: 15, // 1.36x line height for metadata
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // Space between icons
  },
  actionButton: {
    padding: 4,
  },
  actionIcon: {
    fontSize: 16,
  },
  // Loading skeleton styles
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
  // Juni Overlay Button - Now on the side
  juniOverlayButton: {
    position: 'absolute',
    top: '50%',                   // Center vertically
    right: -18,                   // Half the icon width (36/2) to position half off
    transform: [{ translateY: -18 }], // Center vertically by offsetting half height
    zIndex: 10,                   // Above the image
  },
  juniIconCircle: {
    width: 36,                    // Circle size
    height: 36,                   // Circle size
    borderRadius: 18,             // Perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,                 // Android shadow
  },
}); 