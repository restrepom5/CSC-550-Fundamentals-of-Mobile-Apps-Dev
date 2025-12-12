import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function InspirationScreen() {
  const places = [
    {
      name: "Bora Bora, French Polynesia",
      image:
        "https://digital.ihg.com/is/image/ihg/intercontinental-bora-bora-5357284500-2x1",
      description:
        "Known for its stunning turquoise lagoon and luxury overwater bungalows—Bora Bora is the ultimate tropical paradise getaway."
    },
    {
      name: "Paris, France",
      image:
        "https://img.static-af.com/transform/45cb9a13-b167-4842-8ea8-05d0cc7a4d04/",
      description:
        "The City of Light is famous for romance, art, culture, and iconic landmarks such as the Eiffel Tower and the Louvre."
    },
    {
      name: "Interlaken, Switzerland",
      image:
        "https://cdn.audleytravel.com/3663/2616/79/15986030-interlaken.jpg",
      description:
        "A stunning resort area between lakes Thun and Brienz with views of the Jungfrau—perfect for nature & adventure lovers."
    },
    {
      name: "Lake Como, Italy",
      image:
        "https://editoire.com/wp-content/uploads/2024/01/lake-como-summer-min.jpg",
      description:
        "A beautiful lake framed by mountains and charming towns—famous for serene waters, villas, and Italian elegance."
    },
    {
      name: "Rome, Italy",
      image:
        "https://www.cuddlynest.com/blog/wp-content/uploads/2022/04/rome-1-day-itinerary-scaled.jpg",
      description:
        "The Eternal City is packed with ancient history—from the Colosseum to the Roman Forum—blending culture and cuisine."
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Travel Inspiration</Text>

      {places.map((place, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: place.image }} style={styles.image} />
          <Text style={styles.title}>{place.name}</Text>
          <Text style={styles.description}>{place.description}</Text>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0fbff",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#033649",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    marginBottom: 20,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  image: {
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0b7fab",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#033649",
  },
});
