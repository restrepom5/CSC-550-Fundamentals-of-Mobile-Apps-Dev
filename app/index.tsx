import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from "react-native";
import * as Location from "expo-location";
import { getWeatherByCoords, getWeatherByCity, WeatherData } from "../src/api/weather";
// this is the landing page of the app. 
export default function HomeScreen() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  (async () => {
    try {
      // When the app loads it shoud check if location services are working.
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      console.log("Services enabled:", servicesEnabled);
      if (!servicesEnabled) {
        console.warn("Device location services are OFF");
      }

      // check for any permission needed. Some of this code is for loggin out the output. Is for me to check what is going on behing the scenes
      const perm = await Location.getForegroundPermissionsAsync();
      console.log("Permission before request:", perm.status); // just logs

      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Permission after request:", status);

      let data: WeatherData | null = null;

      if (status === "granted" && servicesEnabled) {
        try {
          const location = await Location.getCurrentPositionAsync({ // Here, I attemp to get phone coordinates and pass them to the API function
            accuracy: Location.Accuracy.Lowest, 
          });
          console.log("Location:", location);
          data = await getWeatherByCoords( // function to the the weather by Coordinate.
            location.coords.latitude,
            location.coords.longitude
          );
        } catch (err) {
          console.warn("Location not working, moving to city search.", err);
        }
      } else {
        console.warn("Location services off, using hard coded city.");
      }
      // if for some reason the location servies are off or there is any issue, I use a deafault city 
      if (!data) {
        data = await getWeatherByCity("New Haven");
      }

      setWeather(data);
    } catch (err) {
      console.error("fetching weather not working:", err); // for me to get the error and troubleshoot.
    } finally {
      setLoading(false);
    }
  })();
}, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  if (!weather) return <Text style={styles.error}>Unable to load weather data.</Text>;

// Genrally the temperature retuned by the APi is in Celcius Degree, i changed it to ceclcius. 
return (
  <ImageBackground
    source={require("../assets/images/index.jpg")} 
    style={{ flex: 1 }}
  >
    <View style={styles.container}>
      <Text style={styles.city}>
        {weather.name}, {weather.sys.country}
      </Text>

     
        <Text style={styles.temp}>
          {Math.round(weather.main.temp * 9 / 5 + 32)}°F
        </Text>

      <Text>{weather.weather[0].description}</Text>
    </View>
  </ImageBackground>
);


}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  
  city: { fontSize: 28, fontWeight: "bold" },
  temp: { fontSize: 48, marginVertical: 10 },
  error: { fontSize: 18, color: "red", textAlign: "center", marginTop: 50 },
});
