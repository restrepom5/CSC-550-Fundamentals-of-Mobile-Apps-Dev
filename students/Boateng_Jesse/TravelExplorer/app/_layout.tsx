import "react-native-gesture-handler";
import { Stack } from "expo-router";
import { MoodProvider } from "../lib/data/mood";

export default function RootLayout() {
  return (
    <MoodProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="destination/[id]" options={{ title: "Destination" }} />
      <Stack.Screen name="modal" options={{ presentation: "modal", title: "About this app" }} />
      {/* Mood Flow */}
      <Stack.Screen name="mood/add" options={{title: "Add Mood"}} />
    </Stack>
    </MoodProvider>
  );
}