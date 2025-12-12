// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

// Screens
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import TripsScreen from './screens/TripsScreen';
import AddTripScreen from './screens/AddTripScreen';
import TripDetailsScreen from './screens/TripDetailsScreen';
import InspirationScreen from './screens/InspirationScreen';

/* ----------------------------------------------------
    NOTIFICATION HANDLER 
-----------------------------------------------------*/
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* -------------------------
      BOTTOM TAB NAVIGATION
--------------------------*/
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0b7fab',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <Ionicons name="home-outline" size={size} color={color} />;
            case 'Trips':
              return <Ionicons name="airplane-outline" size={size} color={color} />;
            case 'Inspiration':
              return <Ionicons name="sparkles-outline" size={size} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Inspiration" component={InspirationScreen} />
    </Tab.Navigator>
  );
}

/* -------------------------
           APP ROOT
--------------------------*/
export default function App() {
  // Request ONLY local notification permissions
  React.useEffect(() => {
    async function requestPermissions() {
      await Notifications.requestPermissionsAsync();
    }
    requestPermissions();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />

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
