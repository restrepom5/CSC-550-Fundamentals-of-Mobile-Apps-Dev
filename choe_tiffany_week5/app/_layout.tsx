import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Back' }} />
        <Stack.Screen name="modal" options={{
          title: 'Location options',
          presentation: 'formSheet',
          sheetAllowedDetents: [0.3],
          sheetGrabberVisible: false,
        }} />
        <Stack.Screen name="details/[id]"
          options={{ 
          headerShown: true, 
          title: "Destination Details", 
          animation: "slide_from_right", 
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
