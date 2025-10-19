import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Travel Explorer</Text>
      <Text style={styles.p}>
        Browse hand‑picked destinations and tap any card to see details. This demo shows Tabs, a Stack push, a Modal, and a Dynamic Route.
      </Text>
      <View style={{ height: 16 }} />
      <Link href="/(tabs)/explore" asChild>
        <Pressable style={styles.cta}>
          <Text style={styles.ctaText}>Start Exploring</Text>
        </Pressable>
      </Link>
      <View style={{ height: 8 }} />
      <Link href="/modal" asChild>
        <Pressable style={[styles.cta, styles.secondary]}>
          <Text style={[styles.ctaText, { color: "#007AFF" }]}>Open About Modal</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  h1: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8
  },
  p: {
    fontSize: 16,
    color: "#444"
  },
  cta: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center"
  },
  secondary: {
    backgroundColor: "#E6F0FF"
  },
  ctaText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16
  }
});
