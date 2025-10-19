// app/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { Pressable, StatusBar, Text } from "react-native";
import { ThemeProvider, useTheme } from "../theme/ThemeProvider";

import { FavoritesProvider } from "../favorites/FavoritesProvider";

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
        {/* Tabs group */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Destination details with Back button label */}
        <Stack.Screen
          name="destination/[id]"
          options={{
            title: "Details",
            headerBackTitle: "Back",
            headerLeft: () => (
              <Pressable
                onPress={() => router.back()}
                style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 4, paddingVertical: 6 }}
                accessibilityRole="button"
                accessibilityLabel="Back"
              >
                <Ionicons name="chevron-back" size={22} color={colors.text} />
                <Text style={{ color: colors.text, fontSize: 16, marginLeft: 2 }}>Back</Text>
              </Pressable>
            ),
          }}
        />

        {/* Suggest form modal */}
        <Stack.Screen
          name="suggest"
          options={{ presentation: "modal", title: "Suggest a Destination" }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ThemedStack />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
