import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Mood Tracker</Text>
      <Text style={styles.emoji}>🍃</Text>
      <Button
        title="Go to Mood Tracker"
        onPress={() => router.push('/mood-tracker')}
        color="#077BFF" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d7eadcff', 
  },
  title: {
    fontSize: 30,
    fontWeight: 'semibold',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },

});

