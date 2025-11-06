import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';
import { MoodProvider } from './context/MoodContext';
import { palette } from './theme/colors';

export const unstable_settings = { anchor: '(tabs)' };

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.primary,
    background: palette.bg,
    card: palette.card,
    text: palette.text,
    border: palette.border,
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <ThemeProvider value={theme}>
      <MoodProvider>
        {/* global background wrapper */}
        <View style={{ flex: 1, backgroundColor: palette.bg }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </View>
      </MoodProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
