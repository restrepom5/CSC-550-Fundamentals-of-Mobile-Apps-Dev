import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from "expo-image";

import NY from "../../assets/images/download.jpg";
import Tokyo from "../../assets/images/tokyo.jpg";
import Paris from "../../assets/images/paris.jpg";
import Cusco from "../../assets/images/peru.jpg";
import HaLongBay from "../../assets/images/halongbay.jpg";

type Destination = {
  name: string;
  description: string;
  image: number | string;
  highlights?: string[];
  bestTime?: string;
};

const C = {
  bg: "#F5F5DC",
  card: "#EAD7B7",
  ink: "#1f2937",
  muted: "#4b5563",
  brand: "#7C6A46",
  outline: "#CDBDA0",
};

const DESTINATIONS: Record<string, Destination> = {
  "1": {
    name: "Vietnam",
    description:
      "Lantern-lit towns, karst bays, and sizzling street food—from Hanoi to Ho Chi Minh City.",
    image: HaLongBay,
    highlights: ["Hanoi Old Quarter", "Ha Long Bay cruise", "Hoi An Ancient Town"],
    bestTime: "Nov–Apr (drier months)",
  },
  "2": {
    name: "Paris, France",
    description:
      "City of Lights and romance — Eiffel Tower, Louvre, cozy cafés along the Seine.",
    image: Paris,
    highlights: ["Eiffel Tower at sunset", "Louvre Museum", "Seine river cruise"],
    bestTime: "Apr–Jun · Sep–Oct",
  },
  "3": {
    name: "Tokyo, Japan",
    description:
      "A vibrant blend of tradition and technology, food culture, and neon nights.",
    image: Tokyo,
    highlights: ["Shinjuku nightlife", "Asakusa Sensō-ji", "Tsukiji outer market"],
    bestTime: "Mar–May · Oct–Nov",
  },
  "4": {
    name: "New York, USA",
    description:
      "The city that never sleeps — Broadway, museums, and iconic skyline views.",
    image: NY,
    highlights: ["Top of the Rock", "The Met Museum", "Brooklyn Bridge walk"],
    bestTime: "Apr–Jun · Sep–Nov",
  },
  "5": {
    name: "Cusco, Peru",
    description:
      "🏔️ Ancient Inca capital at 3,400 m — cobblestone streets, vibrant markets, and a gateway to the Sacred Valley & Machu Picchu.",
    image: Cusco,
    highlights: ["Plaza de Armas", "Sacsayhuamán", "San Pedro Market"],
    bestTime: "May–Sep (dry season)",
  },
};

export default function DestinationDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string | undefined);
  const info = id ? DESTINATIONS[id] : undefined;

  if (!info) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
        <View style={[styles.container, styles.center]}>
          <Text style={styles.title}>Unknown Destination</Text>
          <Text style={styles.helper}>Please select a destination from Explore.</Text>
          <View style={{ height: 12 }} />
          <Pressable
            style={[styles.btn, styles.btnOutline]}
            onPress={() => router.replace("/tabs/explore")}
          >
            <Text style={styles.btnTextOutline}>Back to Explore</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text accessibilityRole="header" style={styles.title}>
          {info.name}
        </Text>

        <Image
          source={info.image}
          style={styles.image}
          contentFit="cover"
          transition={150}
          accessibilityLabel={`Photo of ${info.name}`}
          accessibilityIgnoresInvertColors
        />

        <Text style={styles.description}>{info.description}</Text>

        {(info.bestTime || (info.highlights && info.highlights.length)) ? (
          <View style={styles.card}>
            {info.bestTime ? (
              <View style={styles.row}>
                <Text style={styles.cardLabel}>Best time to visit</Text>
                <Text style={styles.cardValue}>{info.bestTime}</Text>
              </View>
            ) : null}

            {info.highlights?.length ? (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.cardLabel}>Highlights</Text>
                <View style={styles.chipsRow}>
                  {info.highlights.map((h) => (
                    <Text key={h} style={styles.chip}>
                      {h}
                    </Text>
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        ) : null}

        <View style={styles.actions}>
          <Pressable
            style={[styles.btn, styles.btnFilled]}
            onPress={() =>
              router.push({
                pathname: "/details/pushed",
                params: { id: id ?? "", name: info.name },
              })
            }
          >
            <Text style={styles.btnTextFilled}>See Extra Info</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.btnOutline]}
            onPress={() =>
              router.push({
                pathname: "/details/modal",
                params: { name: info.name },
              })
            }
          >
            <Text style={styles.btnTextOutline}>Open Travel Info</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.btnOutline]}
            onPress={() => router.replace("/tabs/explore")}
          >
            <Text style={styles.btnTextOutline}>Back to Explore</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: C.bg },
  center: { alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "800", color: C.ink, textAlign: "center", marginBottom: 8 },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    backgroundColor: "#e5e7eb",
    marginBottom: 14,
    overflow: "hidden",
  },
  description: {
    fontSize: 16,
    color: C.ink,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 14,
  },
  card: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  cardLabel: { fontSize: 14, fontWeight: "700", color: C.ink, marginBottom: 4 },
  cardValue: { fontSize: 14, color: C.muted },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 6 },
  chip: {
    backgroundColor: "#E8DFD1",
    color: C.ink,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "700",
  },
  actions: {
    marginTop: 6,
    marginBottom: 24,
    alignSelf: "center",
    width: "100%",
    maxWidth: 360,
    gap: 10,
  },
  helper: { fontSize: 14, color: C.muted, textAlign: "center" },

  btn: {
    width: "100%",
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  btnFilled: {
    backgroundColor: C.brand,
    borderWidth: 1,
    borderColor: "#5A4521",
  },
  btnOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: C.outline,
  },
  btnTextFilled: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  btnTextOutline: {
    color: C.ink,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
