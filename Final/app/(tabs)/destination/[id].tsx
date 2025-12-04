import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, Platform, Linking, TouchableOpacity } from "react-native";
import { useAppTheme } from "../../contexts/ThemeContext";

let MapView, Marker;
if (Platform.OS !== 'web') {
  const RnM = require('react-native-maps');
  MapView = RnM.default;
  Marker = RnM.Marker;
}

const mononokeLocation = {
  latitude: 30.3586,
  longitude: 130.5236,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

const silentVoiceLocation = {
  latitude: 35.3610,
  longitude: 136.6181,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export default function DestinationDetail() {
  const { id, name, desc } = useLocalSearchParams();
  const { theme } = useAppTheme();
  const isDark = theme === 'dark';

  // Dynamic styles for theme
  const titleStyle = [styles.title, { color: isDark ? '#fff' : '#111' }];
  const locationTextStyle = [styles.locationText, { backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)', color: isDark ? '#fff' : '#000' }];
  const descriptionStyle = [styles.description, { backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)', color: isDark ? '#fff' : '#333' }];
  const linkTextStyle = [styles.linkText, { color: isDark ? '#589afc' : '#007bff' }];

  let imageSource;
  let location = "";

  if (id === "1" || id === "3") {
    location = "Japan";
  }

  switch (id) {
    case "1":
      imageSource = require("../../../assets/images/fmab.jpg");
      location = "Amestris";
      break;
    case "2":
      imageSource = require("../../../assets/images/mononoke.jpg");
      break;
    case "3":
      imageSource = require("../../../assets/images/theboy2.jpg");
      location = "United Kingdom";
      break;
    case "4":
      imageSource = require("../../../assets/images/silent-voice.webp");
      break;
    default:
      imageSource = require("../../../assets/images/perfectblue.jpg");
      break;
  }

  const renderMapOrLink = () => {
    if (Platform.OS !== 'web') {
      if (id === '2') {
        return (
          <View style={styles.mapContainer}>
            <Text style={locationTextStyle}>Inspiration: Yakushima Island</Text>
            <MapView style={styles.map} initialRegion={mononokeLocation}>
              <Marker coordinate={mononokeLocation} title={"Yakushima Forest"} />
            </MapView>
          </View>
        );
      } else if (id === '4') {
        return (
          <View style={styles.mapContainer}>
            <Text style={locationTextStyle}>Location: Ōgaki, Japan</Text>
            <MapView style={styles.map} initialRegion={silentVoiceLocation}>
              <Marker coordinate={silentVoiceLocation} title={"Ōgaki"} />
            </MapView>
          </View>
        );
      }
    } else {
      if (id === '2') {
        return <TouchableOpacity onPress={() => Linking.openURL('https://maps.app.goo.gl/i9juLLBx8QYpHwz26')}><Text style={linkTextStyle}>View on Google Maps</Text></TouchableOpacity>;
      } else if (id === '4') {
        return <TouchableOpacity onPress={() => Linking.openURL('https://maps.app.goo.gl/kG7bzHTtYzxaJtnv5')}><Text style={linkTextStyle}>View on Google Maps</Text></TouchableOpacity>;
      }
    }

    return location ? <Text style={locationTextStyle}>Origin: {location}</Text> : null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: `${name}` }} />

      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <Text style={titleStyle}>{name}</Text>

      {renderMapOrLink()}

      <Text style={descriptionStyle}>{desc}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50, 
    alignItems: "center",
    backgroundColor: "transparent",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
  },
  mapContainer: {
    alignItems: 'center',
  },
  map: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
  linkText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 10,
  }
});
