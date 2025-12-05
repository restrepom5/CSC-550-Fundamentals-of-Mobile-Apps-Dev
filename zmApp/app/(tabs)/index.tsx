import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { Platform, StyleSheet, Image, Pressable, View} from 'react-native';
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
  const { score, setScore, taps, setTaps, upgradesBought, setUpgradesBought, increment, setIncrement, upgrade1, setUpgrade1, upgrade2, setUpgrade2, upgrade3, setUpgrade3 } = context;
  

  const PANEL_HEIGHT = 350;

  const translateY = useSharedValue(PANEL_HEIGHT);

  const animatedPanel = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const onPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setScore(prev => prev + increment);
    setTaps(prev => prev + 1);
  }, [increment]);
  
  const togglePanel = useCallback(() => {
    const isOpen = translateY.value === 0;
    translateY.value = withTiming(isOpen ? PANEL_HEIGHT : 0, {
      duration: 300,
    })}, []);

  useEffect(() => {
    const loadData = async () => {
      const savedScore = await AsyncStorage.getItem("score");
      const savedTaps = await AsyncStorage.getItem("taps");
      const savedIncrement = await AsyncStorage.getItem("increment");
      const savedUpgrade1 = await AsyncStorage.getItem("upgrade1");
      const savedUpgrade2 = await AsyncStorage.getItem("upgrade2");
      const savedUpgrade3 = await AsyncStorage.getItem("upgrade3");
      if (savedUpgrade1 !== null) {
        setUpgrade1(JSON.parse(savedUpgrade1));
      }
      if (savedUpgrade2 !== null) {
        setUpgrade2(JSON.parse(savedUpgrade2));
      }
      if (savedUpgrade3 !== null) {
        setUpgrade3(JSON.parse(savedUpgrade3));
      }
      if (savedIncrement !== null) {
        setIncrement(JSON.parse(savedIncrement));
      }
      if (savedScore !== null) {
        setScore(JSON.parse(savedScore));
      }
      if (savedTaps !== null) {
        setTaps(JSON.parse(savedTaps));
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("score", JSON.stringify(score));
    AsyncStorage.setItem("taps", JSON.stringify(taps));
    AsyncStorage.setItem("increment", JSON.stringify(increment));
    AsyncStorage.setItem("upgrade1", JSON.stringify(upgrade1));
    AsyncStorage.setItem("upgrade2", JSON.stringify(upgrade2));
    AsyncStorage.setItem("upgrade3", JSON.stringify(upgrade3));
  }, [score, taps, increment, upgrade1, upgrade2, upgrade3]);

  const handleUpgrade = useCallback((upgradeId: number, incrementValue: number, upgradeCost: number) => {
    if (score >= upgradeCost){
      setIncrement(increment + incrementValue);
      setScore(prev => prev - upgradeCost);
      setUpgradesBought(prev => prev + 1);
      if (upgradeId === 1) {
        setUpgrade1(upgrade1 + 10);
      }
      else if (upgradeId === 2) {
        setUpgrade2(upgrade2 + 150);
      }
      else if (upgradeId === 3) {
        setUpgrade3(upgrade3 + 1000);
      }
    }
  }, [score, increment]);

  let upgradeData = useMemo(() => [
    { id: 1, text: 'Adds 1 extra to your score each time you tap!', image: require('../../assets/images/mouse.png'), upgradeIncrement: 1, upgradeCost: upgrade1 },
    { id: 2, text: 'Adds 8 extra to your score each time you tap!', image: require('../../assets/images/ram.png'), upgradeIncrement: 8, upgradeCost: upgrade2 },
    { id: 3, text: 'Adds 104 extra to your score each time you tap!', image: require('../../assets/images/keyboard.png'), upgradeIncrement: 104, upgradeCost: upgrade3 },
  ], [upgrade1, upgrade2, upgrade3]);  
  
  return (
    <View style={ styles.container }>
      <LottieView
        source={require('../../assets/animations/Gradient Animated Background.json')}
        autoPlay
        loop
        style={styles.background}
      />
      <SafeAreaView style={styles.container}>
        
        <ThemedText style={styles.score}>Score: {score}</ThemedText>
        <Pressable onPress={onPress}>
          <Image
            source={require('../../assets/images/pc.png')}
            style={styles.clickablePc}
          />
        </Pressable>

        <Pressable style={styles.arrowButton} onPress={togglePanel}>
          <Image style={styles.arrow} source={require('../../assets/images/upArrow.png')} />
        </Pressable>

        <Animated.View style={[styles.panel, animatedPanel]}>
          <Pressable onPress={togglePanel}>
            <Image style={styles.arrow} source={require('../../assets/images/downArrow.png')} />
          </Pressable>

          {upgradeData.map(item => (
            <ThemedView key={item.id} style={ styles.bar }>
              <Image
                source={item.image}
                style={ styles.upgradeIcon }
              />
              <ThemedText style={styles.panelText}>
                {item.text}
              </ThemedText>
              <Pressable onPress={() => handleUpgrade(item.id, item.upgradeIncrement, item.upgradeCost)} style={({ pressed }) => [styles.upgradeButton, pressed && styles.buttonPressed]}>
                <ThemedText style={styles.buttonText}>{item.upgradeCost}</ThemedText>
              </Pressable>
            </ThemedView>
          ))}
          
        </Animated.View>
      </SafeAreaView>
    </View>
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
  clickablePc: {
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

  arrow: {
    alignSelf: "center",
    marginBottom: 10,
    width: 50,
    height: 50,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },

  panelText: {
    fontSize: 10,
    textAlign: "center",
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    resizeMode: "stretch",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  upgradeButton: {
    backgroundColor: "#2644deff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonPressed: {
		opacity: 0.85,
	},
  buttonText: {
    color: "white",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  upgradeIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});
