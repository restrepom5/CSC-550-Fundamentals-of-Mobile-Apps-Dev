import { router } from "expo-router";
import { View, Text, Button } from "react-native";

export default function ModalScreen() {
  return (
    <View style={{ flex: 1, gap: 12, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Filters</Text>
      <Text style={{ color: "#666" }}>Quick search presets</Text>

      <Button title="Beach" onPress={() => router.replace("/(tabs)/explore?q=beach")} />
      <Button title="Mountains" onPress={() => router.replace("/(tabs)/explore?q=mountains")} />
      <Button title="Japan" onPress={() => router.replace("/(tabs)/explore?q=japan")} />

      <Button title="Close" onPress={() => router.back()} />
    </View>
  );
}
