// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import TripsScreen from './screens/TripsScreen';
import AddTripScreen from './screens/AddTripScreen';
import TripDetailsScreen from './screens/TripDetailsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tabs: Home, Trips, Settings
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Custom Splash Screen */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        {/* Main app with tabs */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        {/* Extra stack screens */}
        <Stack.Screen
          name="AddTrip"
          component={AddTripScreen}
          options={{ title: 'Add New Trip' }}
        />

        <Stack.Screen
          name="TripDetails"
          component={TripDetailsScreen}
          options={{ title: 'Trip Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
