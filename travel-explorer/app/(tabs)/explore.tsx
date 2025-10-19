import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function ExploreScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Explore Screen</Text>
      <Link href="/destination/1">Go to Destination 1</Link>
    </View>
  );
}
