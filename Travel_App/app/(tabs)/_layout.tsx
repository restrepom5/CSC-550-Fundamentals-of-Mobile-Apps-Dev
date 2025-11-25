import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

// The Tab Layout component defines the look and structure of the tab bar.
export default function TabLayout() {
  return (
    // Use the Tabs component from expo-router
    <Tabs
      screenOptions={{
        headerShown: false, // We control headers individually or in the root stack
        tabBarActiveTintColor: '#90EE90', // Light green for active tabs
        tabBarInactiveTintColor: '#888', // Gray for inactive tabs
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      {/* Define each screen that lives inside the (tabs) folder. 
        The router finds index, MoodTracker, HealthLibrary, and Account automatically.
      */}
      
      {/* Home Tab */}
      <Tabs.Screen
        name="Home/index" // Corresponds to app/(tabs)/Home/index.tsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={20} color={color} solid />,
        }}
      />

      {/* Mood Tracker Tab */}
      <Tabs.Screen
        name="MoodTracker" // Corresponds to app/(tabs)/MoodTracker.tsx
        options={{
          title: 'Mood Tracker',
          tabBarIcon: ({ color }) => <FontAwesome5 name="list-alt" size={20} color={color} solid />,
        }}
      />

      {/* Health Library Tab */}
      <Tabs.Screen
        name="HealthLibrary" // Corresponds to app/(tabs)/HealthLibrary.tsx
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => <FontAwesome5 name="book" size={20} color={color} />,
        }}
      />

      {/* Account Tab */}
      <Tabs.Screen
        name="Account" // Corresponds to app/(tabs)/Account.tsx
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={20} color={color} />,
        }}
      />

    </Tabs>
  );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#1c1c1e', // Dark background
        borderTopWidth: 0,
        paddingTop: 5,
        height: 75,
        paddingBottom: 10,
    },
    tabBarLabel: {
        fontSize: 11,
        fontWeight: '600',
        marginBottom: 0,
    }
});