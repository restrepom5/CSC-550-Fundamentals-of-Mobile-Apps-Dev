import { View, Text, Button, FlatList } from "react-native";
import { router } from "expo-router";
import { useMood } from "../../lib/data/mood";

export default function MoodTab() {
  const { moods } = useMood();
  const today = new Date().toLocaleDateString();

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Mood Tracker</Text>
      <Text style={{ color: "#666" }}>Today: {today}</Text>

      <Button title="Add current mood" onPress={() => router.push("/mood/add")} />

      <Text style={{ marginTop: 16, fontWeight: "700" }}>Previous moods</Text>
       <FlatList
        data={moods}
        keyExtractor={(m) => m.id}
        ListEmptyComponent={<Text style={{ color: "#666", marginTop: 8 }}>No moods yet—add one!</Text>}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text style={{ fontWeight: "600" }}>{item.mood}</Text>
            <Text style={{ color: "#666" }}>{new Date(item.dateISO).toLocaleString()}</Text>
            {item.note ? <Text style={{ marginTop: 4 }}>Note: {item.note}</Text> : null}
          </View>
           )}
      />
    </View>
  );
}