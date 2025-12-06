// app/mood-add.tsx
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { addMood } from "../state/moodSlice";

const C = {
  bg: "#F5F0E6",
  card: "#EFE5D6",
  ink: "#2A2926",
  muted: "#6F6B63",
  brand: "#7C6A46",
};

const RESTAURANTS = [
  { id: "1", name: "Cicciolina" },
  { id: "2", name: "A by T.U.N.G" },
  { id: "3", name: "Central" },
  { id: "4", name: "Maido" },
  { id: "5", name: "Disfrutar" },
];

export default function AddFoodReview() {
  const dispatch = useDispatch();
  const [restaurantId, setRestaurantId] = React.useState<string | null>(null);
  const [dishName, setDishName] = React.useState("");
  const [rating, setRating] = React.useState<number | null>(null);

  const onSave = () => {
    if (!restaurantId) {
      return Alert.alert("Select a restaurant first.");
    }
    if (!dishName.trim()) {
      return Alert.alert("Enter the dish name.");
    }
    if (!rating) {
      return Alert.alert("Choose a rating from 1 to 5.");
    }

    const restaurantName =
      RESTAURANTS.find((r) => r.id === restaurantId)?.name ?? "Unknown";

    dispatch(
      addMood({
        restaurantId,
        restaurantName,
        dishName: dishName.trim(),
        rating,
      })
    );

    router.replace("/tabs/mood");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={styles.container}>
        <Text style={styles.h1}>Add a food review</Text>

        <Text style={styles.label}>Restaurant</Text>
        <View style={styles.grid}>
          {RESTAURANTS.map((r) => {
            const active = r.id === restaurantId;
            return (
              <Pressable
                key={r.id}
                onPress={() => setRestaurantId(r.id)}
                style={[
                  styles.chip,
                  active && { backgroundColor: C.brand },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    active && { color: "#fff" },
                  ]}
                >
                  {r.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Dish name</Text>
        <TextInput
          placeholder="e.g. Tasting menu, Phở bò tái, Ceviche…"
          placeholderTextColor={C.muted}
          value={dishName}
          onChangeText={setDishName}
          style={styles.input}
        />

        <Text style={styles.label}>Rating</Text>
        <View style={styles.grid}>
          {[1, 2, 3, 4, 5].map((n) => {
            const active = n === rating;
            return (
              <Pressable
                key={n}
                onPress={() => setRating(n)}
                style={[
                  styles.ratingChip,
                  active && { backgroundColor: C.brand },
                ]}
              >
                <Text
                  style={[
                    styles.ratingText,
                    active && { color: "#fff" },
                  ]}
                >
                  {n}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable onPress={onSave} style={styles.primary}>
          <Text style={styles.primaryText}>Save Review</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: C.bg },
  h1: { fontSize: 18, fontWeight: "800", color: C.ink, marginBottom: 4 },

  label: { color: C.ink, fontWeight: "700", marginTop: 4, marginBottom: 4 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    backgroundColor: C.card,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
  },
  chipText: { color: C.ink, fontWeight: "700" },

  ratingChip: {
    width: 40,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
    backgroundColor: C.card,
  },
  ratingText: { color: C.ink, fontWeight: "700" },

  input: {
    backgroundColor: C.card,
    borderRadius: 12,
    padding: 12,
    color: C.ink,
  },

  primary: {
    marginTop: 10,
    backgroundColor: C.brand,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "800" },
});
