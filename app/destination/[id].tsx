import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import destinations from "../../data/destinations";

export default function DestinationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dest = destinations.find((d) => d.id === id);

  if (!dest) {
    return (
      <View style={styles.center}>
        <Text>Destination not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
      <Image source={{ uri: dest.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{dest.name}</Text>
        <Text style={styles.country}>{dest.country}</Text>
        <Text style={styles.desc}>{dest.description}</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: "100%", height: 260 },
  content: { padding: 16, gap: 12 },
  title: { fontSize: 24, fontWeight: "800" },
  country: { fontSize: 16, opacity: 0.7 },
  desc: { fontSize: 16, lineHeight: 22 },
  button: { backgroundColor: "#1e90ff", padding: 12, borderRadius: 12, marginTop: 8, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "700" },
});
