import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { palette } from "../theme/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: palette.card,
          borderTopColor: palette.border,
        },
        tabBarIcon: ({ color, size }) => {
          const name =
            route.name === "index" ? "home-outline" :
            route.name === "mood"  ? "happy-outline" : "ellipse-outline";
          return <Ionicons name={name as any} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="mood" options={{ title: "Mood" }} />
    </Tabs>
  );
}
