import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Welcome to Travel Explorer!</Text>
      <Link href="/explore" asChild>
        <Button title="Start Exploring" />
      </Link>
      <Link href="/modal" asChild>
        <Button title="Open About Modal" />
      </Link>
    </View>
  );
}
