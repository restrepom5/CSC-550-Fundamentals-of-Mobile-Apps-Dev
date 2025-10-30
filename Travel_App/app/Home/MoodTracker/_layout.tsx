// app/Home/MoodTracker/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

// This creates a Stack Navigator specific to the Mood Tracker tab
export default function MoodTrackerStackLayout() {
  return (
    <Stack>
      {/* The index screen is the default landing page for the tab.
        The addMood screen is part of this stack, accessible via navigation.
      */}
      <Stack.Screen name="index" options={{ title: 'Mood Summary' }} />
      <Stack.Screen name="addMood" options={{ title: 'Add New Mood' }} />
    </Stack>
  );
}