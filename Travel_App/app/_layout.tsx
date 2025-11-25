import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen'; 
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Provider } from 'react-redux'; 
import { store } from '../src/store/store'; 

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
        await new Promise(resolve => setTimeout(resolve, 3000)); 
      } catch (e) {
        console.warn("Error during app preparation:", e);
      } finally {
        await SplashScreen.hideAsync();
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
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
          
          {/* 1. The (tabs) group - All tab screens are children of this route. */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          {/* 2. Global screens (outside of tabs) */}
          <Stack.Screen 
            name="details/[id]" 
            options={{ 
              headerShown: true, 
              headerTitle: "Remedy Details", 
              headerStyle: headerStyles.header,
              headerTintColor: '#4CAF50',
            }} 
          />
          {/* 3. The Mood logging screen */}
          <Stack.Screen name="addMood" options={{ headerShown: true, headerStyle: headerStyles.header, headerTintColor: '#4CAF50' }} />
          
          {/* 4. The root index file */}
          <Stack.Screen name="index" options={{ headerShown: false }} />

        </Stack>
      </View>
    </Provider>
  );
}

const headerStyles = StyleSheet.create({
    header: {
        backgroundColor: '#1c1c1e',
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
    }
});

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
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