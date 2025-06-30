/**
 * Camera Screen Component
 * 
 * This component provides camera functionality for the SnapClone app.
 * Features:
 * - Camera permissions handling
 * - Photo capture with quality settings
 * - Image preview after capture
 * - Photo upload to Supabase Storage
 * - Share to class feed functionality with modal
 * - Themed styling that adapts to light/dark mode
 * - Error handling and loading states
 * - Logout functionality for easy user testing
 */

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ShareWithClassModal from '@/components/solo/ShareWithClassModal';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { uploadPhoto } from '@/lib/photoService';
import { createJuniPost, getUserDisplayName } from '@/lib/postService';
import { useAuthStore } from '@/store/authStore';
import { useClassStore } from '@/store/classStore';
import { useSoloStore } from '@/store/soloStore';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  // Camera reference for accessing camera methods
  const cameraRef = useRef<CameraView>(null);
  
  // State for captured photo URI
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  
  // State for capturing process
  const [isCapturing, setIsCapturing] = useState(false);
  
  // State for upload process
  const [isUploading, setIsUploading] = useState(false);
  
  // State for upload success
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // State for share modal
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  
  // Camera permissions hook
  const [permission, requestPermission] = useCameraPermissions();
  
  // Auth store for logout functionality
  const { user, signOut } = useAuthStore();
  const { currentClass, clearClassData, setPendingScrollToPostId } = useClassStore();
  const { setPrepopulatedImageUri } = useSoloStore();
  
  // Themed colors
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  console.log('🎥 Camera Screen - Rendering with permission:', permission?.granted);
  console.log('📷 Camera Screen - Captured photo:', capturedPhoto ? 'Photo captured' : 'No photo');
  console.log('⏫ Camera Screen - Upload state:', { isUploading, uploadSuccess });

  /**
   * Handle logout for easy user testing
   */
  const handleLogout = async () => {
    console.log('👋 Camera Screen - User logout requested');
    
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            console.log('🚪 Camera Screen - Logging out user');
            try {
              // Clear class data first
              clearClassData();
              
              // Sign out user
              await signOut();
              
              console.log('✅ Camera Screen - Logout successful, redirecting to login');
              router.replace('/(auth)/login');
            } catch (error) {
              console.error('❌ Camera Screen - Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  /**
   * Handle camera permission request
   */
  const handlePermissionRequest = async () => {
    console.log('🔐 Camera Screen - Requesting camera permission');
    try {
      const result = await requestPermission();
      console.log('✅ Camera Screen - Permission result:', result.granted);
      
      if (!result.granted) {
        Alert.alert(
          'Camera Permission Required',
          'This app needs camera access to take photos. Please enable camera permissions in your device settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('❌ Camera Screen - Permission error:', error);
      Alert.alert('Error', 'Failed to request camera permission');
    }
  };

  /**
   * Capture photo using camera
   */
  const capturePhoto = async () => {
    console.log('📸 Camera Screen - Starting photo capture');
    
    if (!cameraRef.current) {
      console.error('❌ Camera Screen - Camera ref not available');
      Alert.alert('Error', 'Camera not ready');
      return;
    }

    try {
      setIsCapturing(true);
      
      // Take picture with optimized quality settings
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.6, // Balanced quality and file size
        base64: false, // Don't include base64 to save memory
        skipProcessing: false, // Allow processing for better quality
      });
      
      console.log('✅ Camera Screen - Photo captured:', photo.uri);
      setCapturedPhoto(photo.uri);
      setUploadSuccess(false); // Reset upload success state
      
    } catch (error) {
      console.error('❌ Camera Screen - Capture error:', error);
      Alert.alert('Error', 'Failed to capture photo');
    } finally {
      setIsCapturing(false);
    }
  };

  /**
   * Upload photo to Supabase and navigate to Juni tab
   */
  const handleUploadPhoto = async () => {
    if (!capturedPhoto) {
      console.error('❌ Camera Screen - No photo to upload');
      Alert.alert('Error', 'No photo to upload');
      return;
    }

    console.log('⏫ Camera Screen - Starting photo upload');
    setIsUploading(true);

    try {
      const result = await uploadPhoto(capturedPhoto);
      
      if (result.success) {
        console.log('✅ Camera Screen - Photo uploaded successfully!');
        console.log('🌐 Public URL:', result.publicUrl);
        
        setUploadSuccess(true);
        
        // Set the captured photo in Solo store for prepopulation
        console.log('🧠 Camera Screen - Setting prepopulated image in Solo store');
        setPrepopulatedImageUri(capturedPhoto);
        
        // Navigate to Juni tab after short delay to show success state
        setTimeout(() => {
          console.log('🚀 Camera Screen - Navigating to Juni tab');
          router.push('/(tabs)/solo');
          
          // Reset camera state after navigation
          setCapturedPhoto(null);
          setUploadSuccess(false);
        }, 1000); // 1 second delay to show success state
        
      } else {
        console.error('❌ Camera Screen - Upload failed:', result.error);
        Alert.alert(
          'Upload Failed',
          result.error || 'Failed to upload photo. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('❌ Camera Screen - Upload error:', error);
      Alert.alert(
        'Upload Error',
        'An unexpected error occurred while uploading. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Reset to camera view from preview
   */
  const resetCamera = () => {
    console.log('🔄 Camera Screen - Resetting camera view');
    setCapturedPhoto(null);
    setUploadSuccess(false);
  };

  /**
   * Handle share button press - opens the share with class modal
   */
  const handleSharePress = () => {
    console.log('🎨 Camera Screen - Share button pressed');
    
    if (!capturedPhoto) {
      console.log('⚠️ Camera Screen - No photo to share');
      return;
    }
    
    // Open the share modal
    setIsShareModalVisible(true);
  };

  /**
   * Handle sharing the image to class feed
   */
  const handleShareToClass = async (caption: string) => {
    console.log('🚀 Camera Screen - Sharing to class with caption:', caption);
    
    if (!user?.id || !capturedPhoto) {
      console.error('❌ Camera Screen - Missing user or photo data');
      return;
    }

    // Check if user has a class
    if (!currentClass) {
      console.log('⚠️ Camera Screen - User not enrolled in any class');
      Alert.alert(
        'No Class Selected',
        'Please join a class before sharing your artwork.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      // First upload the photo
      console.log('⏫ Camera Screen - Uploading photo before sharing');
      const uploadResult = await uploadPhoto(capturedPhoto);
      
      if (!uploadResult.success || !uploadResult.publicUrl) {
        console.error('❌ Camera Screen - Photo upload failed');
        Alert.alert('Upload Failed', 'Failed to upload photo. Please try again.');
        return;
      }

      // Get user's display name
      const userName = await getUserDisplayName(user.id);
      
      // Create the post with the uploaded image URL
      const result = await createJuniPost({
        userId: user.id,
        imageUrl: uploadResult.publicUrl,
        caption: caption,
        userName: userName || undefined,
        maxViewers: 5,
        durationHours: 5,
      });

      if (result.success && result.postId) {
        console.log('✅ Camera Screen - Successfully shared to class feed');
        
        // Close modal
        setIsShareModalVisible(false);
        
        // Set the post ID to scroll to in the class store
        setPendingScrollToPostId(result.postId);
        
        // Navigate to class feed
        console.log('📍 Camera Screen - Navigating to class feed, post ID:', result.postId);
        router.push('/(tabs)');
        
        // Reset camera state after navigation
        setCapturedPhoto(null);
        setUploadSuccess(false);
        
      } else {
        console.error('❌ Camera Screen - Failed to share:', result.error);
        Alert.alert(
          'Share Failed',
          result.error || 'Failed to share your artwork. Please try again.',
          [{ text: 'OK' }]
        );
      }
      
    } catch (error) {
      console.error('❌ Camera Screen - Unexpected error sharing:', error);
      Alert.alert(
        'Share Failed',
        'An unexpected error occurred. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // Handle permission not granted
  if (!permission) {
    console.log('⏳ Camera Screen - Permission loading');
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.loadingText}>Loading camera...</ThemedText>
      </ThemedView>
    );
  }

  if (!permission.granted) {
    console.log('🚫 Camera Screen - Permission not granted');
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.permissionContainer}>
          <ThemedText style={styles.permissionTitle}>Camera Access Required</ThemedText>
          <ThemedText style={styles.permissionText}>
            SnapClone needs access to your camera to take photos
          </ThemedText>
          <TouchableOpacity
            style={[styles.permissionButton, { backgroundColor: tintColor }]}
            onPress={handlePermissionRequest}
          >
            <Text style={[styles.permissionButtonText, { color: 'white' }]}>
              Grant Camera Permission
            </Text>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Logout Button - positioned in top-right corner */}
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {capturedPhoto ? (
        // Photo preview mode
        <>
          {/* Small X button in top-left corner to reset camera */}
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}
            onPress={resetCamera}
            activeOpacity={0.8}
          >
            <IconSymbol 
              name="xmark" 
              size={20} 
              color="white" 
              weight="medium"
            />
          </TouchableOpacity>

          <Image 
            source={{ uri: capturedPhoto }} 
            style={styles.previewImage}
            resizeMode="cover"
          />
          <View style={styles.previewOverlay}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.secondaryButton, { borderColor: tintColor }]}
                onPress={handleSharePress}
                disabled={isUploading}
              >
                <Text style={[styles.secondaryButtonText, { color: tintColor }]}>
                  Share
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  { backgroundColor: uploadSuccess ? '#4CAF50' : tintColor },
                  isUploading && styles.buttonDisabled
                ]}
                onPress={handleUploadPhoto}
                disabled={isUploading || uploadSuccess}
              >
                <View style={styles.buttonContent}>
                  <IconSymbol 
                    name="brain" 
                    size={16} 
                    color="white" 
                    weight="semibold"
                  />
                  <Text style={styles.primaryButtonText}>
                    {isUploading 
                      ? 'Sending...' 
                      : uploadSuccess 
                        ? 'Sent! ✅' 
                        : 'Send to Juni'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        // Camera mode
        <>
          <CameraView 
            ref={cameraRef} 
            style={styles.camera} 
            facing="back"
          />
          <View style={styles.cameraOverlay}>
            <TouchableOpacity
              style={[
                styles.captureButton,
                { borderColor: tintColor },
                isCapturing && styles.captureButtonDisabled
              ]}
              onPress={capturePhoto}
              disabled={isCapturing}
            >
              <View style={[
                styles.captureButtonInner,
                { backgroundColor: isCapturing ? '#ccc' : 'white' }
              ]} />
            </TouchableOpacity>
            
            {!isCapturing && (
              <Text style={styles.captureHintText}>
                capture your art
              </Text>
            )}
          </View>
        </>
      )}
      
      {/* Share with Class Modal */}
      <ShareWithClassModal
        visible={isShareModalVisible}
        imageUrl={capturedPhoto}
        onClose={() => setIsShareModalVisible(false)}
        onShare={handleShareToClass}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Logout button
  logoutButton: {
    position: 'absolute',
    top: 60, // Below status bar
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1000, // Ensure it's above other elements
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Close button (X) in top-left
  closeButton: {
    position: 'absolute',
    top: 60, // Below status bar
    left: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it's above other elements
  },
  
  // Loading state
  loadingText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
  },
  
  // Permission request
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  permissionButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Camera view
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 100, // Raised above tab bar (88px + 12px margin)
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 8, // Raise button slightly to make room for text
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  captureHintText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  
  // Preview mode
  previewImage: {
    flex: 1,
    width: '100%',
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 100, // Raised above tab bar (88px + 12px margin)
    left: 0,
    right: 0,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  primaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    minWidth: 120,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
}); 