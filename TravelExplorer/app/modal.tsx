import { router } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function AboutModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>About</Text>
      <Text style={styles.p}>
        This is a demo modal shown using the Stack's <Text style={{ fontWeight: "700" }}>presentation: "modal"</Text> option.
        It accompanies the Tabs, Stack push, and dynamic `/destination/[id]` route.
      </Text>
      <Pressable onPress={() => router.back()} style={styles.close}>
        <Text style={styles.closeText}>Close</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  h1: { fontSize: 28, fontWeight: "800", marginBottom: 8 },
  p: { fontSize: 16, color: "#333" },
  close: {
    marginTop: 20,
    backgroundColor: "#000407ff",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center"
  },
  closeText: { color: "white", fontWeight: "700" }
});
