import * as Location from "expo-location";
import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "15255d22200fecab9b76811b8d14ef99";

export default function useCityWeather(cityName: string) {
  const [weather, setWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cityName || cityName.trim().length === 0) {
      setWeather(null);
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: cityName.trim(),
            appid: API_KEY,
            units: "metric",
          },
        });
        console.log("Weather data:", res.data);
        setWeather(res.data);
        console.log("Weather state set successfully");
      } catch (err: any) {
        console.error("Failed to fetch weather:", err);
        setError("City not found or network error");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [cityName]);

  return { weather, loading, error };
}