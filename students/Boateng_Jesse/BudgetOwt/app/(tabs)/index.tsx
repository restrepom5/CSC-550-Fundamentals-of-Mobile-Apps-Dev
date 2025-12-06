// app/(tabs)/index.tsx
import { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { loadExpenses } from "../../lib/expenses";
import type { Expense } from "../../types/expense";
import { CATEGORIES } from "../../constants/categories";

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        const data = await loadExpenses();
        if (isActive) {
          setExpenses(data);
        }
      }

      fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const recent = expenses.slice(0, 5);

  const totalsByCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of expenses) {
      const key = e.category || "Other";
      map.set(key, (map.get(key) ?? 0) + e.amount);
    }
    return map;
  }, [expenses]);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>BudgetOwt</Text>
        <Text style={styles.subtitle}>Your savings goals</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total saved</Text>
          <Text style={styles.cardValue}>${total.toFixed(2)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Number of deposits</Text>
          <Text style={styles.cardValue}>{expenses.length}</Text>
        </View>

        <Text style={styles.sectionTitle}>Goal envelopes</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {CATEGORIES.map((cat) => {
            const saved = totalsByCategory.get(cat.label) ?? 0;
            const progress = cat.target > 0 ? Math.min(saved / cat.target, 1) : 0;

            return (
              <TouchableOpacity
                key={cat.key}
                style={styles.categoryChip}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/add",
                    params: { category: cat.label },
                  })
                }
              >
                <Ionicons name={cat.icon as any} size={24} />
                <Text style={styles.categoryLabel}>{cat.label}</Text>
                <Text style={styles.categoryAmount}>
                  ${saved.toFixed(2)} / ${cat.target.toFixed(0)}
                </Text>

                {/* progress bar */}
                <View style={styles.progressBarOuter}>
                  <View
                    style={[
                      styles.progressBarInner,
                      { width: `${progress * 100}%` },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recent deposits</Text>

        {recent.length === 0 ? (
          <Text>No deposits yet. Add one on the Add tab.</Text>
        ) : (
          recent.map((item) => (
            <View key={item.id} style={styles.row}>
              <View>
                <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#a89aebd0",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    gap: 12,
  },
  title: {
    fontSize: 35,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 16,
    color: "#121111ff",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#e1e685db",
    borderRadius: 12,
    padding: 16,
  },
  cardLabel: {
    fontSize: 14,
    color: "#101001ff",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  categoriesRow: {
    gap: 10,
    paddingVertical: 4,
  },
  categoryChip: {
    width: 150, // 👈 gives room for the bar
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#d9dc94ff",
  },
  categoryLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  categoryAmount: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "600",
  },
  progressBarOuter: {
    marginTop: 6,
    width: "100%",
    height: 6,
    borderRadius: 999,
    backgroundColor: "#e5e7eb",
    overflow: "hidden",
  },
  progressBarInner: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#a855f7", // purple
  },
  row: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
  categoryText: {
    fontSize: 14,
    color: "#0f6836ff",
  },
  date: {
    fontSize: 13,
    color: "#191818ff",
  },
});
