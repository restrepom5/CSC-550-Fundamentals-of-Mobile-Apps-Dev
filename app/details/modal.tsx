import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗒 Travel Info Modal</Text>
      <Text style={styles.subtitle}>
        Check the latest travel advisories and tips before your trip!</Text>
      <Link href="/tabs/profile" asChild>
        <Button title="Back to Profile" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
});
