import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  const images = [
    require("../../assets/images/art.jpg"),
    require("../../assets/images/giphy.gif"),
    require("../../assets/images/art2.jpg"),
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
    <View style={styles.container}>
      <Animated.Image
        source={images[index]}
        style={[styles.backgroundImage, { opacity: fadeAnim }]}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/images/shaf.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Mashrakey Shafqat</Text>
        <Text style={styles.bio}>
          Travel enthusiast and developer, exploring the world one line of code at a time.
        </Text>

        <Link href="/contact" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Contact Me</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
