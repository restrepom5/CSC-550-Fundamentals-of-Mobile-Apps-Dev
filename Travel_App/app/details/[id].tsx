// app/details/[id].tsx

import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useLayoutEffect } from "react"; // <-- New Import

// Enriched Trip Data
const destinations = [
  // --- Data from Home Screen (IDs 101-103) ---
  { id: 101, title: 'Africa Safari', date: 'Oct 2025', status: 'Upcoming', description: 'Explore the great plains and diverse wildlife of Africa.' },
  { 
    id: 102, 
    title: 'Budapest Hungary', 
    date: 'Jul 2025', 
    status: 'Completed', 
    description: 'A trip focused on cultural immersion and community service with the Kihm family. Site-seeing included the Danube and Buda Castle.', 
    mission_family: 'Daniel, Christy, and Sofie Kihm',
    mission_focus: 'CHOG Community Outreach' 
  },
  { id: 103, title: 'Sri Lanka Getaway', date: 'Dec 2025', status: 'Booked', description: 'Relaxing beaches and ancient temples in the Indian Ocean.' },

  // --- Data from Discover Screen (IDs 104-108) ---
  { id: 104, title: 'Tokyo', date: 'Oct 2026', status: 'Planned', description: 'A city of contrasts: neon skyscrapers and ancient temples. Focus on culture and food.' },
  { id: 105, title: 'Rome', country: 'Italy', date: 'May 2026', status: 'Planned', description: 'The Eternal City. History, ancient ruins, and incredible Italian cuisine.' },
  { id: 106, title: 'Patagonia', country: 'Argentina/Chile', date: 'Jan 2027', status: 'Dreaming', description: 'Trekking through vast, stunning landscapes, glaciers, and mountains.' },
  { id: 107, title: 'Phuket', country: 'Thailand', date: 'Apr 2026', status: 'Planned', description: 'Tropical beaches, beautiful islands, and the warm waters of the Andaman Sea.' },
  { id: 108, title: 'Cairo', country: 'Egypt', date: 'Nov 2026', status: 'Dreaming', description: 'Witness the Great Pyramids and explore the rich history of the Nile River Valley.' },
];

export default function Details() {
  const { id, backTitle } = useLocalSearchParams<{ id: string, backTitle: string }>();
  const router = useRouter();
  const navigation = useNavigation();

  const resolvedBackTitle = Array.isArray(backTitle) ? backTitle[0] : backTitle;

  // Find the matching destination (MUST be after the destinations array)
  const foundDestination = destinations.find(
    (d) => d.id.toString() === id
  );

    // *** NEW: Hook to set the back button text dynamically ***
  useLayoutEffect(() => {
    if (resolvedBackTitle) {
      navigation.setOptions({
        headerBackTitle: resolvedBackTitle,
        headerTitle: foundDestination?.title || "Details",
      });
    }
  }, [navigation, resolvedBackTitle, foundDestination?.title]);
  // ********************************************************

  // 1. ERROR RETURN: Executed if the ID is invalid (fixes the syntax error)
  if (!foundDestination) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.title}>Trip Not Found!</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>⬅ Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 2. SUCCESS RETURN: Executed when the trip is found
  return (
    <ScrollView style={styles.scrollViewContainer}>
      
      <View style={styles.contentPadding}>
        <Text style={styles.title}>{foundDestination.title}</Text>
        <Text style={styles.dateText}>{foundDestination.date} ({foundDestination.status})</Text>

        {/* Conditional Tribute to the Kihm Family */}
        {foundDestination.mission_family && (
          <View style={styles.tributeBox}>
            <Text style={styles.tributeHeader}>Mission Focus</Text>
            <Text style={styles.tributeText}>Dedicated to the work of {foundDestination.mission_family}.</Text>
            <Text style={styles.tributeSmallText}>{foundDestination.mission_focus}</Text>
          </View>
        )}

        <Text style={styles.descriptionHeader}>Trip Overview</Text>
        <Text style={styles.descriptionText}>{foundDestination.description}</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>⬅ Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#1c1c1e",
  },
  contentPadding: {
    padding: 20,
    paddingTop: 60, // Ensure content is below the status bar
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dateText: { 
    color: "#aaa", 
    fontSize: 16, 
    marginBottom: 20 
  },
  descriptionHeader: {
    color: "#fff",
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  descriptionText: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  tributeBox: {
    backgroundColor: '#2e2e30',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  tributeHeader: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  tributeText: {
    color: '#fff',
    fontSize: 16,
  },
  tributeSmallText: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },

  errorContainer: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',    // Centers horizontally
    padding: 20,
},
});