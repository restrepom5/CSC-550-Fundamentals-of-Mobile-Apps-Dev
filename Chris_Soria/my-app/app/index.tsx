// app/index.tsx
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";

const C = {
  bg: "#F5F0E6",
  ink: "#2A2926",
  muted: "#6F6B63",
  brand: "#7C6A46",
};

export default function Index() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return (
      <View style={styles.splash}>
        <Image
          source={require("../assets/images/food.gif")} // you can later swap this to a food icon
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>BiteReview</Text>
        <Text style={styles.subtitle}>Rate My Spots 🍽️</Text>
        <ActivityIndicator style={{ marginTop: 16 }} color={C.brand} />
      </View>
    );
  }

  return <Redirect href="/tabs" />;
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: C.ink,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: C.muted,
    textAlign: "center",
    marginTop: 4,
  },
});
