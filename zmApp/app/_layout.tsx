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
  taps: number;
  setTaps: React.Dispatch<React.SetStateAction<number>>;
  upgradesBought: number;
  setUpgradesBought: React.Dispatch<React.SetStateAction<number>>;
  increment: number;
  setIncrement: React.Dispatch<React.SetStateAction<number>>;
  upgrade1: number;
  setUpgrade1: React.Dispatch<React.SetStateAction<number>>;
  upgrade2: number;
  setUpgrade2: React.Dispatch<React.SetStateAction<number>>;
  upgrade3: number;
  setUpgrade3: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [score, setScore] = useState(0);
  const [taps, setTaps] = useState(0);
  const [upgradesBought, setUpgradesBought] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [upgrade1, setUpgrade1] = useState(10);
  const [upgrade2, setUpgrade2] = useState(150);
  const [upgrade3, setUpgrade3] = useState(1000);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GameContext.Provider value={{ score, setScore, taps, setTaps, upgradesBought, setUpgradesBought, increment, setIncrement, upgrade1, setUpgrade1, upgrade2, setUpgrade2, upgrade3, setUpgrade3 }}>
      <Stack>
        <Stack.Screen name="splashScreen" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
      </GameContext.Provider>
    </ThemeProvider>
  );
}
