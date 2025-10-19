import { Link, useLocalSearchParams } from "expo-router";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";

// ✅ Correct local imports (relative paths and forward slashes)
import NY from "../../assets/images/download.jpg";
import Tokyo from "../../assets/images/gettyimages-1390815938.avif";
import Paris from "../../assets/images/istockphoto-1145422105-612x612.jpg";

export default function DestinationDetails() {
  const { id } = useLocalSearchParams();
  const destinationId = String(id);

  // ✅ Type should be `any` for local images
  const destinations: Record<
    string,
    { name: string; description: string; image: any }
  > = {
    "1": {
      name: "Paris, France",
      description:
        "✨ Paris — City of Lights and romance! Visit the Eiffel Tower, Louvre Museum, and charming cafes by the Seine.",
      image: Paris,
    },
    "2": {
      name: "Tokyo, Japan",
      description:
        "🌸 Tokyo — Modern capital blending traditions with modern tech and vibrant culture.",
      image: Tokyo,
    },
    "3": {
      name: "New York, USA",
      description:
        "🗽 New York — The city that never sleeps, full of culture, lights, and dreams.",
      image: NY,
    },
  };

  const info = destinations[destinationId];

  if (!info) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>❌ Unknown Destination</Text>
        <Link href="/tabs/explore" asChild>
          <Button title="Back to Explore" />
        </Link>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{info.name}</Text>
      <Text style={styles.idText}>Destination ID: {destinationId}</Text>
      {/* ✅ Use `source={info.image}` for local files */}
      <Image source={info.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.description}>{info.description}</Text>

      <Link href="/details/pushed" asChild>
        <Button title="See More Details" />
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  idText: { fontSize: 16, color: "#666", marginBottom: 10 },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: "#ddd",
  },
  description: { fontSize: 16, textAlign: "center", marginBottom: 20, lineHeight: 22 },
});
