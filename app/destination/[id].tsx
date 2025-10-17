// app/destination/[id].tsx
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import destinations from "../../data/destinations";
import { useTheme } from "../../theme/ThemeProvider";

export default function DestinationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();

  const dest = destinations.find((d) => d.id === id);

  if (!dest) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: colors.bg }]}>
        <Text style={{ color: colors.text }}>Destination not found.</Text>
      </SafeAreaView>
    );
  }

  const source =
    typeof dest.image === "string" ? { uri: dest.image } : dest.image;

  const openTripAdvisor = async () => {
    if (!("tripUrl" in dest) || !dest.tripUrl) return;
    try {
      const ok = await Linking.canOpenURL(dest.tripUrl as string);
      if (ok) await Linking.openURL(dest.tripUrl as string);
    } catch {}
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen
        options={{
          title: dest.name,
          presentation: "modal",
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} hitSlop={12}>
              <Text style={{ color: colors.tint, fontWeight: "700" }}>
                Close
              </Text>
            </Pressable>
          ),
        }}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Image source={source} style={styles.image} contentFit="cover" />
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>{dest.name}</Text>
          <Text style={[styles.country, { color: colors.muted }]}>
            {dest.country}
          </Text>

          <View style={{ height: 8 }} />
          <Text style={[styles.desc, { color: colors.text }]}>
            {dest.description}
          </Text>

          {"tripUrl" in dest && !!dest.tripUrl && (
            <Pressable
              onPress={openTripAdvisor}
              style={[styles.cta, { backgroundColor: colors.tint }]}
              accessibilityRole="button"
              accessibilityLabel={`Open TripAdvisor for ${dest.name}`}
            >
              <Text style={styles.ctaText}>
                Explore things to do 🧭
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={() => router.back()}
            style={[styles.secondary, { backgroundColor: colors.card }]}
          >
            <Text style={{ color: colors.text, fontWeight: "700" }}>
              Go Back
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: "100%", aspectRatio: 16 / 9 },
  content: { padding: 16, gap: 12 },
  title: { fontSize: 28, fontWeight: "800" },
  country: { fontSize: 14 },
  desc: { fontSize: 16, lineHeight: 22 },
  cta: { marginTop: 12, paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  ctaText: { color: "white", fontWeight: "800", fontSize: 16 },
  secondary: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
});
