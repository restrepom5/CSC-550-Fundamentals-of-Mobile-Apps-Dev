import { StyleSheet, TextInput, Button, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMood } from "@/src/store/moodSlice";
import { useRouter } from "expo-router";
import { v4 as uuidv4 } from "uuid";

export default function AddMoodScreen() {
  const [selectedMood, setSelectedMood] = useState("Happy");
  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const moods = ["Happy", "Sad", "Calm", "Tired", "Excited"];

  const handleSave = () => {
    dispatch(
      addMood({
        id: uuidv4(),
        date: new Date().toDateString(),
        mood: selectedMood,
        note,
      })
    );
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Mood</Text>

      <Text style={styles.subtitle}>Select your mood:</Text>
      <View style={styles.moodButtons}>
        {moods.map((m) => (
          <Pressable
            key={m}
            onPress={() => setSelectedMood(m)}
            style={[
              styles.moodButton,
              selectedMood === m && styles.moodButtonSelected,
            ]}
          >
            <Text>{m}</Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder="Add a note for today"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />

      <Button title="Save Mood" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 10 },
  moodButtons: { flexDirection: "row", flexWrap: "wrap", marginBottom: 20 },
  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    margin: 5,
  },
  moodButtonSelected: { backgroundColor: "#add8e6" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
});
