import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { moodStore } from "./moodStore";

export default function MoodTracker() {
  type Mood = { mood: string; note?: string; time: string };
  const [moods, setMoods] = useState<Mood[]>([]);
  const router = useRouter();

  useFocusEffect(() => {
    // reload local mood list whenever user returns
    setMoods([...moodStore.moods]);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood Tracker</Text>
      <Text style={styles.date}>{new Date().toDateString()}</Text>

      {moods.length === 0 ? (
        <Text style={styles.empty}>No moods yet — add one below!</Text>
      ) : (
        <FlatList
          data={moods}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.mood}>{item.mood}</Text>
              {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
              <Text style={styles.time}>{item.time}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/mood/add")}
      >
        <Text style={styles.buttonText}>Add Mood</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  date: { color: "#666", marginBottom: 12 },
  empty: { textAlign: "center", color: "#999", marginTop: 40 },
  card: {
    backgroundColor: "#e9f3ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  mood: { fontSize: 18, fontWeight: "bold", color: "#007AFF" },
  note: { color: "#333", marginTop: 4 },
  time: { color: "#888", marginTop: 4, fontSize: 12 },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
