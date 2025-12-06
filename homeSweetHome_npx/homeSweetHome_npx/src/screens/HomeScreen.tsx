import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Breed, Species } from '../types';
import SearchBar from '../components/SearchBar';
import SpeciesList from '../components/SpeciesList';
import BreedList from '../components/BreedList';
import { fetchBreedsBySpecies } from '../api/shelters';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [allBreeds, setAllBreeds] = useState<Breed[]>([]);

  const speciesList: Species[] = ['Cats', 'Dogs', 'Bunnies', 'Fish'];


  useEffect(() => {
    async function loadAllBreeds() {
      let collected: Breed[] = [];

      for (let sp of speciesList) {
        const spBreeds = await fetchBreedsBySpecies(sp);
        collected = [...collected, ...spBreeds];
      }

      setAllBreeds(collected);
    }

    loadAllBreeds();
  }, []);

  // Search/filter
  useEffect(() => {
    if (query.length === 0) {
      setBreeds([]);
    } else {
      const results = allBreeds.filter((b) =>
        (b.name ?? '').toLowerCase().includes(query.toLowerCase())
      );
      setBreeds(results);
    }
  }, [query, allBreeds]);

  return (
    <View style={styles.container}>
      <SearchBar
        query={query}
        onChangeText={setQuery}
        placeholder="Search breeds..."
      />

      {/* Show species list if no search - defualt */}
      {query.length === 0 && (
        <SpeciesList
          species={speciesList}
          onSelect={(species) => navigation.navigate('Species', { species })}
        />
      )}

      {/* Show breed auto-suggestions if searching */}
      {query.length > 0 && breeds.length > 0 && (
        <BreedList
          breeds={breeds}
          onSelect={(breed) =>
            navigation.navigate('Breed', {
              species: breed.species,
              breed,
            })
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30 },
});
