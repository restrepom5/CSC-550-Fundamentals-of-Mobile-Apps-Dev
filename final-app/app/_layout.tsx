import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

/*
Sources used:
https://docs.expo.dev/versions/latest/sdk/splash-screen/
*/

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
            name="details/[value]"
            options={{ presentation: "modal", title: "Palette" }}
            />
    </Stack>
  );
}
