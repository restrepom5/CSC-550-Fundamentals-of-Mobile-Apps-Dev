import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { moodStore } from "./moodStore";

export default function AddMood() {
  const [mood, setMood] = useState("Happy");
  const [note, setNote] = useState("");
  const router = useRouter();

  const handleSave = () => {
    const newMood = {
      mood,
      note,
      time: new Date().toLocaleTimeString(),
    };
    moodStore.addMood(newMood);
    router.back(); // return to mood list
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Mood</Text>

      <Text style={styles.label}>Select Mood</Text>
      <Picker selectedValue={mood} onValueChange={(v) => setMood(v)}>
        <Picker.Item label="Happy" value="Happy" />
        <Picker.Item label="Sad" value="Sad" />
        <Picker.Item label="Calm" value="Calm" />
        <Picker.Item label="Tired" value="Tired" />
      </Picker>

      <Text style={styles.label}>Add a note (optional)</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Write something..."
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Mood</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  label: { marginTop: 10, fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
});
