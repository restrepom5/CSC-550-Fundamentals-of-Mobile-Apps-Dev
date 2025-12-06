import React from 'react';
import { View } from 'react-native';
import PetCard from './PetCard';
import { Pet } from '../types';

interface PetGridProps {
  pets: Pet[];
  onSelect: (p: Pet) => void;
}

export default function PetGrid({ pets, onSelect }: PetGridProps) {
  const left = pets.filter((_, i) => i % 2 === 0);
  const right = pets.filter((_, i) => i % 2 === 1);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12 }}>
      <View style={{ width: '48%' }}>
        {left.map(p => (
          <PetCard key={p.id} pet={p} onPress={() => onSelect(p)} />
        ))}
      </View>
      <View style={{ width: '48%' }}>
        {right.map(p => (
          <PetCard key={p.id} pet={p} onPress={() => onSelect(p)} />
        ))}
      </View>
    </View>
  );
}
