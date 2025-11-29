import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderTopWidth: 0,
          elevation: 5,
        },
        headerStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.6)",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
          color: "#222",
        },
        // This is still needed to ensure the screens are transparent
        // and the global background from the root layout is visible.
        sceneContainerStyle: {
          backgroundColor: 'transparent'
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="compass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          title: "Mood Tracker",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="smile-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="destination/[id]"
        options={{
          title: "Destination Details",
          href: null,
        }}
      />
    </Tabs>
  );
}
