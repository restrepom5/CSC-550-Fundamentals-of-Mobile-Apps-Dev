import { Stack } from "expo-router";
import { MoodProvider } from "./contexts/MoodContext";

export default function RootLayout() {
  return (
    <MoodProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="add-mood" options={{ presentation: "modal", title: "Add Mood" }} />
        <Stack.Screen name="contact" options={{ presentation: "modal", title: "Contact" }} />
      </Stack>
    </MoodProvider>
  );
}
