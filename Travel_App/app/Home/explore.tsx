// app/Home/explore.tsx

import React, { useState } from 'react';
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. TypeScript Interface
interface Destination {
  id: number;
  name: string;
  country: string;
  tags: string;
}

// 2. Expensive Logic (Remains the same, but execution is optimized)
const calculateExpensiveValue = (name: string): string => {
  let result = 0;
  // Simulate a very heavy, synchronous calculation
  for (let i = 0; i < 5000000; i++) {
    result += Math.sqrt(i) * Math.log(i + 1);
  }
  return `(${name.length} chars)`;
};

const allDestinations: Destination[] = [
  { id: 104, name: 'Tokyo', country: 'Japan', tags: 'city, culture, food' },
  { id: 105, name: 'Rome', country: 'Italy', tags: 'history, ruins, food, city' },
  { id: 106, name: 'Patagonia', country: 'Argentina/Chile', tags: 'mountains, hiking, nature' },
  { id: 107, name: 'Phuket', country: 'Thailand', tags: 'beach, relaxation, food' },
  { id: 108, name: 'Cairo', country: 'Egypt', tags: 'history, desert, culture' },
];

// ************************************************************
// 🎯 OPTIMIZATION: Extract and Memoize the Card Component
// ************************************************************
const DestinationCard = React.memo(({ item }: { item: Destination }) => {
    // This expensive function now ONLY runs if the 'item' prop changes.
    const expensiveText = calculateExpensiveValue(item.name); 

    console.log(`Rendering/Calculating: ${item.name}`); // Optional: Check console logs to see which cards render

    return (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push({
                pathname: `../details/${item.id}`, 
                params: { backTitle: 'Discover Destinations' }
            })}
        >
            <Text style={styles.cardTitle}>{item.name}</Text>
            {/* Display the result of the expensive text */}
            <Text style={styles.cardSubtitle}>{item.country} {expensiveText}</Text>
        </TouchableOpacity>
    );
});

// ************************************************************


export default function Explore() {
  const [searchText, setSearchText] = useState('');

  const filteredDestinations = allDestinations.filter((dest) => {
    const searchLower = searchText.toLowerCase();
    return (
      dest.name.toLowerCase().includes(searchLower) ||
      dest.country.toLowerCase().includes(searchLower) ||
      dest.tags.toLowerCase().includes(searchLower)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Discover Destinations</Text>
      
      {/* Search Input (Triggers re-render of Explore) */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by city, country, or tag..."
        placeholderTextColor="#777"
        onChangeText={setSearchText}
        value={searchText}
      />

      {/* List of Filtered Results */}
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id.toString()}
        // Use the memoized component here
        renderItem={({ item }) => <DestinationCard item={item} />} 
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No destinations matched your search.</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (Your styles remain the same) ...
  container: { 
    flex: 1, 
    backgroundColor: "#1c1c1e", 
    paddingHorizontal: 20, 
    paddingTop: 10 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    marginTop: 10,
  },
  searchInput: {
    height: 44,
    backgroundColor: '#2e2e30',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#2e2e30",
    borderRadius: 10,
    padding: 15,
    marginVertical: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  cardTitle: { 
    color: "#fff", 
    fontSize: 18,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  emptyText: {
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  }
});