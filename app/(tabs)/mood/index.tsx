// app/(tabs)/mood/index.tsx

import { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { Screen } from "../../../src/ui/Screen";
import { useMood } from "../../../src/mood/MoodContext";
import { Card } from "../../../src/ui/card";

function formatFromTs(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: "numeric", day: "numeric", year: "numeric" });
}

function formatFromISO(iso: string) {
  const [y, m, d] = iso.split("-").map((s) => Number(s));
  return `${m}/${d}/${y}`;
}

export default function HistoryScreen() {
  const { moods } = useMood();

  const data = useMemo(
    () => [...moods].sort((a, b) => (a.ts < b.ts ? 1 : -1)),
    [moods]
  );

  return (
    <Screen title="History" subtitle="Your recent moods">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24, gap: 10 }}
        renderItem={({ item }) => (
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "#fff", fontFamily: "PoppinsSemi" }}>{item.mood}</Text>
              <Text style={{ color: "#ffffffAA", fontFamily: "Poppins" }}>
                {typeof item.ts === "number" ? formatFromTs(item.ts) : formatFromISO(item.dateISO)}
              </Text>
            </View>
            {item.note ? (
              <Text style={{ color: "#D8DEE9", fontFamily: "Poppins", marginTop: 4 }}>{item.note}</Text>
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

