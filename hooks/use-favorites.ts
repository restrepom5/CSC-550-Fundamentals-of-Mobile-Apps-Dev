import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type City = { id: string | number;
  name: string;
  image: string;};

// SHARED MEMORY STORE
let _favorites: City[] = [];
let listeners: ((favs: City[]) => void)[] = [];

function notify() {
  listeners.forEach((l) => l([..._favorites]));
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState<City[]>(_favorites);

  useEffect(() => {
    // Subscribe to changes
    listeners.push(setFavorites);

    // Load only once on app start
    (async () => {
      const data = await AsyncStorage.getItem("favorites");
      _favorites = data ? JSON.parse(data) : [];
      setFavorites([..._favorites]);
    })();

    return () => {
      listeners = listeners.filter((l) => l !== setFavorites);
    };
  }, []);

  async function addFavorite(city: City) {
    _favorites.push(city);
    await AsyncStorage.setItem("favorites", JSON.stringify(_favorites));
    notify();
  }

  async function removeFavorite(id: string) {
    _favorites = _favorites.filter((c) => c.id !== id);
    await AsyncStorage.setItem("favorites", JSON.stringify(_favorites));
    notify();
  }

  function isFavorite(id: string) {
    return _favorites.some((c) => c.id === id);
  }

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
