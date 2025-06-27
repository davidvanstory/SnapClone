/**
 * Class List Screen Component
 * 
 * This component provides an intermediate page between the Class Feed tab and the actual feed.
 * Features:
 * - Lists all classes the user is enrolled in
 * - "Join a Class +" button in top right corner
 * - Glass morphism design matching the app's aesthetic
 * - Mental breathing room and better app orientation
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useClassStore } from '../../store/classStore';
import { ThemedText } from '../ThemedText';
import GlassMorphismCard from '../ui/GlassMorphismCard';

interface ClassListScreenProps {
  onClassSelect: (classId: string) => void;
  onJoinClass: () => void;
}

export default function ClassListScreen({ onClassSelect, onJoinClass }: ClassListScreenProps) {
  console.log('📚 Class List Screen - Rendering class selection interface');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { userClasses, isLoading } = useClassStore();

  console.log('📚 Class List Screen - User classes count:', userClasses.length);
  console.log('🔧 DEBUG - ClassListScreen render:', {
    userClassesCount: userClasses.length,
    isLoading,
    classIds: userClasses.map(c => c.id),
    classNames: userClasses.map(c => c.name),
    timestamp: Date.now()
  });

  /**
   * Handle class selection
   */
  const handleClassPress = (classId: string, className: string) => {
    console.log('🎯 Class List Screen - Selected class:', className);
    console.log('🔧 DEBUG - handleClassPress called:', {
      classId,
      className,
      userClassesCount: userClasses.length,
      timestamp: Date.now(),
      foundClass: userClasses.find(c => c.id === classId) ? 'YES' : 'NO'
    });
    onClassSelect(classId);
  };

  /**
   * Handle join class button press
   */
  const handleJoinClassPress = () => {
    console.log('➕ Class List Screen - Opening join class modal');
    onJoinClass();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Soft gradient background per UIDesign.md */}
      <View style={[styles.backgroundGradient, { backgroundColor: colors.surface }]} />
      
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="screenTitle" style={[styles.title, { color: colors.text }]}>
          Your Classes
        </ThemedText>
        
        {/* Join Class Button */}
        <TouchableOpacity
          style={[styles.joinButton, { backgroundColor: colors.accentSage }]}
          onPress={handleJoinClassPress}
          activeOpacity={0.8}
        >
          <ThemedText type="button" style={styles.joinButtonText}>
            Join a Class +
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {isLoading ? (
          // Loading State
          <GlassMorphismCard type="primary" style={styles.loadingCard}>
            <ThemedText type="bodyText" style={[styles.loadingText, { color: colors.textSecondary }]}>
              Loading your classes...
            </ThemedText>
          </GlassMorphismCard>
        ) : userClasses.length === 0 ? (
          // Empty State
          <GlassMorphismCard type="primary" style={styles.emptyCard}>
            <ThemedText type="heading" style={[styles.emptyTitle, { color: colors.text }]}>
              No Classes Yet
            </ThemedText>
            <ThemedText type="bodyText" style={[styles.emptyText, { color: colors.textSecondary }]}>
              Join your first class to start sharing art with classmates
            </ThemedText>
          </GlassMorphismCard>
        ) : (
          // Class List
          <View style={styles.classList}>
            {userClasses.map((userClass) => (
              <TouchableOpacity
                key={userClass.id}
                onPress={() => handleClassPress(userClass.id, userClass.name)}
                activeOpacity={0.7}
                style={styles.classButton}
              >
                <GlassMorphismCard type="secondary" style={styles.classCard}>
                  <View style={styles.classCardContent}>
                    {/* Main content section */}
                    <View style={styles.classInfo}>
                      <ThemedText type="heading" style={[styles.className, { color: colors.text }]}>
                        {userClass.name}
                      </ThemedText>
                      <ThemedText type="metadata" style={[styles.classDetails, { color: colors.textSecondary }]}>
                        {userClass.description || 'Art class'}
                      </ThemedText>
                      
                      {/* Call to action text */}
                      <ThemedText type="caption" style={[styles.tapToEnter, { color: colors.accentSage }]}>
                        📱 Tap to enter class
                      </ThemedText>
                    </View>
                    
                    {/* Enhanced arrow indicator with background */}
                    <View style={[styles.arrowContainer, { backgroundColor: colors.accentSage }]}>
                      <ThemedText style={styles.arrow}>
                        →
                      </ThemedText>
                    </View>
                  </View>
                </GlassMorphismCard>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// Glass Morphism Design System Styles per UIDesign.md
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, // 20px margins per UIDesign.md
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    // Instrument Serif 24pt per UIDesign.md applied via ThemedText type="screenTitle"
  },
  joinButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20, // Pill shape
  },
  joinButtonText: {
    color: 'white',
    fontSize: 14, // 14pt per UIDesign.md
    fontWeight: '600',
  },
  
  // Content
  content: {
    flex: 1,
    paddingHorizontal: 20, // 20px margins per UIDesign.md
  },
  
  // Loading State
  loadingCard: {
    padding: 24,
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
  },
  
  // Empty State
  emptyCard: {
    padding: 24,
    alignItems: 'center',
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  
  // Class List
  classList: {
    gap: 12, // 12px spacing between cards
  },
  classButton: {
    // Enhanced touch feedback and visual button styling
    borderRadius: 16,
    overflow: 'hidden',
    // Add subtle shadow to make it feel more button-like
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  classCard: {
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(139, 169, 134, 0.3)', // Subtle sage border to indicate clickability
  },
  classCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // Increased gap for better visual separation
  },
  classInfo: {
    flex: 1,
    gap: 4, // Consistent spacing between text elements
  },
  className: {
    // Instrument Serif 18pt per UIDesign.md applied via ThemedText type="heading"
    marginBottom: 2,
  },
  classDetails: {
    fontSize: 12, // 12pt per UIDesign.md
    marginBottom: 6,
  },
  tapToEnter: {
    fontSize: 11,
    fontWeight: '600',
    fontStyle: 'italic',
    marginTop: 4,
  },
  arrowContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    // Enhanced visual prominence
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // White arrow on sage background
  },
}); 