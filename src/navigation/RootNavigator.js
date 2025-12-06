// src/navigation/RootNavigator.js
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

import DayDetailScreen from '../screens/DayDetailScreen';
import TripSetupScreen from '../screens/Home/TripSetupScreen';
import TripSnapshotScreen from '../screens/Home/TripSnapshotScreen';
import WeekViewScreen from '../screens/Home/WeekViewScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import ParkDetailScreen from '../screens/Parks/ParkDetailScreen';
import ParkListScreen from '../screens/Parks/ParkListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TipsScreen from '../screens/TipsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ParksStack = createNativeStackNavigator();

function HomeStackNavigator() {
  const theme = useTheme();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          color: theme.colors.text,
          fontFamily: 'PoppinsSemiBold',
        },
      }}
    >
      <HomeStack.Screen
        name="TripSetup"
        component={TripSetupScreen}
        options={{ title: 'Trip Setup' }}
      />
      <HomeStack.Screen
        name="WeekView"
        component={WeekViewScreen}
        options={{ title: 'Your Trip' }}
      />
      <HomeStack.Screen
        name="DayDetail"
        component={DayDetailScreen}
        options={{ title: 'Plan Your Day' }}
      />
      <HomeStack.Screen
        name="TripSnapshot"
        component={TripSnapshotScreen}
        options={{ title: 'Trip Snapshot' }}
      />
    </HomeStack.Navigator>
  );
}

function ParksStackNavigator() {
  const theme = useTheme();

  return (
    <ParksStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          color: theme.colors.text,
          fontFamily: 'PoppinsSemiBold',
        },
      }}
    >
      <ParksStack.Screen
        name="ParkList"
        component={ParkListScreen}
        options={{ title: 'Parks' }}
      />
      <ParksStack.Screen
        name="ParkDetail"
        component={ParkDetailScreen}
        options={{ title: 'Park Details' }}
      />
    </ParksStack.Navigator>
  );
}

export default function RootNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        tabBarStyle: {
          backgroundColor: theme.colors.bottomBar ?? theme.colors.surface,
          borderTopColor: 'transparent',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="MyTripsTab"
        component={MyTripsScreen}
        options={{
          title: 'My Trips',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-heart" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="ParksTab"
        component={ParksStackNavigator}
        options={{
          title: 'Parks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-marker-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="TipsTab"
        component={TipsScreen}
        options={{
          title: 'Tips',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb-on-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
