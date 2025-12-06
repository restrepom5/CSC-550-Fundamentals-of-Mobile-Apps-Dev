import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Breed } from '../types';
import SearchBar from '../components/SearchBar';
import BreedList from '../components/BreedList';
import { fetchBreedsBySpecies } from '../api/shelters';
import LottieView from 'lottie-react-native'; //lottie library

type Props = NativeStackScreenProps<RootStackParamList, 'Species'>;

export default function SpeciesScreen({ route, navigation }: Props) {
  const animationRef = useRef<LottieView>(null);
  const { species } = route.params;
  const [query, setQuery] = useState('');
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    fetchBreedsBySpecies(species).then((data) => setBreeds(data.slice(0, 5)));
  }, [species]);

  return (
    <View style={styles.container}>
      <SearchBar query={query} onChangeText={setQuery} placeholder="Search breeds..." />
      <BreedList breeds={breeds} onSelect={(breed) => navigation.navigate('Breed', { species, breed })} />
      <LottieView
            ref={animationRef}
            source={require('../assets/lottie/cat.json')}
            style={{ width: 400, height: 400 }}
            autoPlay={true}
            loop
            />
    </View>

    
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 40 } });
