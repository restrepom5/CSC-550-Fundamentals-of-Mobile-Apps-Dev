// components/DestinationCard.tsx
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Destination } from "../data/destinations"; // <-- use the type from data

type Props = {
  destination: Destination;
  onPress?: () => void; // Link(asChild) will inject this
};

export default function DestinationCard({ destination, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image
        source={destination.image}          
        style={styles.photo}
        contentFit="cover"
      />
      <View style={styles.meta}>
        <Text style={styles.name}>{destination.name}</Text>
        <Text style={styles.country}>{destination.country}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "white",
  },
  photo: { width: "100%", aspectRatio: 16 / 9 },
  meta: { padding: 12 },
  name: { fontSize: 20, fontWeight: "800" },
  country: { opacity: 0.7, marginTop: 2 },
});
