// app/Home/MoodTracker/addMood.tsx (Updated)

import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native'; // <-- Import SafeAreaView
import React, { useState } from 'react'; 
import { router } from 'expo-router';
import { useDispatch } from 'react-redux'; 
import { addMood } from '../../../src/store/moodSlice'; 
import { RootState } from '../../../src/store/types'; // Import RootState if needed for any complex local state logic, though usually not directly in addMood for useSelector.

const MOOD_OPTIONS = ['Happy', 'Calm', 'Stressed', 'Tired', 'Sad', 'Relaxed'];

export default function AddMoodScreen() {
  const [selectedMood, setSelectedMood] = useState(MOOD_OPTIONS[0]);
  const [note, setNote] = useState('');

  const dispatch = useDispatch();

  const handleSaveMood = () => {
    const newMoodEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      mood: selectedMood,
      note: note.trim(),
    };
    dispatch(addMood(newMoodEntry)); 
    router.back();
  };

  return (
    // Wrap content in SafeAreaView and apply background color
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>Select your current mood:</Text>
        <View style={styles.moodButtonsContainer}>
          {MOOD_OPTIONS.map((mood) => (
            <Button
              key={mood}
              title={mood}
              onPress={() => setSelectedMood(mood)}
              color={selectedMood === mood ? '#90EE90' : '#4D4D4D'}
            />
          ))}
        </View>
        <Text style={styles.label}>Add a note for today (Optional):</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Feeling productive..."
          placeholderTextColor="#8F8F91"
          value={note}
          onChangeText={setNote}
          multiline
        />
        <View style={{ marginTop: 20 }}>
          <Button 
            title="💾 Save Mood" 
            onPress={handleSaveMood} 
            disabled={!selectedMood} 
            color="#90EE90"
          />
        </View>
      </View>
    </SafeAreaView> // <-- Close SafeAreaView
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C1C1E', // Ensure the safe area also has the dark background
  },
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#1C1C1E', 
  },
  label: { fontSize: 16, fontWeight: 'bold', color: '#FFF', marginTop: 20, marginBottom: 10 },
  moodButtonsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  input: {
    height: 100,
    borderColor: '#4D4D4D',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: '#FFF',
    textAlignVertical: 'top',
  },
});