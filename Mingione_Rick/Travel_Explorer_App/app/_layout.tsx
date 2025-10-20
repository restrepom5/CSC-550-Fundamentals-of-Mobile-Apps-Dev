import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
  modalPresentation: true, // Allows modal transitions
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(modals)" options={{ presentation: 'modal', headerShown: false }} /> */}
        <Stack.Screen
          name="(modals)/destination/[id]"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
        <Stack.Screen name="(modals)/destination/[id]/details" options={{ presentation: 'modal', headerShown: false,}} />
        <Stack.Screen name="(modals)/destination/[id]/pushed" options={{ presentation: 'modal', headerShown: false,}} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}