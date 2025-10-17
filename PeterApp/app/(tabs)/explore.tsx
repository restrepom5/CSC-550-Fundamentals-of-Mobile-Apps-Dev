import React, { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import DestinationCard from "../../components/DestinationCard";
import { DESTINATIONS } from "../../data/destinations";

export default function ExploreScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(q ?? "");
  const [favorites, setFavorites] = useState<string[]>([]); // ❤️ in-memory

  const toggleFav = (id: string) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const filtered = useMemo(() => {
    const t = query.trim().toLowerCase();
    if (!t) return DESTINATIONS;
    return DESTINATIONS.filter(
      (d) =>
        d.name.toLowerCase().includes(t) ||
        d.country.toLowerCase().includes(t) ||
        d.tags.some((tag) => tag.toLowerCase().includes(t))
    );
  }, [query]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Search destinations (e.g., beach, Japan, mountains)"
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
        style={{
          backgroundColor: "#f2f2f2",
          padding: 12,
          borderRadius: 12,
          marginBottom: 12,
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinationCard
            id={item.id}
            name={item.name}
            country={item.country}
            image={item.image}
            rating={item.rating}
            price={item.price}
            isFav={favorites.includes(item.id)}
            onToggleFav={() => toggleFav(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#666", marginTop: 24 }}>
            No results. Try “beach”, “Japan”, or “mountains”.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

