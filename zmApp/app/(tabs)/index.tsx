import React, { useState, useEffect, useContext } from 'react';
import { Platform, StyleSheet, Image, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from 'expo-haptics';
import { GameContext } from '../_layout';
import LottieView from 'lottie-react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function HomeScreen() {
  const context = useContext(GameContext);
  if (!context) return null;
  const { score, setScore } = context;
  const [taps, setTaps] = useState(0);

  const PANEL_HEIGHT = 350;

  const translateY = useSharedValue(PANEL_HEIGHT);

  const animatedPanel = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const onPress = () => {
    const increment = 1;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setScore(score + increment);
    setTaps(taps + 1)
  }

  const togglePanel = () => {
    const isOpen = translateY.value === 0;
    translateY.value = withTiming(isOpen ? PANEL_HEIGHT : 0, {
      duration: 300,
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem("score");
      if (saved !== null) {
        setScore(JSON.parse(saved));
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("score", JSON.stringify(score));
  }, [score]);
  
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require('../../assets/animations/Gradient Dots Background.json')}
        autoPlay
        loop
        style={styles.background}
      />
      <ThemedText style={styles.score}>Score: {score}</ThemedText>
      <Pressable onPress={onPress}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.reactLogo}
        />
      </Pressable>

      <Pressable style={styles.arrowButton} onPress={togglePanel}>
        <ThemedText style={styles.arrowText}>⬆️</ThemedText>
      </Pressable>

      <Animated.View style={[styles.panel, animatedPanel]}>
        <Pressable onPress={togglePanel}>
          <ThemedText style={styles.closeArrow}>⬇️</ThemedText>
        </Pressable>

        <ThemedText style={styles.panelText}>Your information goes here!</ThemedText>
      </Animated.View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  score:{
    fontSize: 24,
    marginBottom: 12,
    alignSelf: 'center',
    padding: 65,
  },
  reactLogo: {
    marginTop: 100,
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  arrowButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
  },
  arrowText: {
    fontSize: 32,
  },

  panel: {
    position: "absolute",
    bottom: 0,
    height: 350,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },

  closeArrow: {
    alignSelf: "center",
    fontSize: 32,
    marginBottom: 10,
  },

  panelText: {
    fontSize: 18,
    textAlign: "center",
  },

  background: {
    ...StyleSheet.absoluteFillObject,
  }
});
