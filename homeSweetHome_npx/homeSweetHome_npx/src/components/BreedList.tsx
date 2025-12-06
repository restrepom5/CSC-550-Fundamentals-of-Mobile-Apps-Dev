import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Breed } from '../types';

interface BreedListProps {
  breeds: Breed[];
  onSelect: (breed: Breed) => void;
}

export default function BreedList({ breeds, onSelect }: BreedListProps) {
  return (
    <FlatList
      data={breeds}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#490258ff' },
  name: { fontSize: 16 },
});
