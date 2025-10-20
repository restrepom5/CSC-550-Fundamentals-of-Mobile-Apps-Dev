// app/tabs/explore.tsx
import { Link } from "expo-router";
import { Image } from "expo-image";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const C = {
  bg: "#F5F0E6",
  card: "#EFE5D6",
  ink: "#2A2926",
  muted: "#6F6B63",
  brand: "#7C6A46",
};

type Destination = { id: string; name: string; region: string; image: number | string };

// 👉 replace with your own local images
const IMG = {
    halongbay: require("../../assets/images/halongbay.jpg"),
  paris: require("../../assets/images/paris.jpg"),
  tokyo: require("../../assets/images/tokyo.jpg"),
  nyc: require("../../assets/images/download.jpg"),
   peru: require("../../assets/images/peru.jpg"),

};

const DATA: Destination[] = [
    { id: "1", name: "Ha Long Bay", region: "Vietnam", image: IMG.halongbay},
  { id: "2", name: "Paris", region: "France", image: IMG.paris },
  { id: "3", name: "Tokyo", region: "Japan", image: IMG.tokyo },
  { id: "4", name: "New York", region: "USA", image: IMG.nyc },
  { id: "5", name: "Cusco", region: "PERU", image: IMG.peru }
];

const GAP = 12;
const COLS = 2;
const { width } = Dimensions.get("window");
const CARD_W = Math.floor((width - (GAP * (COLS + 1))) / COLS);

export default function ExploreScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.sub}>Tap a card to open details</Text>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        numColumns={COLS}
        columnWrapperStyle={{ gap: GAP, paddingHorizontal: GAP }}
        contentContainerStyle={{ paddingBottom: 20, gap: GAP }}
        renderItem={({ item }) => (
          <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card} activeOpacity={0.85}>
              <Image
                source={item.image}
                style={styles.image}
                contentFit="cover"
                transition={120}
              />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardMeta}>{item.region}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: C.bg, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 },
  title: { fontSize: 26, fontWeight: "800", color: C.ink },
  sub: { fontSize: 13, color: C.muted, marginTop: 2 },
  card: {
    width: CARD_W,
    backgroundColor: C.card,
    borderRadius: 16,
    overflow: "hidden",
    // depth
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  image: { width: "100%", height: CARD_W * 0.72 },
  cardInfo: { paddingHorizontal: 10, paddingVertical: 10, gap: 2 },
  cardName: { color: C.ink, fontWeight: "800", fontSize: 16 },
  cardMeta: { color: C.muted, fontSize: 12 },
});
