// components/DestinationCard.tsx
import { Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import React from "react";
import { ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import { useFavorites } from "../favorites/FavoritesProvider";
import { useTheme } from "../theme/ThemeProvider";

type Props = {
  destination: {
    id: string;
    name: string;
    country: string;
    image: ImageSourcePropType;
    description: string;
  };
};

export default function DestinationCard({ destination }: Props): React.JSX.Element {
  const { colors } = useTheme();
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(destination.id);

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: "rgba(0,0,0,0.06)" }]}>
      <View style={{ position: "relative" }}>
        <ExpoImage
          source={destination.image}
          style={styles.image}
          contentFit="cover"
          cachePolicy="disk"
          transition={200}
        />
        <Pressable
          onPress={(e) => {
            (e as any).preventDefault?.();
            toggle(destination.id);
          }}
          style={styles.heart}
          accessibilityRole="button"
          accessibilityLabel={fav ? "Remove from favorites" : "Add to favorites"}
        >
          <Ionicons name={fav ? "heart" : "heart-outline"} size={22} color={fav ? "#ef4444" : "white"} />
        </Pressable>
      </View>

      <View style={{ padding: 12 }}>
        <Text style={[styles.title, { color: colors.text }]}>{destination.name}</Text>
        <Text style={{ color: colors.muted }}>{destination.country}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, overflow: "hidden", borderWidth: 1 },
  image: { width: "100%", height: 180, backgroundColor: "#ddd" },
  heart: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  title: { fontSize: 18, fontWeight: "800" },
});
