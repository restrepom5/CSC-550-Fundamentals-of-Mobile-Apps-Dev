// app/tabs/profile.tsx
import React from "react";
import { Link } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../state/store";
import { clearFavorites } from "../../state/favoritesSlice";
import Chris from "../../assets/images/Chris.jpg";

const C = {
  bg: "#F5F0E6",
  card: "#EFE5D6",
  ink: "#2A2926",
  muted: "#6F6B63",
  brand: "#7C6A46",
};

export default function ProfileScreen() {
  const favorites = useSelector((s: RootState) => s.favorites.items);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={Chris} style={styles.avatar} />
          <Text style={styles.name}>Christopher Soria</Text>
          <Text style={styles.meta}>Foodie · Restaurant Reviewer</Text>

          <Link href="/details/modal" asChild>
            <Pressable style={styles.primary}>
              <Text style={styles.primaryText}>Review Writing Tips</Text>
            </Pressable>
          </Link>
        </View>

        <View className="mt-4" />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Favorite Restaurants</Text>
          {favorites.length > 0 && (
            <Pressable onPress={() => dispatch(clearFavorites())}>
              <Text style={styles.clearText}>Clear all</Text>
            </Pressable>
          )}
        </View>

        {favorites.length === 0 ? (
          <Text style={styles.empty}>
            You don’t have any favorites yet. Tap the heart in the Restaurants tab to add some.
          </Text>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingTop: 6 }}
            renderItem={({ item }) => (
              <Link href={`/details/${item.id}`} asChild>
                <Pressable style={styles.favRow}>
                  <View>
                    <Text style={styles.favName}>{item.name}</Text>
                    <Text style={styles.favMeta}>{item.region}</Text>
                  </View>
                  <Text style={styles.favLink}>View</Text>
                </Pressable>
              </Link>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  avatar: { width: 96, height: 96, borderRadius: 999, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "800", color: C.ink },
  meta: { fontSize: 13, color: C.muted, marginBottom: 12 },
  primary: {
    backgroundColor: C.brand,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  primaryText: { color: "#fff", fontWeight: "800" },

  sectionHeader: {
    marginTop: 20,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: C.ink },
  clearText: { fontSize: 13, color: C.muted, textDecorationLine: "underline" },

  empty: { fontSize: 13, color: C.muted, marginTop: 4 },

  favRow: {
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: C.card,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  favName: { fontSize: 15, fontWeight: "700", color: C.ink },
  favMeta: { fontSize: 12, color: C.muted, marginTop: 2 },
  favLink: { fontSize: 13, fontWeight: "700", color: C.brand },
});
