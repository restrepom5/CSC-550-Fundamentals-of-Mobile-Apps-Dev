import React, { useState, useEffect } from 'react';
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';

const backgroundImage = require("../../assets/images/art.jpg");

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
        // Use Asset module for more reliable loading
        const asset = Asset.fromModule(require('../../assets/music/ashitaka.mp3'));
        await asset.downloadAsync(); // Ensure the asset is downloaded
        
        const { sound } = await Audio.Sound.createAsync(
          asset,
          { isLooping: true }
        );
        setSound(sound);
        await sound.playAsync();
      } catch (error) {
        console.error('Error loading sound', error);
      }
    };

    loadAndPlaySound();

    return () => {
      sound?.unloadAsync();
    };
  }, []);

  return (
    <TouchableOpacity onPress={toggleMute} style={{ marginRight: 15 }}>
      <FontAwesome name={isMuted ? 'volume-off' : 'volume-up'} size={24} color="#2f95dc" />
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
