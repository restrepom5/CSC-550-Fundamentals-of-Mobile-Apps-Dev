// lib/expenses.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense } from "../types/expense";

const STORAGE_KEY = "budgetowt:expenses";

export async function loadExpenses(): Promise<Expense[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    const parsed = JSON.parse(json);

    // Light type safety: make sure it's an array
    if (!Array.isArray(parsed)) return [];
    return parsed as Expense[];
  } catch (error) {
    console.warn("Failed to load expenses", error);
    return [];
  }
}

export async function saveExpenses(expenses: Expense[]): Promise<void> {
  try {
    const json = JSON.stringify(expenses);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.warn("Failed to save expenses", error);
  }
}

// Optional helper: add a single expense and return updated list
export async function addExpense(expense: Expense): Promise<Expense[]> {
  const existing = await loadExpenses();
  const updated = [expense, ...existing];
  await saveExpenses(updated);
  return updated;
}

// Tiny helper for generating ids without extra libraries
export function createExpenseId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// clear all expenses (used by Settings "Clear All Expenses")
export async function clearExpenses(): Promise<void> {
  try {
    // Easiest: just overwrite with an empty array
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (error) {
    console.warn("Failed to clear expenses", error);
  }
}
