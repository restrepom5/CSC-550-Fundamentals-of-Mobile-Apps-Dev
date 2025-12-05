
import axios from "axios";

// This is my APi Key. I will delete it once the class is completed
const API_KEY = "3a5dee1b7f00434f44339e0a62857254";

export interface WeatherData {
  name: string;
  main: { temp: number };
  weather: { main: string; description: string }[];
  wind: { speed: number };
  sys: { country: string };
}
// From line 15 to line 57 I will use to diffeten fuction to call the API. using Coordinates and City. 
export const getWeatherByCoords = async ( 
  lat: number,
  lon: number
): Promise<WeatherData | null> => {
  try {
    const res = await axios.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching weather by coordinates:", error);
    return null;
  }
};

export const getWeatherByCity = async (
  city: string
): Promise<WeatherData | null> => {
  try {
    const res = await axios.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(`Error fetching weather for city "${city}":`, error);
    return null;
  }
};



