/**
 * Camera Screen Component
 * 
 * This component provides camera functionality for the SnapClone app.
 * Features:
 * - Camera permissions handling
 * - Photo capture with quality settings
 * - Image preview after capture
 * - Photo upload to Supabase Storage
 * - Themed styling that adapts to light/dark mode
 * - Error handling and loading states
 */

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { uploadPhoto } from '@/lib/photoService';
import { CameraView, useCameraPermissions } from 'expo-camera';
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
  
  // Camera permissions hook
  const [permission, requestPermission] = useCameraPermissions();
  
  // Themed colors
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  console.log('🎥 Camera Screen - Rendering with permission:', permission?.granted);
  console.log('📷 Camera Screen - Captured photo:', capturedPhoto ? 'Photo captured' : 'No photo');
  console.log('⏫ Camera Screen - Upload state:', { isUploading, uploadSuccess });

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
   * Upload photo to Supabase
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
        Alert.alert(
          'Success! 🎉',
          'Your photo has been uploaded to Supabase!',
          [
            {
              text: 'Take Another',
              onPress: resetCamera,
            },
            {
              text: 'OK',
              style: 'default',
            },
          ]
        );
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
      {capturedPhoto ? (
        // Photo preview mode
        <>
          <Image 
            source={{ uri: capturedPhoto }} 
            style={styles.previewImage}
            resizeMode="cover"
          />
          <View style={styles.previewOverlay}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.secondaryButton, { borderColor: tintColor }]}
                onPress={resetCamera}
                disabled={isUploading}
              >
                <Text style={[styles.secondaryButtonText, { color: tintColor }]}>
                  Take Another
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
                <Text style={styles.primaryButtonText}>
                  {isUploading 
                    ? 'Uploading...' 
                    : uploadSuccess 
                      ? 'Uploaded! ✅' 
                      : 'Save to Supabase'}
                </Text>
              </TouchableOpacity>
            </View>
            
            {isUploading && (
              <Text style={[styles.statusText, { color: textColor }]}>
                📤 Uploading to Supabase...
              </Text>
            )}
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
            
            {isCapturing && (
              <Text style={[styles.capturingText, { color: textColor }]}>
                Capturing...
              </Text>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  capturingText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 16,
    fontWeight: '600',
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
  statusText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
}); 