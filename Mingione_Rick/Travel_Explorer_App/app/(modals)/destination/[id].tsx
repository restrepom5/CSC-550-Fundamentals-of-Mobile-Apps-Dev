import { Link, LinkMenuAction, useLocalSearchParams, useRouter } from "expo-router";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemedText } from '@/components/themed-text';

// ✅ Correct local imports (relative paths and forward slashes)
import acadia from "../../../assets/images/parks/acadia.jpg";
import arches from "../../../assets/images/parks/arches.jpg";
import badlands from "../../../assets/images/parks/badlands.jpg";
import bigbend from "../../../assets/images/parks/bigbend.jpg";
import black_canyon from "../../../assets/images/parks/black_canyon.jpg";
import bryce_canyon from "../../../assets/images/parks/bryce_canyon.jpg";
import smokey from "../../../assets/images/parks/smokey.jpg";
import yellowstone from "../../../assets/images/parks/yellowstone.jpg";
import zion from "../../../assets/images/parks/zion.jpg";

export default function DestinationDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const destinationId = String(id);

  const openDetailsModal = () => {
    router.push(`/destination/${id}/details`);
  };

  const openPushedModal = () => {
    router.push(`/destination/${id}/pushed`);
  };

  // ✅ Type should be `any` for local images
  const destinations: Record<
    string,
    { name: string; location: string; description: string; image: any }
  > = {
    "acadia": {
      name: "Acadia National Park",
      location: "Maine",
      description:
        "Located along the rugged coast of Maine, Acadia National Park is known for its stunning coastal landscapes, granite peaks, and diverse ecosystems. Visitors can enjoy scenic drives, hiking trails, and picturesque views of the Atlantic Ocean.",
      image: acadia,
    },
    "arches": { 
      name: "Arches National Park",
      location: "Utah",
      description:
        "Arches National Park is known for its iconic rock formations, including Delicate Arch and Balanced Rock. It offers a variety of hiking trails and scenic drives through the red rock desert.",
      image: arches,
    },
    "badlands": {
      name: "Badlands National Park",
      location: "South Dakota", 
      description:
        "Badlands National Park is known for its unique rock formations, including the Needles and the Wall. It offers a variety of hiking trails and scenic drives through the prairie landscape.",
      image: badlands,
    },
    "bigbend": {
      name: "Big Bend National Park",
      location: "Texas",
      description:
        "Big Bend National Park is located in southwestern Texas along the Rio Grande. It features diverse landscapes, including desert, mountains, and river canyons. Visitors can enjoy hiking, camping, and stargazing in this remote park.",
      image: bigbend,
    },
    "black_canyon": {
      name: "Black Canyon of the Gunnison National Park",
      location: "Colorado",
      description:
        "Black Canyon of the Gunnison National Park is known for its dramatic cliffs and deep canyons carved by the Gunnison River. It offers a variety of hiking trails and scenic drives through the red rock desert.",
      image: black_canyon,
    },
    "bryce_canyon": {
      name: "Bryce Canyon National Park",
      location: "Utah",
      description:
        "Bryce Canyon National Park is known for its unique hoodoos, colorful rock formations, and stunning vistas. It offers a variety of hiking trails and scenic drives through the red rock desert.",
      image: bryce_canyon,
    },
    "smokey": {
      name: "Great Smokey Mountains National Park",
      location: "Tennessee, North Carolina",
      description:
        "Straddling North Carolina and Tennessee, the Great Smoky Mountains offer mist-covered peaks, lush forests, and a rich cultural history. It’s ideal for scenic drives, hiking, and spotting wildlife like black bears and elk, especially in the fall when the foliage is vibrant.",
      image: smokey,
    },
    "yellowstone": {
      name: "Yellowstone National Park",
      location: "Yellowstone, Wyoming",
      description:  
        "America’s first national park, Yellowstone is famous for its geothermal wonders like Old Faithful, vibrant hot springs, and abundant wildlife including bison and bears. Visitors can explore vast landscapes of mountains, forests, and canyons across Wyoming, Montana, and Idaho.",
      image: yellowstone,
    },
    "zion": {
      name: "Zion National Park",
      location: "Springdale, Utah",
      description:
        "Located in southern Utah, Zion is known for its towering red cliffs, narrow slot canyons, and scenic hikes like Angels Landing and The Narrows. Its stunning desert scenery and diverse plant and animal life make it a favorite for adventurers and nature lovers.",
      image: zion,
    },
  };

  const info = destinations[destinationId];

  if (!info) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>❌ Unknown Destination</Text>
        <Link href="/(tabs)/explore" asChild>
          <Button title="Back to Explore" />
        </Link>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{info.name}</Text>
      <Text style={styles.idText}>{info.location}</Text>
      {/* ✅ Use `source={info.image}` for local files */}
      <Image source={info.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.description}>{info.description}</Text>

      <Button onPress={openDetailsModal} title="See More Details Modal" />

      {/* TESTING: second view */}
      {/* <Button onPress={openPushedModal} title="See More Details Push" /> */}

      {/* <Link href="/(modals)/destination/[id]/pushed" asChild>
        <Button title="See More Details Push" />
      </Link> */}
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