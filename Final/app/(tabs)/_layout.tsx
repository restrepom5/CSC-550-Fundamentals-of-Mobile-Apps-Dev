import React, { useState, useEffect } from 'react';
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import { useAppTheme } from '../contexts/ThemeContext'; // Corrected Path

const backgroundImage = require("../../assets/images/art.jpg");

// --- Mute Button --- //
function MuteButton() {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isMuted, setIsMuted] = useState(false);

  async function toggleMute() {
    if (!sound) return;
    await sound.setIsMutedAsync(!isMuted);
    setIsMuted(!isMuted);
  }

  useEffect(() => {
    const loadAndPlaySound = async () => {
      try {
        const asset = Asset.fromModule(require('../../assets/music/Lapis Philosophorum.mp3'));
        await asset.downloadAsync();
        const { sound } = await Audio.Sound.createAsync(asset, { isLooping: true });
        setSound(sound);
        await sound.playAsync();
      } catch (error) {
        console.error('Error loading sound', error);
      }
    };
    loadAndPlaySound();
    return () => { sound?.unloadAsync(); };
  }, []);

  return (
    <TouchableOpacity onPress={toggleMute} style={{ padding: 10 }}>
      <FontAwesome name={isMuted ? 'volume-off' : 'volume-up'} size={24} color="#2f95dc" />
    </TouchableOpacity>
  );
}

// --- Theme Button --- //
function ThemeToggleButton() {
  const { theme, setTheme } = useAppTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ padding: 10 }}>
      <FontAwesome name={theme === 'light' ? 'moon-o' : 'sun-o'} size={24} color="#2f95dc" />
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2f95dc",
          headerStyle: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
          sceneContainerStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
            headerRight: () => <MuteButton />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="compass" color={color} />,
            headerRight: () => <ThemeToggleButton />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          }}
        />
        <Tabs.Screen
          name="mood"
          options={{
            title: "Moods",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="smile-o" color={color} />,
          }}
        />
        <Tabs.Screen name="destination/[id]" options={{ href: null }} />
      </Tabs>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
