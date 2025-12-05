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

  const textStyle = { color: isDark ? '#fff' : '#222' };
  const linkTextStyle = [styles.linkText, { color: isDark ? '#589afc' : '#007bff' }];

  let imageSource;
  let locationInfo = null;

  // Compute region and marker by id
  const region =
    id === "2" ? mononokeLocation :
    id === "4" ? silentVoiceLocation :
    null;

  const markerCoordinate = region ?? undefined;

  switch (id) {
    case "1":
      imageSource = require("../../../assets/images/fmab.jpg");
      locationInfo = <Text style={[styles.infoText, textStyle]}>Origin: Amestris</Text>;
      break;
    case "2":
      imageSource = require("../../../assets/images/mononoke.jpg");
      if (Platform.OS !== 'web') {
        locationInfo = (
          <View style={styles.mapContainer}>
            <Text style={[styles.infoText, textStyle]}>Inspiration: Yakushima Island</Text>
            <MapView
              style={styles.map}
              region={region!}
            >
              <Marker coordinate={markerCoordinate!} title={"Yakushima Forest"} />
            </MapView>
          </View>
        );
      } else {
        locationInfo = (
          <TouchableOpacity onPress={() => Linking.openURL('https://maps.app.goo.gl/i9juLLBx8QYpHwz26')}>
            <Text style={linkTextStyle}>View Inspiration on Google Maps</Text>
          </TouchableOpacity>
        );
      }
      break;
    case "3":
      imageSource = require("../../../assets/images/theboy2.jpg");
      locationInfo = <Text style={[styles.infoText, textStyle]}>Origin: United Kingdom</Text>;
      break;
    case "4":
      imageSource = require("../../../assets/images/silent-voice.webp");
      if (Platform.OS !== 'web') {
        locationInfo = (
          <View style={styles.mapContainer}>
            <Text style={[styles.infoText, textStyle]}>Location: Ōgaki, Japan</Text>
            <MapView
              style={styles.map}
              region={region!}
            >
              <Marker coordinate={markerCoordinate!} title={"Ōgaki"} />
            </MapView>
          </View>
        );
      } else {
        locationInfo = (
          <TouchableOpacity onPress={() => Linking.openURL('https://maps.app.goo.gl/kG7bzHTtYzxaJtnv5')}>
            <Text style={linkTextStyle}>View Location on Google Maps</Text>
          </TouchableOpacity>
        );
      }
      break;
    default:
      imageSource = require("../../../assets/images/perfectblue.jpg");
      break;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: `${name}` }} />
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <Text style={[styles.title, textStyle]}>{name}</Text>
      {locationInfo}
      <Text style={[styles.description, textStyle]}>{desc}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 50, alignItems: "center", backgroundColor: "transparent" },
  image: { width: "100%", height: 250, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 },
  infoText: { fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5 },
  description: { fontSize: 18, textAlign: "center", marginTop: 10, padding: 15, lineHeight: 24, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5 },
  mapContainer: { alignItems: 'center' },
  map: { width: 300, height: 200, borderRadius: 10, marginTop: 5 },
  linkText: { fontSize: 16, textDecorationLine: 'underline', marginTop: 10 }
});