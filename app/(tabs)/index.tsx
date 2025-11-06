import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useMoods } from "../context/MoodContext";
import { palette } from "../theme/colors";

const moodEmoji: Record<string, string> = {
  Happy: "😄",
  Sad: "😢",
  Stressed: "😣",
  Relaxed: "😌",
  Calm: "🙂",
  Tired: "🥱",
};

export default function Home() {
  const router = useRouter();
  const { moods } = useMoods();
  const todayStr = new Date().toLocaleDateString();

  const last7 = useMemo(() => {
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return moods.filter((m) => now - new Date(m.dateISO).getTime() <= sevenDays);
  }, [moods]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    last7.forEach((m) => (c[m.mood] = (c[m.mood] || 0) + 1));
    return c;
  }, [last7]);

  const mostCommon =
    Object.keys(counts).sort((a, b) => (counts[b] || 0) - (counts[a] || 0))[0] ?? null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.hi}>Hi 👋</Text>
        <Text style={styles.date}>Today • {todayStr}</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.row}>
        <Card
          title="Add Mood"
          subtitle="Log how you feel"
          icon="add-circle-outline"
          onPress={() => router.push("/(tabs)/mood/add")}
          accent={palette.primary}
        />
        <Card
          title="Mood List"
          subtitle="See your history"
          icon="list-outline"
          onPress={() => router.push("/(tabs)/mood")}
          accent={palette.secondary}
        />
      </View>

      {/* Weekly Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Last 7 days</Text>
        {last7.length === 0 ? (
          <Text style={styles.muted}>No entries yet. Start by adding today’s mood.</Text>
        ) : (
          <>
            <View style={styles.badgeRow}>
              {Object.keys(counts).map((mood) => (
                <View key={mood} style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {moodEmoji[mood] ?? "🙂"} {mood} • {counts[mood]}
                  </Text>
                </View>
              ))}
            </View>
            {mostCommon && (
              <View style={styles.highlight}>
                <Text style={styles.highlightText}>
                  Your most frequent mood this week: {moodEmoji[mostCommon] ?? "🙂"} {mostCommon}
                </Text>
              </View>
            )}
          </>
        )}
      </View>

      {/* Recent entries */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent</Text>
        {moods.slice(0, 5).map((m) => (
          <View key={m.id} style={styles.item}>
            <Text style={styles.itemTitle}>
              {moodEmoji[m.mood] ?? "🙂"} {m.mood}
            </Text>
            <Text style={styles.itemSub}>{new Date(m.dateISO).toLocaleString()}</Text>
            {m.note ? <Text style={styles.itemNote}>“{m.note}”</Text> : null}
          </View>
        ))}
        {moods.length > 5 ? (
          <Pressable onPress={() => router.push("/(tabs)/mood")} style={styles.linkBtn}>
            <Text style={styles.linkText}>See all</Text>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
}

function Card({
  title,
  subtitle,
  icon,
  onPress,
  accent,
}: {
  title: string;
  subtitle: string;
  icon: any;
  onPress: () => void;
  accent: string;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.card, { borderColor: accent }]}>
      <Ionicons name={icon} size={28} color={accent} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>{subtitle}</Text>
    </Pressable>
  );
}

// replace your styles object
const styles = StyleSheet.create({
  container: { padding: 16, gap: 20, backgroundColor: palette.bg, flexGrow: 1 },
  header: { gap: 6 },
  hi: { fontSize: 26, fontWeight: "800", color: palette.text },
  date: { color: palette.subtext },
  row: { flexDirection: "row", gap: 12 },
  card: {
    flex: 1,
    padding: 16,
    borderWidth: 1.5,
    borderRadius: 16,
    backgroundColor: palette.card,
    gap: 8,
    borderColor: palette.border,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: palette.text },
  cardSub: { color: palette.subtext },
  section: { gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: palette.text },
  muted: { color: palette.subtext },
  badgeRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: palette.primarySoft,
  },
  badgeText: { color: palette.text, fontWeight: "700" },
  highlight: { marginTop: 8, padding: 12, borderRadius: 12, backgroundColor: "#ecfeff" },
  highlightText: { color: "#0e7490", fontWeight: "700" },
  item: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: palette.border, gap: 4 },
  itemTitle: { fontSize: 16, fontWeight: "700", color: palette.text },
  itemSub: { color: palette.subtext },
  itemNote: { color: palette.text },
  linkBtn: { paddingVertical: 10 },
  linkText: { color: palette.primary, fontWeight: "800" },
});
