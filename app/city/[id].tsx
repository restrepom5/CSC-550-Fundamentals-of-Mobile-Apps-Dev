import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView, Button, ActivityIndicator } from "react-native";
import useFavorites from "../../hooks/use-favorites";
import { getCityById } from "../../lib/api";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import useWeather from "../../hooks/use-weather";
export default function CityDetails() {
  const { id } = useLocalSearchParams();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [city, setCity] = useState<{
    id: number;
    name: string;
    image: string;
    lat: number;
    lng: number;
    description: string;
  } | undefined>(undefined);
  const { weather, loading } = useWeather(city ? Number(city.lat) : 0, city ? Number(city.lng) : 0);
  const weatherDescriptions: any = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    61: "Light rain",
    63: "Rain",
    71: "Snow",
  };
  useEffect(() => {
    const cityId = Array.isArray(id) ? id[0] : id;
    getCityById(cityId).then(setCity);
  }, []);

  if (!city) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <Image source={{ uri: city.image }} style={{ height: 250, width: "100%" }} />

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: "700" }}>{city.name}</Text>
        <Text style={{ marginVertical: 10 }}>{city.description}</Text>

        <Button
          title={isFavorite(String(city.id)) ? "Remove from Favorites" : "Add to Favorites"}
          onPress={() =>
            isFavorite(String(city.id)) ? removeFavorite(String(city.id)) : addFavorite({ ...city, id: String(city.id) })
          }
        />
        

        <View style={{
            backgroundColor: "#f5f5f5",
            padding: 16,
            borderRadius: 12,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginBottom: 6,
            }}
          >
            Weather
          </Text>

          {loading ? (
            <ActivityIndicator />
          ) : weather ? (
            <View>
              <Text style={{ fontSize: 18 }}>
                🌡 Temperature: {weather.temperature}°C
              </Text>

              <Text style={{ fontSize: 18 }}>
                ☁ Condition: {weatherDescriptions[weather.weathercode] || "—"}
              </Text>

              <Text style={{ fontSize: 16, marginTop: 4, color: "#666" }}>
                💨 Windspeed: {weather.windspeed} km/h
              </Text>
            </View>
          ) : (
            <Text>Weather unavailable</Text>
          )} 
        </View>
        <Text style={{ fontSize: 20, marginTop: 20 }}>Map</Text>
        <MapView
          style={{ height: 300, marginTop: 10 }}
          initialRegion={{
            latitude: city.lat,
            longitude: city.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker coordinate={{ latitude: city.lat, longitude: city.lng }} />
        </MapView>
      </View>
    </ScrollView>
  );
}
