import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://official-joke-api.appspot.com/jokes/random'
      );
      setJoke(response.data);
    } catch (err) {
      setError('Could not load a joke. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Final Project: Mood & Jokes</Text>

      {loading && <ActivityIndicator />}

      {error && <Text style={styles.error}>{error}</Text>}

      {joke && (
        <View style={styles.jokeBox}>
          <Text style={styles.jokeText}>{joke.setup}</Text>
          <Text style={styles.jokePunch}>{joke.punchline}</Text>
        </View>
      )}

      <View style={styles.buttonWrapper}>
        <Button title="Load a Joke (network call)" onPress={loadJoke} />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Go to Details (stack screen)"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
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
    textAlign: 'center',
    marginBottom: 24,
  },
  jokeBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  jokeText: {
    fontSize: 16,
    marginBottom: 8,
  },
  jokePunch: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonWrapper: {
    marginVertical: 8,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});
