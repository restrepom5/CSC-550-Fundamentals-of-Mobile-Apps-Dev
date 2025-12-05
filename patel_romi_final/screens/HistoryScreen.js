import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryScreen() {
  const [entries, setEntries] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadEntries = async () => {
        const stored = await AsyncStorage.getItem('moodEntries');
        setEntries(stored ? JSON.parse(stored) : []);
      };

      loadEntries();
    }, [])
  );

  const clearAll = async () => {
    await AsyncStorage.removeItem('moodEntries');
    setEntries([]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.mood}>{item.mood}</Text>
      {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
      <Text style={styles.date}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood History</Text>

      {entries.length === 0 ? (
        <Text>No entries yet. Save one from the Mood tab.</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      <View style={styles.clearWrapper}>
        <Button title="Clear all" onPress={clearAll} />
      </View>
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
  item: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  mood: {
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    fontSize: 14,
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  clearWrapper: {
    marginTop: 12,
  },
});
