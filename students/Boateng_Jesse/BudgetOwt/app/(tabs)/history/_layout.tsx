// app/(tabs)/history/_layout.tsx
import { Stack } from "expo-router";

export default function HistoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "All Expenses" }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: "Expense Detail" }}
      />
    </Stack>
  );
}
