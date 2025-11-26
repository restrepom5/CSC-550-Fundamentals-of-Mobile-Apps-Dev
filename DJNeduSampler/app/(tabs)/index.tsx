import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DJ Nedu Sampler 🎧</Text>
      <Text style={styles.subtitle}>
        Tap a section below to start playing sounds.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/explore')}
      >
        <Text style={styles.buttonText}>Sampler Pads</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/library')}
      >
        <Text style={styles.buttonText}>Sound Library</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/settings')}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#00ffcc',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: '#aaa',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00ffcc',
    width: '80%',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

