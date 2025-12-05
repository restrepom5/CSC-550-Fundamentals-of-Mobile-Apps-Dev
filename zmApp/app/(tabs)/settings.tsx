import React, { useContext } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameContext } from '../_layout';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { ThemedView } from '@/components/themed-view';

export default function Settings() {
  const context = useContext(GameContext);
  if (!context) return null;
  const { score, setScore, taps, setTaps, upgradesBought, setUpgradesBought, increment, setIncrement, upgrade1, setUpgrade1, upgrade2, setUpgrade2, upgrade3, setUpgrade3 } = context;
  const router = useRouter();

  const onReset = () => {
    setScore(0);
    setTaps(0);
    setUpgradesBought(0);
    setIncrement(1);
    setUpgrade1(10);
    setUpgrade2(150);
    setUpgrade3(1000);
    router.push('/splashScreen');
  } 

  return (
    <ThemedView style={{ flex: 1 }}>
      <LottieView
        source={require('../../assets/animations/Gradient Animated Background.json')}
        autoPlay
        loop
        style={styles.background}
      />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <Pressable onPress={onReset} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>Reset Game</Text>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    position: 'absolute',
    top: 80,
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
  background: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    resizeMode: "stretch",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
