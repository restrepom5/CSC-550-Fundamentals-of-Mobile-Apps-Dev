// app/Home/explore.tsx

import React, { useState } from 'react';
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from "react-native";

// 1. TypeScript Interface for Destination Data
interface Destination {
  id: number;
  name: string;
  country: string;
  tags: string;
}

const allDestinations: Destination[] = [
  { id: 104, name: 'Tokyo', country: 'Japan', tags: 'city, culture, food' },
  { id: 105, name: 'Rome', country: 'Italy', tags: 'history, ruins, food, city' },
  { id: 106, name: 'Patagonia', country: 'Argentina/Chile', tags: 'mountains, hiking, nature' },
  { id: 107, name: 'Phuket', country: 'Thailand', tags: 'beach, relaxation, food' },
  { id: 108, name: 'Cairo', country: 'Egypt', tags: 'history, desert, culture' },
];

export default function Explore() {
  // 3. Search State
  const [searchText, setSearchText] = useState('');

  // 4. Filtering Logic
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
      
      {/* Search Input */}
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
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            // *** CRITICAL CHANGE: Pass the desired backTitle as a query parameter ***
            onPress={() => router.push({
                pathname: `../details/${item.id}`, 
                params: { backTitle: 'Discover Destinations' } // <-- Sets the custom text
            })}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.country}</Text>
          </TouchableOpacity>
        )}
        // Display a message if no results are found
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No destinations matched your search.</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#1c1c1e", // Dark background
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
    borderLeftColor: '#007AFF', // Blue accent for discoverability
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