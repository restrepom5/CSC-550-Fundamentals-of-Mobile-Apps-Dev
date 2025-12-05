import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Final Project Details</Text>
      <Text style={styles.text}>
        This app was built for CSC-550 final project.
      </Text>
      <Text style={styles.text}>
        It uses a network call (axios), a device capability (Haptics), local
        storage (AsyncStorage), stack + tab navigation, and user input via a
        controlled form.
      </Text>
      <Text style={styles.text}>
        The goal is to demonstrate core concepts.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});
