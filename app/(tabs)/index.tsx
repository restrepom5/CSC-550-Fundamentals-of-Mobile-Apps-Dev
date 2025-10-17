// app/(tabs)/index.tsx
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import NativeAppearance from "../../specs/NativeAppearance";
import { useTheme } from "../../theme/ThemeProvider";

export default function Home() {
  const { colors, setMode, colorScheme, mode } = useTheme();

  const apply = (m: "light" | "dark" | "system") => {
    setMode(m);
    try {
      NativeAppearance?.setStyle?.(m === "system" ? "unspecified" : m);
    } catch {}
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Hero image */}
      <View style={styles.heroWrap}>
        <Image
          source={{
            uri:
              // Magical mountain scene (direct Unsplash photo URL)
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
          }}
          style={styles.hero}
          contentFit="cover"
          cachePolicy="disk"
        />
        <View style={styles.overlay} />
        <View style={styles.heroTextWrap}>
          <Text style={[styles.title, { color: "white" }]}>Travel Explorer</Text>
          <Text style={[styles.subtitle, { color: "white" }]}>
            Find your next magical escape ✨
          </Text>
        </View>
      </View>

      {/* Theme buttons */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Theme: {mode} ({colorScheme})
        </Text>
        <View style={styles.row}>
          <Pressable
            style={[styles.btn, { backgroundColor: colors.card }]}
            onPress={() => apply("light")}
          >
            <Text style={[styles.btnText, { color: colors.text }]}>Light</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, { backgroundColor: colors.card }]}
            onPress={() => apply("dark")}
          >
            <Text style={[styles.btnText, { color: colors.text }]}>Dark</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, { backgroundColor: colors.card }]}
            onPress={() => apply("system")}
          >
            <Text style={[styles.btnText, { color: colors.text }]}>System</Text>
          </Pressable>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <Link href="/explore" asChild>
          <Pressable style={[styles.cta, { backgroundColor: colors.tint }]}>
            <Text style={styles.ctaText}>Start Exploring</Text>
          </Pressable>
        </Link>

        <View style={{ height: 10 }} />

        <Link href="/modal" asChild>
          <Pressable style={[styles.cta, { backgroundColor: colors.card }]}>
            <Text style={[styles.ctaText, { color: colors.text }]}>What is this app?</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroWrap: { width: "100%", aspectRatio: 16 / 9, position: "relative" },
  hero: { width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  heroTextWrap: {
    position: "absolute",
    left: 20,
    bottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.3,
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowRadius: 8,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    opacity: 0.9,
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowRadius: 8,
  },
  section: { paddingHorizontal: 20, paddingTop: 18 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
  },
  row: { flexDirection: "row", gap: 12 },
  btn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12 },
  btnText: { fontSize: 16, fontWeight: "700" },
  cta: { paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  ctaText: { color: "white", fontSize: 16, fontWeight: "800" },
});
