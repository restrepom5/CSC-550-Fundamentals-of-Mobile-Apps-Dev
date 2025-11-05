import { View, Text } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 8 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Week 8 — State Management</Text>
      <Text>Go to the Mood tab to add today’s mood.</Text>
    </View>
  );
}
