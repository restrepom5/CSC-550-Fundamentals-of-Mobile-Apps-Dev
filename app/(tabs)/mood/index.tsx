import { useRouter } from "expo-router";
import React from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useMoods } from "../../context/MoodContext";

export default function MoodListScreen() {
  const router = useRouter();
  const { moods } = useMoods();
  const todayStr = new Date().toLocaleDateString();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Today: {todayStr}</Text>

      <Button title="Add current mood" onPress={() => router.push("/(tabs)/mood/add")} />

      <Text style={{ marginTop: 16, fontSize: 18, fontWeight: "600" }}>
        Previous moods
      </Text>

      <FlatList
        data={moods}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ marginTop: 8 }}>No moods yet. Tap “Add current mood”.</Text>
        }
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
            <Text style={{ fontSize: 16 }}>
              {item.mood}{" "}
              <Text style={{ color: "#666" }}>
                • {new Date(item.dateISO).toLocaleString()}
              </Text>
            </Text>
            {item.note ? (
              <Text style={{ color: "#444", marginTop: 4 }}>Note: {item.note}</Text>
            ) : null}
          </View>
        )}
      />
    </View>
  );
}
