import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import { addExpense, createExpenseId } from "../../lib/expenses";
import type { Expense } from "../../types/expense";

export default function AddExpenseScreen() {
  const params = useLocalSearchParams<{ category?: string }>();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");

  // 💡 Money mindset tip state (moved from Settings)
  const [advice, setAdvice] = useState<string | null>(null);
  const [adviceLoading, setAdviceLoading] = useState(false);
  const [adviceError, setAdviceError] = useState<string | null>(null);

  // when category is passed from Home, prefill it
  useEffect(() => {
    if (typeof params.category === "string" && params.category.length > 0) {
      setCategory(params.category);
    }
  }, [params.category]);

  async function loadAdvice() {
    try {
      setAdviceLoading(true);
      setAdviceError(null);

      const res = await fetch(
        `https://api.adviceslip.com/advice?t=${Date.now()}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch advice");
      }

      const data = await res.json();

      if (!data?.slip?.advice) {
        throw new Error("Unexpected API response");
      }

      setAdvice(data.slip.advice);
    } catch (err: any) {
      setAdviceError("Could not load tip.");
    } finally {
      setAdviceLoading(false);
    }
  }

  // load a tip when screen opens
  useEffect(() => {
    loadAdvice();
  }, []);

  async function handleSave() {
    const value = parseFloat(amount);

    if (isNaN(value) || value <= 0) {
      Alert.alert("Invalid amount", "Please enter a positive number.");
      return;
    }

    const newExpense: Expense = {
      id: createExpenseId(),
      amount: value,
      category: category.trim() || "Other",
      note: note.trim() || undefined,
      date: new Date().toISOString(),
    };

    try {
      await addExpense(newExpense);

      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );

      setAmount("");
      setNote("");
      Alert.alert("Saved", "Deposit added to your goal.");
    } catch (error) {
      console.warn(error);
      Alert.alert("Error", "Could not save.");
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Add to Goal</Text>

          {/* 💡 Money mindset tip card */}
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Money Mindset Tip</Text>

            {adviceLoading && (
              <ActivityIndicator style={{ marginTop: 8 }} />
            )}

            {adviceError && (
              <Text style={styles.tipError}>{adviceError}</Text>
            )}

            {!adviceLoading && !adviceError && advice && (
              <Text style={styles.tipText}>“{advice}”</Text>
            )}

            <TouchableOpacity style={styles.tipButton} onPress={loadAdvice}>
              <Text style={styles.tipButtonText}>New Tip</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Amount to save</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="e.g. 50.00"
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Goal (category)</Text>
          <TextInput
            value={category}
            onChangeText={setCategory}
            placeholder="Food, Rent, Utilities..."
            style={styles.input}
          />

          <Text style={styles.label}>Note (optional)</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="e.g. Paycheck savings"
            style={[styles.input, styles.textArea]}
            multiline
          />

          <View style={styles.buttonWrapper}>
            <Button title="Save to Goal" onPress={handleSave} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#a89aebd0", 
  },
  keyboard: {
    flex: 1,
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
    marginBottom: 8,
    color: "#030303ff",
  },

  
  tipCard: {
    backgroundColor: "#ede9fe",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd6fe",
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4c1d95",
  },
  tipText: {
    marginTop: 6,
    fontSize: 14,
    color: "#1f2937",
    fontStyle: "italic",
    lineHeight: 20,
  },
  tipError: {
    marginTop: 6,
    fontSize: 13,
    color: "#b91c1c",
  },
  tipButton: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#a855f7",
  },
  tipButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },

  label: {
    fontSize: 14,
    color: "#f5f5f5",
  },
  input: {
    borderWidth: 1,
    borderColor: "#283618",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  buttonWrapper: {
    marginTop: 16,
  },
});
