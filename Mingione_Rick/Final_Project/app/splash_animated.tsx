// app/splash.tsx
import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Extrapolation,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const logo = require('../assets/images/dob_word.webp');

interface CustomSplashProps {
  onAnimationComplete: () => void;
}

export default function CustomSplash({ onAnimationComplete }: CustomSplashProps) {
  const translateX = useSharedValue(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      translateX.value = withTiming(
        -width,
        { duration: 800 },
        () => {
          if (onAnimationComplete) {
            runOnJS(onAnimationComplete)();
          }
        }
      );
    }, 2200);

    return () => clearTimeout(timer);
  }, [translateX, onAnimationComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          translateX.value,
          [-width, 0],
          [-width, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  logo: {
    width: width * 0.85,
    maxWidth: 420,
    height: width * 0.5,
  },
});
