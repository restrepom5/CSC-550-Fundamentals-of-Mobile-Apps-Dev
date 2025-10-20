import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#d0d0d0ff', dark: '#032e1aff' }}
      headerImage={
        <Image
          source={require('../../assets/images/mountain.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Park Explorer!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.introContainer}>
        <ThemedText>
          Discover breathtaking national parks across the U.S. – from Yellowstones geysers to Zion’s canyons.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">🌄 Discover</ThemedText>
        <ThemedText>
          Learn about iconic parks, their history, and must-see spots before your next adventure.
        </ThemedText>
        <Link href="/(tabs)/explore">
          <Link.Trigger>
            <ThemedText type="link">Learn More</ThemedText>
          </Link.Trigger>
        </Link>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">🧭 Plan</ThemedText>
        <ThemedText>
          Get tips, maps, and seasonal guides to help you plan the perfect park visit.
        </ThemedText>
        <Link href="/(tabs)/details">
          <Link.Trigger>
            <ThemedText type="link">Browse Park Resources</ThemedText>
          </Link.Trigger>
        </Link>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">🚶 Start Exploring</ThemedText>
        <Link href="/(tabs)/explore">
          <Link.Trigger>
            <ThemedText type="link">Browse Parks</ThemedText>
          </Link.Trigger>
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  introContainer: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 8,
    gap: 6,
  },
  headerImage: {
    color: '#808080ff',
    bottom: -90,
    left: -95,
    position: 'absolute',
    height: 350,
    width: '100%',
    // resizeMode: 'cover',
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
  },
});
