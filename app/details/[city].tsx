import { View, Text, Button, ActivityIndicator, StyleSheet, Alert, ImageBackground } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"; 
import { useEffect, useState } from "react";
import { getWeatherByCity, WeatherData } from "../../src/api/weather";
import { saveFavorite } from "../../src/storage/favorites";

export default function DetailsScreen() {
  const { city } = useLocalSearchParams<{ city: string }>();
  const router = useRouter(); 
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) {
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      const data = await getWeatherByCity(city);
      setWeather(data);
      setLoading(false);
    })();
  }, [city]);

  // They way this work is that if there is not data fethched from the API and added to this page, display a message 
  // saying that there is not data to display 
  if (!city) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No city was provided to this page.</Text>
        <Button title="Back to Search" onPress={() => router.push("/search")} />
      </View>
    );
  }

  if (loading) return <ActivityIndicator style={styles.loading} size="large" />;

  if (!weather) // Here, same, if there is not weater, display a mesage
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Weather data not found for "{city}"</Text>
        <Button title="Back to Search" onPress={() => router.push("/search")} />
      </View>
    );

  const handleSaveFavorite = async () => {
    await saveFavorite(weather.name);
    Alert.alert("Saved!", `${weather.name} added to favorites.`);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/details.jpg")}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.city}>
          {weather.name}, {weather.sys.country}
        </Text>
        <Text style={styles.temp}>
          {Math.round(weather.main.temp * 9 / 5 + 32)}°F
        </Text>
        <Text style={styles.condition}>{weather.weather[0].description}</Text>
        <Text>Wind: {weather.wind.speed} m/s</Text>

        <View style={{ marginTop: 20 }}>
          <Button title="Add to favorites" onPress={handleSaveFavorite} />
        </View>

      
        <View style={{ marginTop: 10 }}>
          <Button title="Back to Search" onPress={() => router.push("/search")} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  city: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  temp: { fontSize: 48, fontWeight: "bold", marginBottom: 10 },
  condition: { fontSize: 20, marginBottom: 5 },
  error: { fontSize: 18, color: "red", textAlign: "center" },
});
