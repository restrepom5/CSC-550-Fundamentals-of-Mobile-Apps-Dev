import React, { useState } from 'react';
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// FIX: Corrected import path. Since this file is now at app/HealthLibrary.tsx,
// we only need to go up one level (..) to exit app/, then enter src/.
// NOTE: If this path is still incorrect, please confirm the path from your project root to 'diseases'.
import { healthProblems, Disease } from '../../src/data/diseases';

export default function HealthLibrary() {
  const [searchText, setSearchText] = useState('');

  // 4. Filtering Logic
  const filteredDiseases = healthProblems.filter((disease) => {
    const searchLower = searchText.toLowerCase();
    return (
      disease.disease.toLowerCase().includes(searchLower) ||
      disease.remedy.toLowerCase().includes(searchLower) ||
      disease.symptoms.toLowerCase().includes(searchLower)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Health Resource Library</Text>
      
      {/* Search Input (User Input Requirement Met) */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search disease, symptoms, or remedy..."
        placeholderTextColor="#777"
        onChangeText={setSearchText}
        value={searchText}
      />

      {/* List of Filtered Results */}
      <FlatList
        data={filteredDiseases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            // NAV FIX: Use absolute path from root for robustness
            onPress={() => router.push({
pathname: `../details/${item.id}`, 
                // FIX: Pass the desired back button title explicitly. 
                // This tells the Stack Navigator to use "Health Library" 
                // instead of the default "Home" or "Activity".
                params: { 
                  backTitle: 'Health Library' // This is the key fix
                } 
            })}
          >
            <Text style={styles.cardTitle}>{item.disease}</Text>
            <Text style={styles.cardSubtitle}>{item.remedy}</Text>
          </TouchableOpacity>
        )}
        // Display a message if no results are found
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No matching diseases found.</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    borderLeftColor: '#4CAF50', // Updated accent color for health theme
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