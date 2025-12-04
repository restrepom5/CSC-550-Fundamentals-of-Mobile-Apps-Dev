import React, { useContext } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameContext } from '../_layout';
import { useRouter } from 'expo-router';

export default function Settings() {
  const context = useContext(GameContext);
  if (!context) return null;
  const { score, setScore } = context;
  const router = useRouter();

  const onReset = () => {
    setScore(0);
    router.push('/splashScreen');
  } 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Pressable onPress={onReset} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Text style={styles.buttonText}>Reset Game</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    position: 'absolute',
    top: 50,
    fontSize: 32,
    padding: 24,
  },
  button: {
		backgroundColor: '#e41313ff',
    paddingVertical: 14,
    paddingHorizontal: 14,
		borderRadius: 8,
	},
	buttonPressed: {
		opacity: 0.85,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
    textAlign: 'center',
	},
});
