// favorites/FavoritesProvider.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Ctx = {
  favorites: Set<string>;
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clear: () => void;
};

const FavoritesCtx = createContext<Ctx | null>(null);
const STORAGE = "favorites:v1";
const SEED: string[] = ["paris", "kyoto"];

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE);
        if (raw) setFavorites(new Set(JSON.parse(raw)));
        else setFavorites(new Set(SEED));
      } catch {
        setFavorites(new Set(SEED));
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE, JSON.stringify([...favorites]));
  }, [favorites]);

  const value = useMemo<Ctx>(
    () => ({
      favorites,
      toggle: (id) =>
        setFavorites((prev) => {
          const next = new Set(prev);
          next.has(id) ? next.delete(id) : next.add(id);
          return next;
        }),
      isFavorite: (id) => favorites.has(id),
      clear: () => setFavorites(new Set()),
    }),
    [favorites]
  );

  return <FavoritesCtx.Provider value={value}>{children}</FavoritesCtx.Provider>;
}

export function useFavorites() {
  const v = useContext(FavoritesCtx);
  if (!v) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return v;
}
