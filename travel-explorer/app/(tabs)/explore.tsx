import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";

const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: require("../../assets/images/greece.jpg"),
    description: "Famous for its whitewashed houses, blue domes, and stunning sunsets over the Aegean Sea.",
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: require("../../assets/images/kyoto.jpg"),
    description: "Ancient temples, peaceful gardens, and traditional tea houses await you in Kyoto.",
  },
  {
    id: 3,
    name: "Machu Picchu, Peru",
    image: require("../../assets/images/machu.webp"),
    description: "Explore the breathtaking ruins of the Incan empire high in the Andes mountains.",
  },
  {
    id: 4,
    name: "Venice, Italy",
    image: require("../../assets/images/venice.jpg"),
    description: "Romantic canals, gondola rides, and charming bridges make Venice unforgettable.",
  },
];

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Explore Destinations</Text>
      {destinations.map((dest) => (
        <View key={dest.id} style={styles.card}>
          <Image source={dest.image} style={styles.image} />
          <Link href={{ pathname: `/destination/${dest.id}`, params: { name: dest.name, desc: dest.description } }} asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>{dest.name}</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 10,
  },
  linkText: {
    marginTop: 10,
    fontSize: 18,
    color: "#007bff",
    fontWeight: "bold",
  },
});
