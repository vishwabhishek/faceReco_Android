import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCaptured, setIsCaptured] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleCapture = async () => {
    if (!cameraRef.current) return;
  
    try {
      const capturedPhoto = await cameraRef.current.takePictureAsync();
      if (capturedPhoto && capturedPhoto.uri) {  // Add this check
        setPhoto(capturedPhoto.uri);
        setIsCaptured(true);
      }
    } catch (error) {
      console.error('Failed to take picture:', error);
    }
  };

  const handleRetake = () => {
    setPhoto(null);
    setIsCaptured(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {isCaptured && photo ? (
          <Image source={{ uri: photo }} style={styles.camera} />
        ) : (
          <CameraView style={styles.camera} facing="front" ref={cameraRef} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={isCaptured ? handleRetake : handleCapture}>
          <MaterialIcons name={isCaptured ? "replay" : "camera"} size={32} color="white" />
          <Text style={styles.buttonText}>{isCaptured ? "Retake" : "Capture"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
  },
  cameraContainer: {
    width: 350,
    height: 400,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 5,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});
