import { Stack } from "expo-router";

export default function MyTripsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, 
        }}
      />

      <Stack.Screen
        name="[Trip1]"
        options={{
          headerTitle: "Trip Details",
          headerBackTitle: "", 
        }}
      />

      <Stack.Screen
        name="bookModal"
        options={{
          presentation: "modal",
          title: "Book New Trip",
          headerBackTitle: "", 
        }}
      />
    </Stack>
  );
}
