import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function BookModal() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Book a new trip</Text>
      <Button title="Close" onPress={() => router.back()} />
    </View>
  );
}
