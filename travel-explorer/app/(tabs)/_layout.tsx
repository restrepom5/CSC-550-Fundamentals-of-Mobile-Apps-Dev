import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const backgroundImage = require("../../assets/images/art.jpg");

export default function TabLayout() {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderTopWidth: 0,
            elevation: 5,
          },
          headerStyle: {
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#222",
          },
          sceneContainerStyle: {
            backgroundColor: 'transparent'
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Welcome to Shafqat's Travel Explorer",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="compass" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="user" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="destination/[id]"
          options={{
            title: "Destination Details",
            href: null,
          }}
        />
      </Tabs>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
