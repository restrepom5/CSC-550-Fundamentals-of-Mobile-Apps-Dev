import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Pet } from '../types';
import SearchBar from '../components/SearchBar';
import PetCard from '../components/PetCard';
import { fetchPetsByBreed } from '../api/shelters';

type Props = NativeStackScreenProps<RootStackParamList, 'Breed'>;

export default function BreedScreen({ route, navigation }: Props) {
  const { breed } = route.params;
  const [query, setQuery] = useState('');
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    fetchPetsByBreed(breed.id).then(setPets);
  }, [breed]);

  return (
    <View style={styles.container}>
      <SearchBar query={query} onChangeText={setQuery} />
      <Text style={styles.title}>{breed.name}</Text>
      <FlatList
        data={pets.slice(0, 6)}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <PetCard pet={item} onPress={() => navigation.navigate('PetDetail', { pet: item })} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginVertical: 12 },
});
