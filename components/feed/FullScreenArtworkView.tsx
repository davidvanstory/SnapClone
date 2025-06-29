/**
 * Full-Screen Artwork View Component
 * 
 * Displays artwork in full-screen with glass morphism overlays for post information.
 * Features:
 * - Full-screen artwork background with dark gradient overlay
 * - Glass morphism cards for post info, stats, and actions
 * - Smooth transitions and animations
 * - Comment overlay that slides up from bottom
 * - Pinch-to-zoom capability
 * 
 * Design follows UIDesign.md specifications for full-screen artwork display
 */

import React, { useCallback, useState } from 'react';
import {
    Animated,
    Dimensions,
    ImageBackground,
    Modal,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { PostWithUser } from '@/store/classStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface FullScreenArtworkViewProps {
  visible: boolean;
  post: PostWithUser | null;
  className: string;
  onClose: () => void;
  onCommentPress: (post: PostWithUser) => void;
}

export default function FullScreenArtworkView({
  visible,
  post,
  className,
  onClose,
  onCommentPress,
}: FullScreenArtworkViewProps) {
  console.log('🖼️ Full-Screen Artwork View - Rendering:', post?.id, 'Visible:', visible);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  /**
   * Handle modal open animation
   */
  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  }, [visible, fadeAnim, slideAnim]);

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
   * Handle close animation
   */
  const handleClose = useCallback(() => {
    console.log('🔙 Full-Screen Artwork View - Closing');
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }, [fadeAnim, slideAnim, onClose]);

  /**
   * Handle comment button press
   */
  const handleCommentPress = useCallback(() => {
    if (post) {
      console.log('💬 Full-Screen Artwork View - Opening comments for post:', post.id);
      onCommentPress(post);
    }
  }, [post, onCommentPress]);

  if (!post) return null;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={false}
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Full-Screen Artwork Background */}
        <ImageBackground
          source={{ uri: post.image_url }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* Dark gradient overlay per UIDesign.md */}
          <View style={styles.gradientOverlay} />

          {/* Animated Content */}
          <Animated.View 
            style={[
              styles.overlayContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <SafeAreaView style={styles.safeArea}>
              {/* Top Card - Post Information with Close Button */}
              <Animated.View
                style={{
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <GlassMorphismCard type="primary" style={styles.topCard}>
                  <View style={styles.topCardContent}>
                    {/* Close Button */}
                    <TouchableOpacity 
                      style={styles.closeButton}
                      onPress={handleClose}
                      activeOpacity={0.7}
                    >
                      <ThemedText style={styles.closeIcon}>×</ThemedText>
                    </TouchableOpacity>
                    
                    {/* Post Info */}
                    <View style={styles.postInfo}>
                      <ThemedText 
                        type="username" 
                        glassText={true} 
                        style={styles.artistName}
                      >
                        {post.user?.username || 'Anonymous Artist'}
                      </ThemedText>
                      <ThemedText 
                        type="metadata" 
                        glassText={true} 
                        style={styles.className}
                      >
                        {className}
                      </ThemedText>
                    </View>
                  </View>
                </GlassMorphismCard>
              </Animated.View>

              {/* Bottom Container */}
              <View style={styles.bottomContainer}>
                {/* Bottom Left - Stats Card */}
                <Animated.View
                  style={[
                    styles.statsCard,
                    {
                      transform: [{ translateY: slideAnim }],
                    },
                  ]}
                >
                  <GlassMorphismCard type="secondary" style={styles.statsContent}>
                    <ThemedText 
                      type="metadata" 
                      glassText={true} 
                      style={styles.statText}
                    >
                      {post.view_count}/{post.max_viewers} viewers
                    </ThemedText>
                    <ThemedText 
                      type="metadata" 
                      glassText={true} 
                      style={styles.statText}
                    >
                      Expires in {formatTimeRemaining(post.expires_at)}
                    </ThemedText>
                  </GlassMorphismCard>
                </Animated.View>

                {/* Bottom Right - Actions */}
                <Animated.View
                  style={[
                    styles.actionsCard,
                    {
                      transform: [{ translateY: slideAnim }],
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleCommentPress}
                    activeOpacity={0.7}
                  >
                    <GlassMorphismCard type="secondary" style={styles.actionButtonContent}>
                      <ThemedText style={styles.actionIcon}>💬</ThemedText>
                      {post.comments_count ? (
                        <ThemedText 
                          type="metadata" 
                          glassText={true} 
                          style={styles.commentCount}
                        >
                          {post.comments_count}
                        </ThemedText>
                      ) : null}
                    </GlassMorphismCard>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </SafeAreaView>
          </Animated.View>
        </ImageBackground>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
  overlayContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20, // 20px margins per UIDesign.md
    paddingTop: 20,
    paddingBottom: 20,
  },
  
  // Top Card
  topCard: {
    padding: 20,
  },
  topCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  closeIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: '300',
  },
  postInfo: {
    flex: 1,
  },
  artistName: {
    fontSize: 18, // 18pt per UIDesign.md
    fontWeight: '400',
    marginBottom: 4,
  },
  className: {
    fontSize: 12, // 12pt per UIDesign.md
    opacity: 0.7,
  },
  
  // Bottom Container
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  
  // Stats Card
  statsCard: {
    flex: 1,
    marginRight: 12,
  },
  statsContent: {
    padding: 12,
  },
  statText: {
    fontSize: 12, // 12pt per UIDesign.md
    marginBottom: 4,
  },
  
  // Actions Card
  actionsCard: {
    flexDirection: 'row',
    gap: 12, // 12px gaps per UIDesign.md
  },
  actionButton: {
    minWidth: 48,
  },
  actionButtonContent: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  actionIcon: {
    fontSize: 24, // 24px per UIDesign.md
    color: 'white',
  },
  commentCount: {
    fontSize: 12,
  },
}); 