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
        name="reservation"
        options={{ title: "Reservations", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="details/[subscription]"
        options={{ title: "Subscription", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="vacation"
        options={{ title: "Vacations Packages", animation: "slide_from_left" }}

      />
      <Stack.Screen
        name="gallery/[gallery]"
        options={{ title: "Destinations Gallery", animation: "slide_from_right" }}

      />

    </Stack>
  );
}
