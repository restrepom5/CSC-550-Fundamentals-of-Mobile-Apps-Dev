import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 My Profile</Text>
      <Text style={styles.subtitle}>User: Khadijatul Kobra</Text>
      <Link href="/details/modal" asChild>
        <Button title="Open Travel Info Modal" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
});
