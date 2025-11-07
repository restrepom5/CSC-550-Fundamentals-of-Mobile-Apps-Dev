import { StyleSheet, FlatList } from "react-native";
import { Text, View } from "@/components/Themed";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddMoodScreen() {
  const moods = useSelector((state: RootState) => state.mood.moods);
  const router = useRouter();
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood History</Text>

      {moods.length === 0 ? (
        <Text>No moods logged yet.</Text>
      ) : (
        <FlatList
          data={moods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.moodItem}>
              <Text>{item.date}</Text>
              <Text>Mood: {item.mood}</Text>
              {item.note ? <Text>Note: {item.note}</Text> : null}
            </View>
          )}
        />
      )}
    <View>
          <Button
          title='Log current mood'
          onPress={() => router.push("/mood")}
          />
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  moodItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
});
