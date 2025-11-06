import { Ionicons } from "@expo/vector-icons";
import { Tabs, Stack } from "expo-router";
import { createStackNavigator } from '@react-navigation/stack';
import {
  createStaticNavigation,
  useNavigation,
  StackActions,
} from '@react-navigation/native';

/*
Used the following for help:
https://www.xjavascript.com/blog/flatlist-renderitem-typescript/
https://reactnative.dev/docs/textinput
https://reactnative.dev/docs/flatlist#required-renderitem
https://docs.expo.dev/router/advanced/modals/
https://xebia.com/blog/generic-listitem-in-react-native-using-typescript/
*/



export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#111", borderTopColor: "#222" },
        tabBarActiveTintColor: "#DAD7CD",
        tabBarInactiveTintColor: "#575240",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: "Mood Tracker",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="happy" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person-circle-outline" color={color} size={size} />
                ),
              }}
            />
    </Tabs>
  );
}