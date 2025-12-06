import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  onPress: () => void;
}

// Local fallback images in case thumbnails are missing
const fallbackImages: Record<string, any> = {
  Cats: require('../assets/images/cat1.jpg'),
  Dogs: require('../assets/images/dog1.jpeg'),
  Bunnies: require('../assets/images/bunny1.webp'),
  Fish: require('../assets/images/fish1.jpg'),
};

export default function PetCard({ pet, onPress }: PetCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={pet.thumbnail ? pet.thumbnail : fallbackImages[pet.species]}
        style={styles.thumbnail}
      />
      <Text style={styles.name}>{pet.name}</Text>
      <Text>{pet.age} • {pet.sex === 'male' ? '♂' : '♀'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { margin: 8, alignItems: 'center', width: 120 },
  thumbnail: { width: 100, height: 100, borderRadius: 8, marginBottom: 4 },
  name: { fontWeight: 'bold', textAlign: 'center' },
});
