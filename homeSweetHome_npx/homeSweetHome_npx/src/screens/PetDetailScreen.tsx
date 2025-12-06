import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import LottieView from 'lottie-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PetDetail'>;

// Local fallback images
const fallbackImages: Record<string, any> = {
  Cats: require('../assets/images/cat1.jpg'),
  Dogs: require('../assets/images/dog1.jpeg'),
  Bunnies: require('../assets/images/bunny1.webp'),
  Fish: require('../assets/images/fish1.jpg'),
};

export default function PetDetailScreen({ route, navigation }: Props) {
  const { pet } = route.params;       
  const animationRef = useRef<LottieView>(null);

  const handleAdopt = () => {
    animationRef.current?.play();

    setTimeout(() => {
      navigation.navigate('AdoptForm', { pet });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Image
        source={pet.thumbnail ? pet.thumbnail : fallbackImages[pet.species]}
        style={styles.image}
      />
      <Text style={styles.name}>{pet.name}</Text>
      <Text>{pet.age} • {pet.sex === 'male' ? '♂' : '♀'}</Text>
      <Text style={styles.description}>{pet.description}</Text>

      <View style={{ alignItems: 'center', marginTop: 24 }}>
      <LottieView
      ref={animationRef}
      source={require('../assets/lottie/EmojisLove.json')}
      style={{ width: 100, height: 100 }}
      autoPlay={false}
      loop={false}
    />

    <Button
      mode="contained"
      onPress={handleAdopt}
      contentStyle={{ paddingVertical: 12, paddingHorizontal: 12 }}
      style={{ borderRadius: 12, marginTop: 100}}
    >
    <Text style={{ color: 'white', fontSize: 16 }}>Adopt {pet.name}</Text>
  </Button>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, alignItems: 'center' },
  image: { width: 200, height: 200, borderRadius: 12, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold' },
  description: { marginVertical: 12, textAlign: 'center' },
});
