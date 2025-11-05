import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store/store';

export default function MoodTrackerScreen() {
  const router = useRouter();
  const moods = useSelector((state: RootState) => state.mood.moods);
  const today = new Date().toDateString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>
      <Text style={styles.date}>Today: {today}</Text>

      <FlatList
        data={moods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.moodItem}>
            <Text>{item.date} - {item.mood}</Text>
            {item.note ? <Text style={styles.note}>Note: {item.note}</Text> : null}
          </View>
        )}
        ListEmptyComponent={<Text>No moods yet. Add your first one!</Text>}
      />

      <Button title="Add Current Mood" onPress={() => router.push('/add-mood')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  date: { fontSize: 16, marginBottom: 20 },
  moodItem: { marginBottom: 10, padding: 10, backgroundColor: '#eee', borderRadius: 8 },
  note: { fontStyle: 'italic', color: '#555' },
});
