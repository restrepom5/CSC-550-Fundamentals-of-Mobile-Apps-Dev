// app/(tabs)/explore.tsx
import { useMemo, useState } from "react";
import { SafeAreaView, TextInput, FlatList, View, Text, StyleSheet } from "react-native";
import DestinationCard from "../../components/DestinationCard";
import { DESTINATIONS } from "../../lib/data/destinations";

export default function ExploreScreen() {
  const [query, setQuery] = useState("");

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DESTINATIONS;
    return DESTINATIONS.filter(
      d => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search by city or country"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinationCard
            id={item.id}
            name={item.name}
            country={item.country}
            image={(item as any).image} // works for local require or URL
            price={(item as any).price ?? "$$"}
          />
        )}
        // IMPORTANT bits:
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", color: "#f10707ff", marginTop: 24 }}>
            No destinations match your search.
          </Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16
  }
});
