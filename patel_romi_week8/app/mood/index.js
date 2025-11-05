import { useCallback, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useFocusEffect } from "expo-router";

const STORAGE_KEY = "@moods";

export default function MoodList() {
  const [moods, setMoods] = useState([]);

  const load = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      setMoods(raw ? JSON.parse(raw) : []);
    } catch (e) {
      console.warn("Failed to load moods", e);
    }
  };

  useFocusEffect(useCallback(() => { load(); }, []));

  return (
    <View style={s.wrap}>
      <Text style={s.h1}>Mood Tracker</Text>
      <Text style={s.subtitle}>Today: {new Date().toLocaleDateString()}</Text>

      <Link href="/mood/add" asChild>
        <TouchableOpacity style={s.primaryBtn}>
          <Text style={s.primaryText}>Add current mood</Text>
        </TouchableOpacity>
      </Link>

      <Text style={s.h2}>History</Text>
      {moods.length === 0 ? (
        <Text style={{ color: "#666" }}>No moods yet. Tap “Add current mood”.</Text>
      ) : (
        <FlatList
          data={[...moods].reverse()}
          keyExtractor={(it) => it.id}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text style={s.moodLine}>
                <Text style={s.mood}>{item.mood}</Text>
                {item.note ? <Text style={s.note}> — {item.note}</Text> : null}
              </Text>
              <Text style={s.date}>{new Date(item.date).toLocaleString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#fff", padding: 20, gap: 10 },
  h1: { fontSize: 24, fontWeight: "800" },
  subtitle: { color: "#666" },
  h2: { fontSize: 18, fontWeight: "700", marginTop: 8 },
  primaryBtn: { backgroundColor: "#2f95dc", paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  primaryText: { color: "#fff", fontWeight: "700" },
  card: { backgroundColor: "#f6f7f9", padding: 12, borderRadius: 12, marginTop: 8 },
  moodLine: { fontSize: 16, marginBottom: 4 },
  mood: { fontWeight: "700" },
  note: { color: "#333" },
  date: { color: "#888", fontSize: 12 },
});
