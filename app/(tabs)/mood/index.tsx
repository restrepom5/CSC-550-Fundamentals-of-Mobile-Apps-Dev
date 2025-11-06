// app/(tabs)/mood/index.tsx
import { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { Screen } from "../../../src/ui/Screen";
import { useMood } from "../../../src/mood/MoodContext";
import { Card } from "../../../src/ui/card";

function parseISOAsLocal(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatPretty(dateISO: string) {
  try {
    const d = parseISOAsLocal(dateISO);
    return d.toLocaleDateString(undefined, { month: "numeric", day: "numeric", year: "numeric" });
  } catch {
    return dateISO;
  }
}

export default function HistoryScreen() {
  
  const { moods: moodEntries = [] } = useMood();

  const data = useMemo(
    () => [...moodEntries].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1)),
    [moodEntries]
  );

  return (
    <Screen title="History" subtitle="Your recent moods">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24, gap: 10 }}
        renderItem={({ item }) => (
          <Card>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#fff", fontFamily: "PoppinsSemi" }}>
                {item.mood}
              </Text>
              <Text style={{ color: "#ffffffAA", fontFamily: "Poppins" }}>
                {formatPretty(item.dateISO)}
              </Text>
            </View>
            {item.note ? (
              <Text
                style={{
                  color: "#D8DEE9",
                  fontFamily: "Poppins",
                  marginTop: 4,
                }}
              >
                {item.note}
              </Text>
            ) : null}
          </Card>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#ffffffAA", fontFamily: "Poppins", marginTop: 8 }}>
            No entries yet — add your first mood from the Home tab.
          </Text>
        }
      />
    </Screen>
  );
}
