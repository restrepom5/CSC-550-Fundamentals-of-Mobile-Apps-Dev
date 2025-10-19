import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DestinationDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Destination ID: {id}</Text>
    </View>
  );
}
