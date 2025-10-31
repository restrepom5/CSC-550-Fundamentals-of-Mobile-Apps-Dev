import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* keep your named routes if you want */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="destination/[id]" options={{ title: 'Destination Details' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Filters' }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}

