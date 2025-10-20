import { View, Text } from 'react-native';

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>User Profile</Text>
      <Text>Name: Romi Patel</Text>
      <Text>Email: romi.patel@example.com</Text>
    </View>
  );
}
