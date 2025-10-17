// app/(tabs)/explore/index.tsx
import { Link } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import DestinationCard from "../../../components/DestinationCard";
import destinations from "../../../data/destinations";
import { useTheme } from "../../../theme/ThemeProvider";

export default function ExploreScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Explore Destinations</Text>
      <FlatList
        style={{ flex: 1 }}   // <-- enables scrolling
        data={destinations}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: "/destination/[id]", params: { id: item.id } }}
            asChild
          >
            <DestinationCard destination={item} />
          </Link>
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: "700", margin: 16 },
});
