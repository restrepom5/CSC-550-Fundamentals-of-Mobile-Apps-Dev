import { Dimensions, Platform, StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { GameContext } from '../_layout';
import { useContext } from 'react';
import LottieView from 'lottie-react-native';

export default function Profile() {
  const context = useContext(GameContext);
  if (!context) return null;
  const { score, setScore, taps, setTaps, upgradesBought, setUpgradesBought, increment, setIncrement, upgrade1, setUpgrade1, upgrade2, setUpgrade2, upgrade3, setUpgrade3 } = context;

  return (
    <ThemedView style={{ flex: 1 }}>
      <LottieView
        source={require('../../assets/animations/Gradient Animated Background.json')}
        autoPlay
        loop
        style={styles.background}
      />
      <SafeAreaView style={styles.container}>
        <ThemedView>
          <ThemedText style = {styles.title}>
            Profile
          </ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText style={ styles.text }>
            Current Score: {score}
          </ThemedText>
          <ThemedText style={ styles.text }>
            Total Taps: {taps}
          </ThemedText>
          <ThemedText style={ styles.text }>
            Score Per Tap: {increment}
          </ThemedText>
          <ThemedText style={ styles.text }>
            Number of Upgrades Bought: {upgradesBought}
          </ThemedText>
          <ThemedText style={ styles.text }>
            Number of Upgrade 1 Bought: {(upgrade1-10)/10}
          </ThemedText>
          <ThemedText style={ styles.text }>
            Number of Upgrade 2 Bought: {(upgrade2-150)/150}
          </ThemedText>
          <ThemedText style={ styles.text }>
            Number of Upgrade 3 Bought: {(upgrade3-1000)/1000}
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    padding: 24,
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    padding: 10,
    backgroundColor: 'transparent', 
    borderWidth: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    resizeMode: "stretch",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
