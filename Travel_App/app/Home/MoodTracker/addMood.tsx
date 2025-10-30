// app/Home/MoodTracker/addMood.tsx

import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

// This is the "Add Mood" Form Screen
export default function AddMoodScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Current Mood (Form Screen)</Text>
      {/* Form inputs and Save Button will go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1C1C1E' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
});