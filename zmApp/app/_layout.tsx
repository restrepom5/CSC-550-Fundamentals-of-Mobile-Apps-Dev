import React, { createContext, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export const GameContext = createContext<{
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [score, setScore] = useState(0);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GameContext.Provider value={{ score, setScore }}>
      <Stack>
        <Stack.Screen name="splashScreen" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
      </GameContext.Provider>
    </ThemeProvider>
  );
}
