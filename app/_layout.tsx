import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

// Here are my layouts. Four tabs at the botton od the app to move between windows.


export default function TabsLayout() {
  return (
   
      <Tabs
        screenOptions={{
          headerShown: true, 
          tabBarStyle: { backgroundColor: "#111", borderTopColor: "#222" },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#777",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="favorite"
          options={{
            title: "Favorite",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bookmark-outline" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="details/[city]"
          options={{
            title: "Details",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bulb-outline" color={color} size={size} />
            ),
          }}
        />

      </Tabs>

  );
}
