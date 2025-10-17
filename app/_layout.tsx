// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { ThemeProvider, useTheme } from "../theme/ThemeProvider";

function ThemedStack() {
  const { colors, colorScheme } = useTheme();

  return (
    <>
      <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "About" }} />
        {/* IMPORTANT: match the file path exactly */}
        <Stack.Screen name="destination/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}
