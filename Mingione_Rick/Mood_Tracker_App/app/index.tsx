import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Mood {
  id?: string;
  date: string;
  mood: string;
  note?: string;
}

export default function MoodList() {
  const today = new Date().toLocaleDateString();

  const [moods, setMoods] = useState<Mood[]>([]);

  const loadMoods = async () => {
    const stored = await AsyncStorage.getItem('moods');
    if (stored) setMoods(JSON.parse(stored));
  };

  // reload when screen is focused (user returns from AddMood)
  useFocusEffect(() => {
    loadMoods();
  });

  const handleDelete = async (id: string) => {
    setMoods((prevMoods) => prevMoods.filter((m) => m.id !== id));
    const updated = moods.filter((m) => m.id !== id);
    setMoods(updated);
    await AsyncStorage.setItem('moods', JSON.stringify(updated));
  };

  const clearAllData = async () => {
    Alert.alert('Confirm', 'Clear all saved moods?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes, clear all',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            setMoods([]); // Clear state too
            console.log('✅ All local data cleared!');
          } catch (e) {
            console.error('Failed to clear AsyncStorage:', e);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>Today&apos;s Date: {today}</Text>

      <FlatList
        data={moods}
        keyExtractor={(item) => item.id?.toString() ?? ''}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View>
              <Text style={styles.itemText}>
                {item.mood} — {item.note}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => item.id && handleDelete(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No moods recorded yet.</Text>}
      />

      <Link href="/mood/add" asChild>
        <Button title="Add Current Mood" />
      </Link>
      <View style={{ marginTop: 20 }}>
        <Button title="Clear All Moods" color="#cc3333" onPress={clearAllData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  date: { fontSize: 18, marginBottom: 20 },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: { fontSize: 16 },
  deleteButton: {
    backgroundColor: '#f55',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteText: { color: 'white', fontWeight: '600' },
});
