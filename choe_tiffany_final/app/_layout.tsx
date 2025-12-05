import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect } from 'react';
import { AppProvider, useApp } from '@/src/context/provider';

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const colorScheme = useColorScheme();
  const { isLoading } = useApp();

  useEffect(() => {
    const prepare = async () => {
      if (isLoading) return;
      await SplashScreen.hideAsync();
    };

    prepare();
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}
