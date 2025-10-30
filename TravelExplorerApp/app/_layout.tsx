import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: "#181818" },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="pushed"
        options={{ title: "Pushed Screen", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="details/[id]"
        options={{ presentation: "modal", title: "Modal Example" }}
      />
    </Stack>
  );
}