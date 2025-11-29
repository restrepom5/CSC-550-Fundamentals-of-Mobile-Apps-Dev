import { Stack } from "expo-router";
import { MoodProvider } from "./contexts/MoodContext";
import { ImageBackground, StyleSheet } from "react-native";

const backgroundImage = require("../assets/images/art2.jpg");

export default function RootLayout() {
  return (
    <MoodProvider>
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode="cover"
      >
        <Stack
          screenOptions={{
            // This makes the screen content transparent so the background image is visible.
            contentStyle: { backgroundColor: 'transparent' },
            // This gives the headers a semi-transparent background to look good on the image.
            headerStyle: { backgroundColor: 'rgba(255, 255, 255, 0.6)' },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="add-mood" options={{ presentation: "modal", title: "Add Mood" }} />
          <Stack.Screen name="contact" options={{ presentation: "modal", title: "Contact" }} />
        </Stack>
      </ImageBackground>
    </MoodProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
