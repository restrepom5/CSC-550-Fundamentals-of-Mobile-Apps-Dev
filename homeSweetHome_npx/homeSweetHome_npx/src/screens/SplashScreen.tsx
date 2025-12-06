import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper'; // react-nativer-paper library 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import LottieView from 'lottie-react-native'; // lottie library

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;


export default function SplashScreen({ navigation }: Props) {
  const animationRef = useRef<LottieView>(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Sweet Home</Text>
      <LottieView
            ref={animationRef}
            source={require('../assets/lottie/paws.json')}
            style={{ width: 400, height: 400 }}
            autoPlay={true}
            loop
            />
        <Button mode="contained" onPress={() => navigation.navigate('Home')}>
        Start
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 24 },
});
