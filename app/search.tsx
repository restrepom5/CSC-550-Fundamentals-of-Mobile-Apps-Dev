import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { getWeatherByCity, WeatherData } from "../src/api/weather";
// This page also interate with the API. what I did here is input a city, pas that value to the getWeatherByCity function and get the data.
export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const search = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);

    const data = await getWeatherByCity(query);
    if (!data) {
      setError(`No weather found for "${query}"`);
      setResult(null);
    } else {
      setResult(data);
    }

    setLoading(false);
  };

  return (
  <ImageBackground
    source={require("../assets/images/search.jpg")}
    style={{ flex: 1 }}
  >
    <View style={styles.container}>
      
      <TextInput
        placeholder="Search city..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Press to Search" onPress={search} />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {result && !loading && (
        <View style={styles.result}>
          <Text style={styles.city}>{result.name}</Text>
          <Text style={styles.temp}>
            {Math.round(result.main.temp * 9 / 5 + 32)}°F
          </Text>
          <Button
            title="View Details"
            onPress={() => router.push(`/details/${result.name}`)}
          />
        </View>
      )}
    </View>
  </ImageBackground>
);

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  error: { color: "red", marginTop: 10 },
  result: { marginTop: 20 },
  city: { fontSize: 24, fontWeight: "bold" },
  temp: { fontSize: 32, marginVertical: 5 },
});
