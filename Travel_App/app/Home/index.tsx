// app/Home/index.tsx

import { router } from "expo-router";
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 

// 1. TypeScript Interface to fix the 'any' type error
interface Trip { 
    id: number; 
    title: string; 
    date: string; 
    status: string;
    icon?: string; // Optional icon property
}

// Dummy Data
const destinations: Trip[] = [
  { id: 101, title: 'Africa', date: 'Oct 2025', status: 'Upcoming', icon: 'flag' },
  { id: 102, title: 'Budapest Hungary', date: 'Jul 2025', status: 'Completed', icon: 'leaf' },
  { id: 103, title: 'Sri Lanka', date: 'Dec 2025', status: 'Booked', icon: 'water' },
];

// 2. Component for each item (Typed correctly)
const TripCard = ({ item }: { item: Trip }) => (
  <TouchableOpacity 
    style={styles.card}
    // Navigate to the dynamic route
    onPress={() => router.push({
        pathname: `../details/${item.id}`, 
        params: { backTitle: 'Your Travel Plans' } // <-- Sets the custom text
    })}
  >
    <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardStatus}>{item.status}</Text>
    </View>
    <Text style={styles.cardDate}>{item.date}</Text>
  </TouchableOpacity>
);

export default function TripsScreen() {
  return (
    <LinearGradient
      colors={["#0f0f0f", "#181818", "#111"]}
      style={styles.container}
    >
      <Text style={styles.header}>Your Travel Plans</Text>
      <FlatList
        data={destinations}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <TripCard item={item} />}
        contentContainerStyle={styles.listContent}
      />
    </LinearGradient>
  );
}

// 3. New Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60, 
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF', 
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  cardStatus: {
    fontSize: 12,
    fontWeight: '500',
    color: '#34C759', 
  },
  cardDate: {
    fontSize: 14,
    color: '#aaa',
  },
});