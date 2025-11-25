import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen'; // Keep this import for the hide call
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Provider } from 'react-redux'; 
import { store } from '../../src/store/store'; // Correct path to your store implementation

// Keep this line. Even if it doesn't prevent flicker fully, it's best practice.
SplashScreen.preventAutoHideAsync();

// Custom Splash Screen Component
const CustomSplashScreen = () => (
  <View style={splashStyles.container}>
    <FontAwesome5 name="heartbeat" size={80} color="#4CAF50" style={splashStyles.icon} />
    <Text style={splashStyles.title}>Health Monitor</Text>
    <Text style={splashStyles.subtitle}>Loading Resources...</Text>
  </View>
);

// Main Root Layout Component
export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // 1. Simulate loading time (e.g., fetching data, initializing state)
        await new Promise(resolve => setTimeout(resolve, 3000)); 
      } catch (e) {
        console.warn("Error during app preparation:", e);
      } finally {
        // 2. Hide the native splash screen (this is a safe call)
        await SplashScreen.hideAsync();
        
        // 3. Set the state to ready, switching from CustomSplashScreen to Stack Navigator
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    // While loading (for 3 seconds), display the custom splash screen component.
    return <CustomSplashScreen />;
  }

  // Once loading is complete, render the main app structure
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Stack 
          screenOptions={{ 
            headerShown: false, // Default to hidden
            contentStyle: { backgroundColor: '#1c1c1e' }
          }}
        >
          
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          <Stack.Screen 
            name="details/[id]" 
            options={{ 
              headerShown: true, // Show header for detail screens
              headerTitle: "Remedy Details", 
              headerStyle: headerStyles.header,
              headerTintColor: '#4CAF50',
            }} 
          />
          <Stack.Screen name="addMood" options={{ headerShown: true }} /> 
          <Stack.Screen name="index" options={{ headerShown: false }} />

        </Stack>
      </View>
    </Provider>
  );
}

const headerStyles = StyleSheet.create({
    header: {
        backgroundColor: '#1c1c1e', // Dark background for the header
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
    }
});

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Critical: Dark background for the custom component
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
  },
});