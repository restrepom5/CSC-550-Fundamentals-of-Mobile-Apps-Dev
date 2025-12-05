import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import AnimatedBackground from "../components/AnimatedBackground";

export default function HomeScreen() {
  const [showIntro, setShowIntro] = useState(true);
  const introAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(introAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(introAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowIntro(false);
    });
  }, []);

  if (showIntro) {
    return (
      <Animated.View style={[styles.introContainer, { opacity: introAnim }]}>
        <View style={styles.gifBox}>
          <Image source={require("../../assets/images/pika.gif")} style={styles.gif} resizeMode="contain" />
        </View>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>My Favorite Anime & Animation Collection</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  gifBox: {
    padding: 10,
    backgroundColor: '#111',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  gif: {
    width: 200,
    height: 146,
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});
