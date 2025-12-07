import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  const Button = ({ title, color, onPress, href }) => {
    const scale = useRef(new Animated.Value(1)).current;
    console.log("COLOR", color);
    const animateIn = () =>
      Animated.spring(scale, {
        toValue: 0.96,
        useNativeDriver: true,
      }).start();

    const animateOut = () =>
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();

    const content = (
      <Animated.View
        style={[
          styles.button,
          { backgroundColor: color, transform: [{ scale }], shadowColor: color },
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    );

    if (href) {
      return (
        <Link href={href} asChild>
          <TouchableWithoutFeedback onPressIn={animateIn} onPressOut={animateOut}>
            {content}
          </TouchableWithoutFeedback>
        </Link>
      );
    }

    return (
      <TouchableWithoutFeedback
        onPressIn={animateIn}
        onPressOut={animateOut}
        onPress={onPress}
      >
        {content}
      </TouchableWithoutFeedback>
    );
  };

  return (
    <LinearGradient
      colors={["#0f0f0f", "#181818", "#111"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Color Picker</Text>
        <Text style={styles.subtitle}>Get Started Creating Your Palette Below!</Text>

        <Button
          title="Camera"
          color="#007AFF"
          onPress={() => router.push("/camera")}
        />
        <Button
          title="Color Wheel"
          color="#AF52DE"
          onPress={() => router.push("/wheel")}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 35,
    textAlign: "center",
  },
  button: {
    width: width * 0.85,
    paddingVertical: 16,
    borderRadius: 14,
    marginVertical: 8,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});