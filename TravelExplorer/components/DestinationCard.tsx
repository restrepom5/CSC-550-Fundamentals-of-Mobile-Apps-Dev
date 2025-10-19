import { Link } from "expo-router";
import { Image, View, Text, Pressable, StyleSheet } from "react-native";

type Props = {
  id: string;
  name: string;
  country: string;
  image: string;
  price: string;
};

export default function DestinationCard({ id, name, country, image, price }: Props) {
  return (
    <Link href={{ pathname: "/destination/[id]", params: { id } }} asChild>
      <Pressable style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        <View style={styles.meta}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{country} • {price}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 16,
    elevation: 2
  },
  image: {
    width: "100%",
    height: 180
  },
  meta: {
    padding: 12
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: "#555"
  }
});
