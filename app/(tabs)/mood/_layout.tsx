import { Stack } from 'expo-router';
import React from 'react';

export default function MoodLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Your Moods' }} />
      <Stack.Screen name="add" options={{ title: 'Add Mood' }} />
    </Stack>
  );
}
