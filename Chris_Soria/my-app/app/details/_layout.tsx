import { Stack } from "expo-router";

export default function DetailsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]" />
      <Stack.Screen name="pushed" options={{ presentation: "card" }} />
      <Stack.Screen name="modal"  options={{ presentation: "modal" }} />
    </Stack>
  );
}
