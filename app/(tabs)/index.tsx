import { LinearGradient } from "expo-linear-gradient";
import { Href, Link, useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  type ButtonProps = {
    title: string;
    color?: string;
    onPress?: () => void;
    href?: Href;
  };

  const Button = ({ title, color, onPress, href }: ButtonProps) => {
    const scale = useRef(new Animated.Value(1)).current;

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
    <LinearGradient colors={["#0f0f0f", "#181818", "#111"]} style={styles.gradient}>
      <ImageBackground source={require("../../assets/images/playa.jpg")} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Find Breath Taking Places</Text>

          
          <View style={styles.buttonGroup}>
            
            <Button
              title="Visit our Gallery"
              color="#FF9500"
              onPress={() => router.push("/gallery/destinations")}
            />
            <Button title="Packages Price Specials" color="#FF9500" href="/vacation" />
            <Button
              title=" Book Your Trip"
              color="#FF9500"
              onPress={() => router.push("/reservation")}
            />
          </View>

         
          <TouchableOpacity
            onPress={() =>
              router.push({ pathname: "/details/[subscription]", params: { subscription: "99" } })
            }
            style={styles.bottomLinkWrapper}
          >
            <Text style={styles.bottomLinkText}>
              Subscribe To our News Letter
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  title: {
    position: "absolute",
    top: 300,
    left: 50,
    right: 30,
    fontSize: 29,
    fontWeight: "bold",
    color: "#494805ff",
    textShadowColor: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  
  buttonGroup: {
    position: "absolute",
    top: height * 0.55, 
    alignItems: "center",
    width: "100%",
  },
//single button 
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
    color: "#1a1717ff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
     textShadowColor: "#fff",
  },

  
  bottomLinkWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  bottomLinkText: {
    fontSize: 16,
    color: "#AF52DE",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
