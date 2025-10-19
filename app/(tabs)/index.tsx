// app/(tabs)/index.tsx
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export default function Home() {
  const { colors, setMode, mode, colorScheme } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Hero */}
      <View style={styles.heroWrap}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
          }}
          style={styles.hero}
          contentFit="cover"
          cachePolicy="disk"
        />
        <View style={styles.overlay} />
        <View style={styles.heroTextWrap}>
          <Text style={styles.title}>Travel Explorer</Text>
          <Text style={styles.subtitle}>Find your next magical escape ✨</Text>
        </View>
      </View>

      {/* Theme toggle no label */}
      <View style={[styles.section, { paddingTop: 14 }]}>
        <View style={styles.row}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Switch to light mode"
            style={[styles.pill, { backgroundColor: colors.card, borderColor: "rgba(0,0,0,0.06)" }]}
            onPress={() => setMode("light")}
          >
            <Text style={[styles.pillText, { color: colors.text }]}>Light</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Switch to dark mode"
            style={[styles.pill, { backgroundColor: colors.card, borderColor: "rgba(0,0,0,0.06)" }]}
            onPress={() => setMode("dark")}
          >
            <Text style={[styles.pillText, { color: colors.text }]}>Dark</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Use system theme"
            style={[styles.pill, { backgroundColor: colors.card, borderColor: "rgba(0,0,0,0.06)" }]}
            onPress={() => setMode("system")}
          >
            <Text style={[styles.pillText, { color: colors.text }]}>System</Text>
          </Pressable>
        </View>
      </View>

      {/* Explore */}
      <View style={styles.section}>
        <Text style={[styles.h2, { color: colors.text }]}>Explore Destinations</Text>
        <Text style={[styles.body, { color: colors.text }]}>
          Tap <Text style={{ fontWeight: "700" }}>Explore</Text> below 👇 to learn more about our favorite spots to find a
          magical escape. Each destination includes a link to a TripAdvisor page with top things to do.
        </Text>

        {/* Suggest modal button */}
        <Link href="/suggest" asChild>
          <Pressable
            style={styles.ctaPrimary}
            accessibilityRole="button"
            accessibilityLabel="Suggest a destination"
          >
            <Text style={styles.ctaPrimaryText}>Suggest a Destination</Text>
          </Pressable>
        </Link>

        {/* Go to Explore button */}
        <Link href="/(tabs)/explore" asChild>
          <Pressable
            style={styles.ctaSecondary}
            accessibilityRole="button"
            accessibilityLabel="Go to Explore"
          >
            <Text style={styles.ctaSecondaryText}>Go to Explore</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const ACCENT = "#7C3AED";  
const ACCENT2 = "#10B981";  

const styles = StyleSheet.create({
  heroWrap: { width: "100%", aspectRatio: 16 / 9, position: "relative" },
  hero: { width: "100%", height: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.28)" },
  heroTextWrap: { position: "absolute", left: 20, bottom: 18, right: 20 },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 0.3,
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowRadius: 8,
  },
  subtitle: {
    color: "white",
    marginTop: 6,
    fontSize: 14,
    opacity: 0.95,
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowRadius: 8,
  },

  section: { paddingHorizontal: 20, paddingTop: 18 },
  h2: { fontSize: 20, fontWeight: "800", marginBottom: 8 },
  body: { fontSize: 14, lineHeight: 20, opacity: 0.95, marginBottom: 14 },

  row: { flexDirection: "row", gap: 12 },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
  },
  pillText: { fontSize: 16, fontWeight: "700" },

  ctaPrimary: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: ACCENT,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  ctaPrimaryText: { color: "white", fontSize: 16, fontWeight: "800", letterSpacing: 0.2 },

  ctaSecondary: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: ACCENT2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  ctaSecondaryText: { color: "white", fontSize: 16, fontWeight: "800", letterSpacing: 0.2 },
});