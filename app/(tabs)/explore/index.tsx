// app/(tabs)/explore/index.tsx
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import DestinationCard from "../../../components/DestinationCard";
import destinations from "../../../data/destinations";
import { useTheme } from "../../../theme/ThemeProvider";

export default function ExploreScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Explore Destinations</Text>
      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <DestinationCard
            destination={item}
            onPress={() => router.push({ pathname: "/modal", params: { id: item.id } })}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: "700", margin: 16 },
});
