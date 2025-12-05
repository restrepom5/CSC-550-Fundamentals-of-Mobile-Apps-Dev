import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

export default function MoodScreen() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const saveMood = async () => {
    if (!mood.trim()) {
      Alert.alert('Please type how you feel first.');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      mood,
      note,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = await AsyncStorage.getItem('moodEntries');
      const parsed = existing ? JSON.parse(existing) : [];
      const updated = [newEntry, ...parsed];
      await AsyncStorage.setItem('moodEntries', JSON.stringify(updated));

      // Device capability: haptics
      await Haptics.selectionAsync();

      setMood('');
      setNote('');
      Alert.alert('Saved!', 'Your mood has been saved.');
    } catch (err) {
      Alert.alert('Error', 'Could not save your mood.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>

      <TextInput
        style={styles.input}
        placeholder="Mood (e.g., happy, stressed, tired)"
        value={mood}
        onChangeText={setMood}
      />

      <TextInput
        style={[styles.input, styles.noteInput]}
        placeholder="Description"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <Button title="Save Mood (uses AsyncStorage + Haptics)" onPress={saveMood} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  noteInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});
