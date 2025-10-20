import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";

const C = { bg: "#F5F0E6", card: "#FFFFFF", ink: "#2A2926", muted: "#6F6B63", brand: "#7C6A46" };

export default function ModalScreen() {
  const router = useRouter();
  const close = () => (router.canGoBack?.() ? router.back() : router.replace("/tabs/profile"));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.h1}>Travel Info</Text>
          <Text style={styles.sub}>
            Check advisories, entry rules, and health updates before your trip.
          </Text>

          <View style={styles.row}>
            <View style={styles.bullet}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>Country entry requirements</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>Health & vaccination updates</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>Insurance & emergency contacts</Text>
            </View>
          </View>

          <Pressable onPress={close} style={styles.primary}>
            <Text style={styles.primaryText}>Back to Profile</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  card: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
  h1: { fontSize: 22, fontWeight: "800", color: C.ink, textAlign: "center" },
  sub: { fontSize: 14, color: C.muted, textAlign: "center", marginTop: 6, marginBottom: 14 },
  row: { gap: 10 },
  bullet: { flexDirection: "row", alignItems: "flex-start" },
  bulletDot: { color: C.ink, marginRight: 6, lineHeight: 20 },
  bulletText: { color: C.ink, lineHeight: 20 },
  primary: { marginTop: 14, backgroundColor: C.brand, paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  primaryText: { color: "#fff", fontWeight: "800" },
});
