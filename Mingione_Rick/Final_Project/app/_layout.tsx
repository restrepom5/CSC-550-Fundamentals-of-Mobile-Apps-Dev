// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import CustomSplash from './splash_animated';
import { useEffect, useState } from 'react';
import { View } from 'react-native';


import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashReady, setIsSplashReady] = useState(false);

  // This runs once when the main app is mounted
  useEffect(() => {
    // Keep the native splash screen visible until we're ready
    SplashScreen.preventAutoHideAsync();
    // As soon as the main layout mounts → we know the real UI is ready underneath
    setIsSplashReady(true);
  }, []);

//   const handleAnimationComplete = async () => {
//     await SplashScreen.hideAsync();
//   };

  const handleAnimationComplete = () => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 0);
  };


  return (
    <View style={{ flex: 1 }}>
      {/* ←── Main app renders immediately (no waiting) */}
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="search-modal" options={{ presentation: "modal", headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
        {/* ←── Splash sits on top until animation finishes */}
        {isSplashReady && (
          <CustomSplash onAnimationComplete={handleAnimationComplete} />
        )}
    </View>
  );
}
