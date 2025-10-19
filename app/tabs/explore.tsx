import { Link } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const destinations = [
  { id: '1', name: 'Paris, France' },
  { id: '2', name: 'Tokyo, Japan' },
  { id: '3', name: 'New York, USA' },
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧭 Explore Destinations</Text>
      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  card: { backgroundColor: '#E0F7FA', padding: 15, borderRadius: 10, marginBottom: 10 },
  cardText: { fontSize: 18 },
});
