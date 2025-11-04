import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Link } from "expo-router";
import { useMoods } from "../contexts/MoodContext"; // Import the hook

export default function MoodTrackerScreen() {
  const { moods } = useMoods(); // Use the hook to get the real moods
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{today}</Text>
      <Text style={styles.header}>Your Recent Moods</Text>

      <FlatList
        data={moods} // Use the real data from the context
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.moodEntry}>
            <Text style={styles.moodText}>{item.mood}</Text>
            <Text style={styles.noteText}>{item.note}</Text>
            <Text style={styles.entryDate}>{item.date}</Text>
          </View>
        )}
        // This message will show if the list is empty
        ListEmptyComponent={() => <Text style={styles.emptyText}>No moods saved yet.</Text>}
      />

      <Link href="/add-mood" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Current Mood</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

// The styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  moodEntry: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#eee",
    borderWidth: 1,
  },
  moodText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noteText: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  entryDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
    textAlign: "right",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
