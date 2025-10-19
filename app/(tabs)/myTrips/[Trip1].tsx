import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useSearchParams } from "expo-router";

const images = {
  spain: [
    require("../../assets/spain1.jpg"),
    require("../../assets/spain2.jpg"),
    require("../../assets/spain3.jpg"),
  ],
  portugal: [
    require("../../assets/portugal1.jpg"),
    require("../../assets/portugal2.jpg"),
    require("../../assets/portugal3.jpg"),
  ],
  brazil: [
    require("../../assets/brazil1.jpg"),
    require("../../assets/brazil2.jpg"),
    require("../../assets/brazil3.jpg"),
  ],
};

export default function TripGallery() {
  const { trip1 } = useSearchParams();
  const tripName = trip1 ? trip1.toLowerCase() : "";

  const tripImages = images[tripName] || [];
  const formattedTripName = tripName
    ? tripName.charAt(0).toUpperCase() + tripName.slice(1)
    : "Trip";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{formattedTripName} Gallery</Text>
      <ScrollView contentContainerStyle={styles.gallery}>
        {tripImages.map((img, idx) => (
          <Image key={idx} source={img} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  image: {
    width: "32%", // 3 images per row with some margin
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
});

