// app/(tabs)/history/index.tsx
import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useFocusEffect } from "expo-router";
import { loadExpenses } from "../../../lib/expenses";
import type { Expense } from "../../../types/expense";

export default function HistoryScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

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

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Total Savings</Text>

        <FlatList<Expense>
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Link href={`/history/${item.id}`} asChild>
              <TouchableOpacity style={styles.row}>
                <View>
                  <Text style={styles.amount}>
                    ${item.amount.toFixed(2)}
                  </Text>
                  <Text style={styles.category}>{item.category}</Text>
                </View>
                <Text style={styles.date}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No expenses yet. Add one on the Add tab.
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#a89aebd0", 
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 35,
    fontWeight: "900",
    marginBottom: 12,
    color: "#010309ff",
  },
  row: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffffff",
  },
  category: {
    fontSize: 14,
    color: "#000000ff", 
  },
  date: {
    fontSize: 13,
    color: "#000000ff",
  },
  separator: {
    height: 1,
    backgroundColor: "#ffffffff", 
  },
  emptyText: {
    marginTop: 16,
    color: "#ffffffff",
  },
});
