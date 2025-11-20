import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";

// This component is self-contained. It manages its own state and animations.
export default function AnimatedBackground() {
  const images = [
    require("../../assets/images/art.jpg"),
    require("../../assets/images/giphy.gif"),
    require("../../assets/images/art2.jpg"),
    require("../../assets/images/greece.jpg"),
    require("../../assets/images/venice.jpg"),
    require("../../assets/images/kyoto.jpg"),
  ];

  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % images.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <Animated.Image
      source={images[index]}
      style={[styles.backgroundImage, { opacity: fadeAnim }]}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});
