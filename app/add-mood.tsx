import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'; // importing text input for the add text placeholder
import { useDispatch } from 'react-redux';
import { addMood } from '../src/store/moodSlice';
import { useRouter } from 'expo-router';

const moodOptions = ['Happy', 'Sad', 'Calm', 'Tired', 'Angry', 'Excited'];

// Using local state for adding new mood. The syntax is composed of:
// state variable, updater function (both inside an array)
// and the useState is hook that will manipulate the state
export default function AddMoodScreen() {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSaveMood = () => {
    if (!selectedMood) return;

    const moodEntry = {
      id: Date.now().toString(),
      date: new Date().toDateString(),
      mood: selectedMood,
      note,
    };

    dispatch(addMood(moodEntry));
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:24, fontWeight: "bold", marginBottom: 20, textAlign: 'center'}}>Add Mood</Text>

      <Text style={{fontSize:16, marginTop: 0, marginBottom: 10, textAlign: 'center'}}>What is your mood today?</Text>
      <View style={styles.moodContainer}>
        {moodOptions.map((mood) => (
          <TouchableOpacity
            key={mood}
            style={[
              styles.moodButton,
              selectedMood === mood && styles.selectedMood,
            ]}
            onPress={() => setSelectedMood(mood)}
          >
            <Text>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Add a note (optional):</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a note for today..."
        value={note}
        onChangeText={setNote} //onChangeText prop
      />

      <Button 
      title="Save Mood" 
      onPress={handleSaveMood} 
      disabled={!selectedMood} 
      color="#077BFF"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10, marginBottom: 5 },
  moodContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  moodButton: {
    backgroundColor: '#94dbefff',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedMood: { backgroundColor: 'rgba(199, 183, 226, 1)' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});
