import { Platform, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { GameContext } from '../_layout';
import { useContext } from 'react';

export default function Profile() {
  const context = useContext(GameContext);
  if (!context) return null;
  const { score, setScore } = context;

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView>
        <ThemedText style = {styles.title}>
          Profile
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText>
          Current Score: {score}
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    padding: 50,
  },
  
});
