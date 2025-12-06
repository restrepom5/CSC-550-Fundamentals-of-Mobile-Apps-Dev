// app/tabs/mood.tsx
import { Link } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../state/store";
import { clearMoods, removeMood } from "../../state/moodSlice";

const C = {
  bg: "#F5F0E6",
  card: "#EFE5D6",
  ink: "#2A2926",
  muted: "#6F6B63",
  brand: "#7C6A46",
  danger: "#9A3B3B",
};

export default function FoodReviewsTab() {
  const reviews = useSelector((s: RootState) => s.mood.items);
  const dispatch = useDispatch();

  const today = React.useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={styles.container}>
        <Text style={styles.h1}>Food Reviews</Text>
        <Text style={styles.sub}>{today}</Text>

        <View style={styles.actions}>
          <Link href="/mood-add" asChild>
            <Pressable style={styles.primary}>
              <Text style={styles.primaryText}>Add a review</Text>
            </Pressable>
          </Link>

          {reviews.length > 0 && (
            <Pressable
              style={styles.ghost}
              onPress={() => dispatch(clearMoods())}
            >
              <Text style={styles.ghostText}>Clear all</Text>
            </Pressable>
          )}
        </View>

        <Text style={styles.section}>Past reviews</Text>

        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No reviews yet. Add your first dish!
            </Text>
          }
          renderItem={({ item }) => {
            const when = new Date(item.dateISO).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowRestaurant}>
                    {item.restaurantName}
                  </Text>
                  <Text style={styles.rowDish}>{item.dishName}</Text>
                  <Text style={styles.rowMeta}>
                    Rating: {item.rating} / 5 · {when}
                  </Text>
                </View>

                <Pressable
                  onPress={() => dispatch(removeMood(item.id))}
                  style={styles.delete}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10, backgroundColor: C.bg },
  h1: { fontSize: 22, fontWeight: "800", color: C.ink },
  sub: { color: C.muted, marginBottom: 6 },
  actions: { flexDirection: "row", gap: 10 },
  primary: {
    flex: 1,
    backgroundColor: C.brand,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "800" },
  ghost: {
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: "center",
    backgroundColor: "#EADFCC",
  },
  ghostText: { color: C.ink, fontWeight: "700" },
  section: { marginTop: 8, fontWeight: "800", color: C.ink },
  empty: { color: C.muted, marginTop: 8 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: C.card,
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  rowRestaurant: { fontSize: 16, fontWeight: "800", color: C.ink },
  rowDish: { fontSize: 14, color: C.ink, marginTop: 2 },
  rowMeta: { fontSize: 12, color: C.muted, marginTop: 4 },

  delete: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: C.danger,
  },
  deleteText: { color: "#fff", fontWeight: "700" },
});
