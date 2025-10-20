import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Modal() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>About Travel Explorer</Text>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}>
        Travel Explorer allows users to browse popular destinations and view details using modern React Native navigation patterns.
      </Text>
      <Button title="Close" onPress={() => router.back()} />
    </View>
  );
}
