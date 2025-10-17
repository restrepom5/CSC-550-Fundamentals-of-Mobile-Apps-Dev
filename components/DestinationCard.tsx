// components/DestinationCard.tsx
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Destination = {
  id: string;
  name: string;
  country: string;
  image: string | null;
  description: string;
};

export default function DestinationCard({ destination, onPress }: {
  destination: Destination;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={ destination.image ? { uri: destination.image } : require("../assets/fallback.jpg") }
        style={styles.image}
        contentFit="cover"
        cachePolicy="disk"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{destination.name}</Text>
        <Text style={styles.country}>{destination.country}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, overflow: "hidden", backgroundColor: "white", elevation: 2 },
  image: { width: "100%", aspectRatio: 16 / 9 },
  content: { padding: 12, gap: 4 },
  name: { fontSize: 18, fontWeight: "700" },
  country: { fontSize: 14, opacity: 0.7 },
});
