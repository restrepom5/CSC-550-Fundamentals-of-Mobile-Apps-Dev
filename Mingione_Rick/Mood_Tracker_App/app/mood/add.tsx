import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const moods = ['Happy', 'Sad', 'Calm', 'Tired'];

export default function AddMood() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');

  // const handleSave = () => {
  //   console.log('Saved mood:', { selectedMood, note });
  //   // In a real app, update global store or local storage here.
  //   router.back();
  // };

  const handleSave = async () => {
    if (!selectedMood) return;

    try {
      const newMood = {
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
        mood: selectedMood,
        note,
      };

      // get existing moods
      const stored = await AsyncStorage.getItem('moods');
      const existing = stored ? JSON.parse(stored) : [];

      // save new list
      const updated = [...existing, newMood];
      await AsyncStorage.setItem('moods', JSON.stringify(updated));

      Alert.alert('Success', 'Mood saved!');
      router.back();
    } catch (err) {
      console.error('Error saving mood:', err);
      Alert.alert('Error', 'Failed to save mood.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Mood</Text>

      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood}
            onPress={() => setSelectedMood(mood)}
            style={[
              styles.moodButton,
              selectedMood === mood && styles.selectedMood,
            ]}
          >
            <Text>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Add a note (optional)"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />

      <Button
        title="Save Mood"
        onPress={handleSave}
        disabled={!selectedMood}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
  moodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  moodButton: { padding: 10, borderWidth: 1, borderRadius: 8 },
  selectedMood: { backgroundColor: '#cde' },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 20 },
});
