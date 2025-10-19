import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function PushedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧳 Extra Travel Info</Text>
      <Text style={styles.subtitle}>Find travel tips, hotel guides, and more!</Text>
      <Link href="/tabs/explore" asChild>
        <Button title="Back to Explore" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
});
