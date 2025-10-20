import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Pressable } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

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
          headerLeft: () =>
            router.canGoBack() ? (
              <Pressable onPress={() => router.back()}>
              <IconSymbol
                name="chevron.left"
                size={22}
                color="black"
              />
              </Pressable>
            ) : null,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
