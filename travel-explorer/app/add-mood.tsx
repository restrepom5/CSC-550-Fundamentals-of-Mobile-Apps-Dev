import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useMoods } from './contexts/MoodContext'; // Import the hook

const moodOptions = ["Happy", "Sad", "Calm", "Tired", "Excited"];

export default function AddMoodScreen() {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const router = useRouter();
  const { addMood } = useMoods(); // Get the addMood function from our context

  const handleSave = () => {
    if (selectedMood) { // Only save if a mood has been selected
      addMood(selectedMood, note); // This now saves the mood to the device
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>How are you feeling?</Text>

      <View style={styles.moodSelector}>
        {moodOptions.map((mood) => (
          <TouchableOpacity
            key={mood}
            style={[styles.moodButton, selectedMood === mood && styles.selectedMood]}
            onPress={() => setSelectedMood(mood)}
          >
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Add a note for today (optional)"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Mood</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  moodSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    margin: 5,
  },
  selectedMood: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  moodText: {
    fontSize: 16,
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
