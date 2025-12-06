// app/tabs/explore.tsx
import React from "react";
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
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../state/store";
import { toggleFavorite } from "../../state/favoritesSlice";

const C = {
  bg: "#F5F0E6",
  card: "#EFE5D6",
  ink: "#2A2926",
  muted: "#6F6B63",
  brand: "#7C6A46",
};

type Restaurant = { id: string; name: string; city: string; cuisine: string; image: number | string };

const IMG = {
  cicciolina: require("../../assets/images/cicciolina.jpg"),
  abytung: require("../../assets/images/abytung.jpg"),
  central: require("../../assets/images/central.jpg"),
  maido: require("../../assets/images/maido.jpg"),
  disfrutar: require("../../assets/images/disfrutar.jpg"),
};

const DATA: Restaurant[] = [
  { id: "1", name: "Cicciolina", city: "Cusco", cuisine: "Mediterranean · Tapas", image: IMG.cicciolina,},
  { id: "2", name: "A by T.U.N.G", city: "Ho Chi Minh City", cuisine: "Modern Vietnamese · Tasting Menu", image: IMG.abytung,},
  { id: "3", name: "Central", city: "Lima", cuisine: "Peruvian · Tasting Menu", image: IMG.central, },
  { id: "4", name: "Maido", city: "Lima", cuisine: "Nikkei · Peruvian–Japanese", image: IMG.maido,},
  { id: "5", name: "Disfrutar", city: "Barcelona", cuisine: "Modern Spanish · Tasting Menu", image: IMG.disfrutar,},
];

const GAP = 12;
const COLS = 2;
const { width } = Dimensions.get("window");
const CARD_W = Math.floor((width - GAP * (COLS + 1)) / COLS);

export default function ExploreScreen() {
  const dispatch = useDispatch();
  const favorites = useSelector((s: RootState) => s.favorites.items);
  const isFavorite = (id: string) => favorites.some((f) => f.id === id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse Restaurants</Text>
        <Text style={styles.sub}>Tap a card for details, tap the heart to favorite.</Text>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        numColumns={COLS}
        columnWrapperStyle={{ gap: GAP, paddingHorizontal: GAP }}
        contentContainerStyle={{ paddingBottom: 20, gap: GAP }}
        renderItem={({ item }) => {
          const fav = isFavorite(item.id);
          return (
            <View style={styles.cardWrap}>
              <Link href={`/details/${item.id}`} asChild>
                <TouchableOpacity style={styles.card} activeOpacity={0.85}>
                  <Image
                    source={item.image}
                    style={styles.image}
                    contentFit="cover"
                    transition={120}
                  />
                  <Pressable
                    style={styles.heart}
                    onPress={() =>
                      dispatch(
                        toggleFavorite({
                          id: item.id,
                          name: item.name,
                          region: `${item.city} • ${item.cuisine}`,
                        })
                      )
                    }
                    hitSlop={10}
                  >
                    <Ionicons
                      name={fav ? "heart" : "heart-outline"}
                      size={20}
                      color={fav ? "#e11d48" : "#fff"}
                    />
                  </Pressable>

                  <View style={styles.cardInfo}>
                    <Text style={styles.cardName}>{item.name}</Text>
                    <Text style={styles.cardMeta}>
                      {item.city} • {item.cuisine}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: C.bg, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 },
  title: { fontSize: 26, fontWeight: "800", color: C.ink },
  sub: { fontSize: 13, color: C.muted, marginTop: 2 },
  cardWrap: {
    width: CARD_W,
  },
  card: {
    width: "100%",
    backgroundColor: C.card,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  image: { width: "100%", height: CARD_W * 0.72 },
  heart: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: { paddingHorizontal: 10, paddingVertical: 10, gap: 2 },
  cardName: { color: C.ink, fontWeight: "800", fontSize: 16 },
  cardMeta: { color: C.muted, fontSize: 12 },
});
