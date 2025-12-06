import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import debounce from "lodash.debounce";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import axios from "axios";

import CityCard from "../../components/CityCard";
import useCitySearch from "../../hooks/use-city-search";
import useCityWeather from "../../hooks/use-nearby-cities";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Debounce input
  const handleSearch = useMemo(
    () =>
      debounce((text: string) => {
        setQuery(text);
      }, 300),
    []
  );

  const { weather, loading, error } = useCityWeather(query);

  // Wrap single city into array for FlatList
  const data = weather ? [weather] : [];

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fafafa" }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 14 }}>
        Search Cities
      </Text>

      <TextInput
        placeholder="Search for a city…"
        onChangeText={handleSearch}
        style={{
          backgroundColor: "#fff",
          padding: 14,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          marginBottom: 14,
        }}
      />

      {loading && <ActivityIndicator size="large" color="#555" style={{ marginBottom: 10 }} />}

      {error && !loading && (
        <Text style={{ textAlign: "center", color: "red", marginTop: 20 }}>{error}</Text>
      )}

      {data.length === 0 && !loading && !error && (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
          Enter a city to see weather
        </Text>
      )}

     <FlatList
             data={data}
             keyExtractor={(item) => item.id.toString()}
             renderItem={({ item }) => <CityCard city={item} />}
           />
    </View>
  );
}
