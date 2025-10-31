// app/Home/MoodTracker/index.tsx (Updated)

import { View, Text, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native'; // <-- Import SafeAreaView
import React, { useMemo } from 'react';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../src/store/types'; 

export default function MoodTrackerScreen() {
  const moods = useSelector((state: RootState) => state.moods.moods); 
  const today = useMemo(() => new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }), []);

  return (
    // Wrap content in SafeAreaView and apply background color
    <SafeAreaView style={styles.safeArea}> 
      <View style={styles.container}>
        <Text style={styles.header}>Today is: **{today}**</Text>
        <Button 
          title="➕ Add Current Mood" 
          onPress={() => router.push('/Home/MoodTracker/addMood')} 
          color="#90EE90"
        />
        <Text style={styles.listTitle}>Past Moods Summary ({moods.length} Entries):</Text>
        <FlatList
          data={moods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.moodItem}>
              <Text style={styles.moodDate}>{item.date}</Text>
              <Text style={styles.moodType}>Mood: **{item.mood}**</Text>
              {item.note && <Text style={styles.moodNote}>Note: {item.note}</Text>}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No moods saved yet!</Text>}
        />
      </View>
    </SafeAreaView> // <-- Close SafeAreaView
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C1C1E', // Apply the background color here too
  },
  container: { 
    flex: 1, 
    padding: 20, 
    // You might remove backgroundColor from here if SafeAreaView has it
    // or keep it to ensure inner padding is also dark
    backgroundColor: '#1C1C1E', 
  },
  header: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 15 },
  listTitle: { fontSize: 18, fontWeight: '600', color: '#FFF', marginTop: 20, marginBottom: 10 },
  moodItem: { padding: 10, marginVertical: 5, backgroundColor: '#3A3A3C', borderRadius: 8 },
  moodDate: { fontSize: 14, color: '#D1D1D1' },
  moodType: { fontSize: 16, fontWeight: 'bold', color: '#90EE90', marginTop: 5 },
  moodNote: { fontSize: 14, color: '#D1D1D1', fontStyle: 'italic', marginTop: 3 },
  emptyText: { color: '#777', textAlign: 'center', marginTop: 20 },
});