import { Stack } from "expo-router";
import { store } from "../src/store/store";
import React from "react";
import { Provider } from "react-redux";

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
      <Stack.Screen name="Home" options={{ headerShown: false, headerTitle: ' ' }} />
      <Stack.Screen
        name="pushed"
        options={{ title: "Pushed Screen", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="details/[id]"
        options={{ title: "Details", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal Example" }}
      />
    </Stack>
    </Provider>
  );
}
