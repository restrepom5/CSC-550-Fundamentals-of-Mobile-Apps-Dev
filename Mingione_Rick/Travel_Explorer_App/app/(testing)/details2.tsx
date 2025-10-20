import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const destinations = [
  { id: 'smokey', name: 'Great Smokey Mountains National Park', image: require('@/assets/images/parks/smokey.jpg') },
  { id: 'yellowstone', name: 'Yellowstone National Park', image: require('@/assets/images/parks/yellowstone.jpg') },
  { id: 'zion', name: 'Zion National Park', image: require('@/assets/images/parks/zion.jpg') },
];

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <FlatList
      data={destinations}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push(`../(modals)/destination/${item.id}`)} // ✅ Push modal
        >
          <Image source={item.image} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 16, borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff' },
  image: { width: '100%', height: 160 },
  name: { padding: 12, fontSize: 18, fontWeight: '600' },
});
