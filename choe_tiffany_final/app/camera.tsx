import { useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useApp } from '@/src/context/provider';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  const router = useRouter();
  const { updateUser } = useApp();

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Button title="Allow Camera Access" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        onCameraReady={() => console.log('Camera ready')}
      />
      <Button
        title="Take Photo"
        onPress={async () => {
          if (cameraRef.current) {
            await cameraRef.current?.takePictureAsync();
            updateUser({
              profileImage: 'profile',
            });
            router.push('/(tabs)/profile');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { flex: 1 },
  preview: { width: 200, height: 200, marginTop: 10 },
});
