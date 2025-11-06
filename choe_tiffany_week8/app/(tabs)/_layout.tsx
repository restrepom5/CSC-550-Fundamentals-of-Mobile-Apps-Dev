import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MoodProvider } from '../mood_context';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <MoodProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mood',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="face.smiling" color={color} />,
        }}
      />
      <Tabs.Screen
        name="add_mood"
        options={{
          title: 'Add Mood',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
        }}
      />
    </Tabs>
    </MoodProvider>
  );
}
