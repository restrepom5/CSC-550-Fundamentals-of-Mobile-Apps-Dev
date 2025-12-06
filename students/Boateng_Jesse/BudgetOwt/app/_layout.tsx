// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  // Root stack, let expo-router auto-detect routes and groups
  return <Stack screenOptions={{ headerShown: false }} />;
}
