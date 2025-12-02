import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";

const destinations = [
  {
    id: 1,
    name: "Fullmetal Alchemist: Brotherhood",
    image: require("../../assets/images/fmab2.webp"),
    description: "Fullmetal Alchemist: Brotherhood,the Philosopher’s Stone embodies forbidden power, created through countless human sacrifices.",
  },
  {
    id: 2,
    name: "Princess Mononoke",
    image: require("../../assets/images/mono2.jpg"),
    description: "Princess Mononoke tells the story of Ashitaka, a young warrior who becomes caught between the forces of human industry and the gods of the forest. At its heart, the film explores the tension between progress and nature, showing that neither side is purely good or evil but both must find balance to coexist.",
  },
  {
    id: 3,
    name: "The Boy, the Mole, the Fox and the Horse",
    image: require("../../assets/images/theboy.jpg"),
    description: "It follows a boy who meets a mole, a fox, and a horse, each offering gentle wisdom about love, courage, and the importance of connection. The book emphasizes themes of compassion and resilience, reminding readers that even in uncertainty, kindness and togetherness can light the way forward.",

  },
  {
    id: 4,
    name: "A Silent Voice",
    image: require("../../assets/images/silent-voice.webp"),
    description: "The film explores themes of bullying, disability, forgiveness, and the struggle for self-acceptance, showing how empathy and communication can heal deep wounds. Its emotional depth and nuanced characters have made it one of the most powerful modern anime dramas.",
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
