import { Link, useLocalSearchParams } from 'expo-router';
import { Alert, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { myLocations } from './(tabs)';
import { states } from './(tabs)/explore';

export default function ModalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <ThemedView style={styles.container}>
      <Link href={{ pathname: "/details/[id]", params: { id } }} dismissTo style={styles.link}>
        <ThemedText type="link">Go to details page</ThemedText>
      </Link>
      <Link href="/" dismissTo style={styles.link} 
        onPress={(e) => {
          const location = states.find((val) => val.id === id);
          if (location) {
            if (!myLocations.find((loc) => loc.id === location.id)) {
              myLocations.push(location);
            } else {
              e.preventDefault();
              Alert.alert('Info', 'Location already in My Destinations');
            }
          }
        }}>
        <ThemedText type="link">Add to My Destinations</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  link: {
    marginTop: 8,
    paddingVertical: 12,
  },
});
