import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.text}>
        Later you can add options like theme, pad colors, vibration on tap, etc.
      </Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    color: '#ddd',
    textAlign: 'center',
  },
});

