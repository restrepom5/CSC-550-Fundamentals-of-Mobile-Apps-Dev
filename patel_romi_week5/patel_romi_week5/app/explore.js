import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

const destinations = [
  {
    id: "1",
    city: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    description: "The city of lights, love, and timeless culture.",
  },
  {
    id: "2",
    city: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1549921296-3f9b7cbe9b9b",
    description: "A fast-paced world of skyscrapers and urban adventure.",
  },
  {
    id: "3",
    city: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
    description: "Where modern life meets ancient tradition.",
  },
];

export default function Explore() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Destinations</Text>
      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/destination/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.city}>{item.city}</Text>
                <Text style={styles.country}>{item.country}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 10,
  },
  city: {
    fontSize: 18,
    fontWeight: "bold",
  },
  country: {
    color: "#777",
    marginTop: 4,
  },
});
