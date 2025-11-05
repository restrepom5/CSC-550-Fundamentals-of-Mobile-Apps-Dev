import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";

const STORAGE_KEY = "@moods";
const OPTIONS = ["Happy", "Sad", "Stressed", "Relaxed", "Calm", "Tired"];

export default function AddMood() {
  const router = useRouter();
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState("");

  const save = async () => {
    if (!mood) return;
    const entry = { id: String(Date.now()), mood, note: note.trim(), date: new Date().toISOString() };
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const curr = raw ? JSON.parse(raw) : [];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...curr, entry]));
      router.back();
    } catch (e) {
      console.warn("Failed to save mood", e);
    }
  };

  return (
    <View style={s.wrap}>
      <Stack.Screen options={{ title: "Add Mood" }} />
      <Text style={s.label}>How are you feeling?</Text>

      <View style={s.row}>
        {OPTIONS.map((m) => {
          const active = mood === m;
          return (
            <TouchableOpacity key={m} style={[s.choice, active && s.choiceActive]} onPress={() => setMood(m)}>
              <Text style={[s.choiceText, active && s.choiceTextActive]}>{m}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={s.label}>Note (optional)</Text>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="e.g., Busy day but relaxed after walk"
        style={s.input}
      />

      <TouchableOpacity onPress={save} style={[s.save, !mood && { opacity: 0.6 }]} disabled={!mood}>
        <Text style={s.saveText}>Save Mood</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#fff", padding: 20, gap: 12 },
  label: { fontWeight: "700" },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  choice: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: "#ddd" },
  choiceActive: { backgroundColor: "#2f95dc22", borderColor: "#2f95dc" },
  choiceText: { fontWeight: "600", color: "#333" },
  choiceTextActive: { color: "#2f95dc" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 12, backgroundColor: "#fafafa" },
  save: { backgroundColor: "#2f95dc", paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "800" },
});
