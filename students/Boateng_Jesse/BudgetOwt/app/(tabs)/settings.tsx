// app/(tabs)/settings.tsx
import React from "react";
import { clearExpenses } from "../../lib/expenses";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const handleClearExpenses = () => {
    Alert.alert(
      "Clear All Expenses",
      "Are you sure you want to remove all saved expenses?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearExpenses();
            Alert.alert("Cleared", "All expenses have been deleted.");
          },
        },
      ]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      "Contact Support",
      "Email: support@budgetowt.app"
    );
  };

  const handleRateApp = () => {
    Alert.alert("Rate BudgetOwt", "Thanks for using BudgetOwt! ⭐⭐⭐⭐⭐");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Settings</Text>

        {/* Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>

          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleClearExpenses}
          >
            <Text style={styles.dangerText}>Clear All Expenses</Text>
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.rowBtn} onPress={handleContactSupport}>
            <Text style={styles.rowLabel}>Contact Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowBtn} onPress={handleRateApp}>
            <Text style={styles.rowLabel}>Rate BudgetOwt</Text>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionItem}>Version 1.0.0</Text>
          <Text style={styles.sectionItem}>BudgetOwt © 2025</Text>
        </View>
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
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 16,
  },
  header: {
    fontSize: 35,
    fontWeight: "900",
    color: "#111827",
  },
  section: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#ede9fe",
    borderWidth: 1,
    borderColor: "#ddd6fe",
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  rowBtn: {
    paddingVertical: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: "#111827",
  },
  sectionItem: {
    fontSize: 13,
    color: "#4b5563",
    marginTop: 2,
  },
  dangerButton: {
    paddingVertical: 10,
  },
  dangerText: {
    fontSize: 14,
    color: "#b91c1c",
    fontWeight: "600",
  },
});
