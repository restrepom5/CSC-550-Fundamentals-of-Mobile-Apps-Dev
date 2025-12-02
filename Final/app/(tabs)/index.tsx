import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AnimatedBackground from "../components/AnimatedBackground"; // Import the new component

export default function HomeScreen() {
  // All the animation logic has been moved to the AnimatedBackground component.
  // This HomeScreen component no longer re-renders every 4 seconds.
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
  subtitle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
