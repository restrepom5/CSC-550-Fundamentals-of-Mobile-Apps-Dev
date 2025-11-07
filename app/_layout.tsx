import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';

// using a proviver to connect redux to react
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: true }} />
    </Provider>
  );
}

