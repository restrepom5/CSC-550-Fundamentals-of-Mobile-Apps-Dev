import { Stack } from "expo-router";

export default function MyTripsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "My Trips" }} />
      <Stack.Screen
        name="[Trip1]"
        options={{ headerTitle: "Trip Details" }}
      />
      <Stack.Screen
        name="bookModal"
        options={{ presentation: "modal", title: "Book New Trip" }}
      />
    </Stack>
  );
}
