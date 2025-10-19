import "react-native-gesture-handler";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="destination/[id]" options={{ title: "Destination" }} />
      <Stack.Screen name="modal" options={{ presentation: "modal", title: "About this app" }} />
    </Stack>
  );
}