import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { useMoods } from "../../context/MoodContext";

const MOODS = ["Happy", "Sad", "Stressed", "Relaxed", "Calm", "Tired"] as const;

export default function AddMoodScreen() {
  const router = useRouter();
  const { addMood } = useMoods();
  const [selected, setSelected] = useState<(typeof MOODS)[number]>("Happy");
  const [note, setNote] = useState<string>("");

  const onSave = () => {
    addMood({
      id: String(Date.now()),
      dateISO: new Date().toISOString(),
      mood: selected,
      note: note.trim() || undefined,
    });
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Select your mood</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {MOODS.map((m) => (
          <Pressable
            key={m}
            onPress={() => setSelected(m)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 17,
              borderRadius: 999,
              borderWidth: 2,
              borderColor: selected === m ? "#2f6" : "#629dd0ff",
              marginRight: 8,
              marginBottom: 8,
            }}
          >
            <Text style={{ fontWeight: selected === m ? "700" : "400" }}>{m}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={{ fontSize: 18, marginTop: 16, marginBottom: 8 }}>
        Add a note (optional)
      </Text>
      <TextInput
        placeholder="Anything about today..."
        value={note}
        onChangeText={setNote}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, minHeight: 80 }}
        multiline
      />

      <View style={{ marginTop: 16 }}>
        <Button title="Save Mood" onPress={onSave} />
      </View>
    </View>
  );
}
