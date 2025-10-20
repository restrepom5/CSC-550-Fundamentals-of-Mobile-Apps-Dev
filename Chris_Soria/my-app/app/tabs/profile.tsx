// app/tabs/profile.tsx
import { Link } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View, Pressable, Image } from "react-native";
import Chris from "../../assets/images/Chris.jpg";
const C = { bg: "#F5F0E6", card: "#EFE5D6", ink: "#2A2926", muted: "#6F6B63", brand: "#7C6A46" };

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={Chris}
            style={styles.avatar}
          />
          <Text style={styles.name}>Christopher Soria</Text>
          <Text style={styles.meta}>Traveler · Explorer</Text>

          <Link href="/details/modal" asChild>
            <Pressable style={styles.primary}><Text style={styles.primaryText}>Open Travel Info</Text></Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  card: {
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  avatar: { width: 96, height: 96, borderRadius: 999, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "800", color: C.ink },
  meta: { fontSize: 13, color: C.muted, marginBottom: 12 },
  primary: { backgroundColor: C.brand, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12 },
  primaryText: { color: "#fff", fontWeight: "800" },
});
