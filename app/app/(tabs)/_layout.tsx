//app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";
import { Text } from "react-native";
import { TabBarIcon } from "../../src/ui/icons";   
import { Palette } from "../../src/ui/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Palette.accent,
        tabBarInactiveTintColor: "#B9C0CA",
        tabBarStyle: { backgroundColor: Palette.card, borderTopColor: "#00000022" },
        
      }}
    >
      {/* Home tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      {/* Add Mood tab */}
      <Tabs.Screen
        name="mood/add"
        options={{
          title: "Add Mood",
          tabBarIcon: ({ color }) => <TabBarIcon name="add" color={color} />,
        }}
      />

      {/* View History tab */}
      <Tabs.Screen
        name="mood/index"
        options={{
          title: "View History",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
