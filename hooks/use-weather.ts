import { useEffect, useState } from "react";
import axios from "axios";

export default function useWeather(lat: number, lon: number) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lon) return;

    async function fetchWeather() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        const res = await axios.get(url);
        setWeather(res.data.current_weather);
      } catch (err) {
        console.log("weather error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [lat, lon]);

  return { weather, loading };
}
