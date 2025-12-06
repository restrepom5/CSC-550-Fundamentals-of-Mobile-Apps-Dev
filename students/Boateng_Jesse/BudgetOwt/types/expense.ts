// types/expense.ts

export type Expense = {
  id: string;
  amount: number;
  category: string;
  note?: string;
  date: string; // ISO string, e.g. "2025-11-26T15:30:00.000Z"
};
