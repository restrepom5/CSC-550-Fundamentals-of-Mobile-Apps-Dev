import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

const { width } = Dimensions.get("window");

const DATA = Array.from({ length: 20 }, (_, i) => ({
  id: String(i),
  name: `Destination #${i + 1}`,
  desc: "A wonderful place to explore.",
  image: `https://source.unsplash.com/random/800x600/?city,${i}`,
}));

export default function Explore() {
  const [useFlashList, setUseFlashList] = useState(true);

  const renderCard = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {useFlashList ? "⚡ FlashList Demo" : "🧾 FlatList Demo"}
      </Text>

      <TouchableOpacity
        onPress={() => setUseFlashList(!useFlashList)}
        style={styles.toggleButton}
      >
        <Text style={styles.toggleText}>
          Switch to {useFlashList ? "FlatList" : "FlashList"}
        </Text>
      </TouchableOpacity>

      {useFlashList ? (
        <FlashList
          data={DATA}
          renderItem={renderCard}
          estimatedItemSize={200}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={DATA}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181818", padding: 10 },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 10,
    textAlign: "center",
  },
  toggleButton: {
    alignSelf: "center",
    backgroundColor: "#333",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  toggleText: { color: "#fff" },
  card: {
    backgroundColor: "#222",
    borderRadius: 14,
    marginBottom: 16,
    padding: 12,
  },
  image: {
    width: width - 40,
    height: 180,
    borderRadius: 12,
    alignSelf: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  desc: { color: "#aaa", fontSize: 14, marginTop: 4 },
});
