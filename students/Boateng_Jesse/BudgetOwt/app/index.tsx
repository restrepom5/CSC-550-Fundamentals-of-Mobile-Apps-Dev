// app/index.tsx
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  // fade in the whole block
  const opacity = useRef(new Animated.Value(0)).current;
  // bouncing / pulsing logo
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1) fade in once
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

   
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.08,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -6,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // Splash Screen delay 
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 4400); 

    return () => clearTimeout(timer);
  }, [opacity, scale, translateY, router]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity }]}>
        <Animated.View
          style={[
            styles.logoOval,
            {
              transform: [{ scale }, { translateY }],
            },
          ]}
        >
          <Image
            source={require("../assets/images/BudgetOwt-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Text style={styles.title}>BudgetOwt</Text>
        <Text style={styles.subtitle}>Your wallet, your way.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e0b3a", 
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
  },

  // 🔵 Oval logo container
  logoOval: {
    width: 230,          
    height: 150,
    borderRadius: 75,    
    backgroundColor: "#fef3c7", 
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 3,
    borderColor: "#facc15",
    overflow: "hidden",  
  },
  logo: {
    width: 190,          
    height: 130,
  },

  title: {
    fontSize: 32,        
    fontWeight: "800",
    color: "#facc15",    
    letterSpacing: 1.2,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,        
    color: "#e5e7eb",
  },
});
