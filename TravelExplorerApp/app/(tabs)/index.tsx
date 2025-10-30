import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React, { useRef } from "react";
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Animated,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Index() {
    const router = useRouter();
    const Button = ({ title, color, onPress, href }) => {
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
        <View style={styles.container}>
            <Text style={styles.title}>DinoSearch</Text>
            <Text style={styles.text}>Welcome to DinoSearch, an app that will help you explore dinosaur museums around the USA!</Text>
            <Text style={styles.subtitle}>Click below to see a list of all the museums or click on the Explore tab below to search by state.</Text>
            <Button
            color= "#344E41"
            title=" Show Me The Dinos"
            onPress={() => router.push("/pushed")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor:"#111",
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
  text: {
    color: "#a3b18a",
    fontSize: 18,
    marginBottom: 20
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
   input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});