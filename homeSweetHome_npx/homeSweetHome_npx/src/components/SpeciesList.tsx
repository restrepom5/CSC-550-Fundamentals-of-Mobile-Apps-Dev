import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Species } from '../types';

interface SpeciesListProps {
  species: Species[];
  onSelect: (species: Species) => void;
}

// Local images mapped to species
const speciesImages: Record<Species, any> = {
  Cats: require('../assets/images/cat1.jpg'),
  Dogs: require('../assets/images/dog1.jpeg'),
  Bunnies: require('../assets/images/bunny1.webp'),
  Fish: require('../assets/images/fish1.jpg'),
};

export default function SpeciesList({ species, onSelect }: SpeciesListProps) {
  return (
    <FlatList
      horizontal
      data={species}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
          <Image source={speciesImages[item]} style={styles.image} />
          <Text>{item}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  item: { marginRight: 16, alignItems: 'center' },
  image: { width: 60, height: 60, borderRadius: 30, marginBottom: 4 },
});
