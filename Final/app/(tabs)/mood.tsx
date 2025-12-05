import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Link } from "expo-router";
import { useMoods } from "../contexts/MoodContext";
import { useAppTheme } from "../contexts/ThemeContext";

export default function MoodTrackerScreen() {
  const { moods } = useMoods();
  const { theme } = useAppTheme();
  const isDark = theme === 'dark';

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Dynamic styles
  const containerStyle = [styles.container, { backgroundColor: isDark ? '#121212' : '#f0f8ff' }];
  const dateTextStyle = [styles.dateText, { color: isDark ? '#fff' : '#333' }];
  const headerStyle = [styles.header, { color: isDark ? '#fff' : '#000' }];
  const moodEntryStyle = [styles.moodEntry, { backgroundColor: isDark ? '#2C2C2E' : '#fff', borderColor: isDark ? '#444' : '#eee' }];
  const moodTextStyle = [styles.moodText, { color: isDark ? '#fff' : '#000' }];
  const noteTextStyle = [styles.noteText, { color: isDark ? '#ccc' : '#555' }];
  const emptyTextStyle = [styles.emptyText, { color: isDark ? '#888' : '#888' }];

  return (
    <View style={containerStyle}>
      <Text style={dateTextStyle}>{today}</Text>
      <Text style={headerStyle}>Your Recent Movies Wishlist</Text>

      <FlatList
        data={moods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={moodEntryStyle}>
            <Text style={moodTextStyle}>{item.mood}</Text>
            <Text style={noteTextStyle}>{item.note}</Text>
            <Text style={styles.entryDate}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={() => <Text style={emptyTextStyle}>No Movies saved yet.</Text>}
      />

      <Link href="/add-mood" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Current Movies Wishlist</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  moodEntry: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  moodText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noteText: {
    fontSize: 14,
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
