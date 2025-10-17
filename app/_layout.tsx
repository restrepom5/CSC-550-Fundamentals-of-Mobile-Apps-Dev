// app/_layout.tsx
import { Stack, Tabs } from "expo-router";
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
        <Stack.Screen name="destination" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

<Tabs>
  <Tabs.Screen name="index" options={{ title: "Home" }} />
  <Tabs.Screen name="explore/index" options={{ title: "Explore" }} />
  <Tabs.Screen name="profile/index" options={{ title: "Profile" }} />
</Tabs>



export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}
