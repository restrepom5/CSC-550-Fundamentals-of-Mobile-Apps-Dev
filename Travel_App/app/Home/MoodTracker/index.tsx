// app/Home/MoodTracker/index.tsx

import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

// This is the Mood Summary Screen (The Tab)
export default function MoodTrackerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood Summary (Index Screen)</Text>
      {/* List and Add Button will go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1C1C1E' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
});