import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from "@expo/vector-icons";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#007AFF",
          }}
        >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }} />
            <Tabs.Screen
              name="mood"
              options={{
                title: "Mood Tracker",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="happy" color={color} size={size} />
                ),
              }} />
          </Tabs>
  );
}
