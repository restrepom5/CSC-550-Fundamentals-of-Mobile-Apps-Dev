import { Stack } from "expo-router";
import { MoodProvider } from "./contexts/MoodContext";
import { AppThemeProvider } from "./contexts/ThemeContext";

export default function RootLayout() {
  return (
    // By wrapping the app in the theme provider, we make the theme state available everywhere.
    <AppThemeProvider>
      <MoodProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="add-mood" options={{ presentation: "modal", title: "Add List" }} />
          <Stack.Screen name="contact" options={{ presentation: "modal", title: "Contact" }} />
        </Stack>
      </MoodProvider>
    </AppThemeProvider>
  );
}
