// app/modal.tsx
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import destinations from "../data/destinations";

export default function DestinationModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const dest = destinations.find((d) => d.id === id);

  if (!dest) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Destination not found</Text>
        <Pressable style={styles.btn} onPress={() => router.back()}>
          <Text style={styles.btnText}>Close</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.close} onPress={() => router.back()}>
        <Text style={styles.closeText}>✕</Text>
      </Pressable>

      <Image
        source={dest.image!}
        style={styles.image}
        contentFit="cover"
      />
      <Text style={styles.title}>{dest.name}</Text>
      <Text style={styles.country}>{dest.country}</Text>
      <Text style={styles.desc}>{dest.description}</Text>

      <Pressable
        style={[styles.btn, { marginTop: 16 }]}
        onPress={() => router.push({ pathname: "/destination/[id]", params: { id: dest.id } })}
      >
        <Text style={styles.btnText}>View full page</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 16 },
  close: { position: "absolute", right: 12, top: 12, zIndex: 10, padding: 8 },
  closeText: { fontSize: 18 },
  image: { width: "100%", aspectRatio: 16 / 9, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "800" },
  country: { fontSize: 14, opacity: 0.7, marginBottom: 8 },
  desc: { fontSize: 16, lineHeight: 22 },
  btn: { backgroundColor: "#1e90ff", padding: 12, borderRadius: 12, alignItems: "center" },
  btnText: { color: "white", fontWeight: "700" },
});
