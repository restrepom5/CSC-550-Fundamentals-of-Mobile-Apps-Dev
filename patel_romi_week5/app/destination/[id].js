import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

const destinationDetails = {
  "1": {
    city: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    description:
      "Experience the charm of Paris with its rich history, art, and gastronomy. From the Eiffel Tower to cozy cafés — Paris has it all.",
  },
  "2": {
    city: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1549921296-3f9b7cbe9b9b",
    description:
      "Explore the vibrant culture and energy of New York City — from Times Square to Central Park, every corner tells a story.",
  },
  "3": {
    city: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
    description:
      "Dive into the futuristic streets of Tokyo while embracing the beauty of its temples, food, and neon-lit skyline.",
  },
};

export default function DestinationDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const place = destinationDetails[id];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: place.city }} />
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.city}>{place.city}</Text>
        <Text style={styles.country}>{place.country}</Text>
        <Text style={styles.description}>{place.description}</Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 260 },
  details: { padding: 20 },
  city: { fontSize: 24, fontWeight: "bold" },
  country: { fontSize: 18, color: "#666", marginVertical: 5 },
  description: { fontSize: 16, color: "#333", marginVertical: 10, lineHeight: 22 },
  link: { color: "#007bff", marginTop: 20, fontSize: 16 },
});
