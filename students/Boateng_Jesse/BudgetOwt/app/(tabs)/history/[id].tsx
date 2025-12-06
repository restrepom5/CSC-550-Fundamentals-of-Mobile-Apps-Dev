// app/(tabs)/history/[id].tsx
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { loadExpenses } from "../../../lib/expenses";
import type { Expense } from "../../../types/expense";

export default function ExpenseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [expense, setExpense] = useState<Expense | null>(null);

  useEffect(() => {
    async function fetchExpense() {
      const data = await loadExpenses();
      const found = data.find((e) => e.id === id);
      setExpense(found ?? null);
    }

    fetchExpense();
  }, [id]);

  if (!expense) {
    return (
      <View style={styles.container}>
        <Text>Expense not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Detail</Text>

      <Text style={styles.label}>Amount</Text>
      <Text style={styles.value}>${expense.amount.toFixed(2)}</Text>

      <Text style={styles.label}>Category</Text>
      <Text style={styles.value}>{expense.category}</Text>

      <Text style={styles.label}>Date</Text>
      <Text style={styles.value}>
        {new Date(expense.date).toLocaleString()}
      </Text>

      {expense.note && (
        <>
          <Text style={styles.label}>Note</Text>
          <Text style={styles.value}>{expense.note}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
});
