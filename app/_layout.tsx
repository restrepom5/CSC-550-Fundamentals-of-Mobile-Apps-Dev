import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store";

export default function RootLayout() {
  return (
     <Provider store={store}>
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: "#181818" },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="Moods Display"
        options={{ title: "Reservations", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Add a Mood"
        options={{ title: "addmod", animation: "slide_from_right" }}
      />
      
      
    </Stack>
    </Provider>
  );
}
