// src/ui/theme.ts
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeMode = "light" | "dark";

type PaletteType = {
  bg: string;
  card: string;
  text: string;
  accent: string;
  accent2: string;
  accent3: string;
  bg1: string;
  bg2: string;
};

const LIGHT: PaletteType = {
  bg: "#F6F7FB",
  card: "#FFFFFF",
  text: "#0F172A",
  accent: "#6366F1",
  accent2: "#7DD3FC",
  accent3: "#F9A8D4",
  bg1: "#E0F2FE",
  bg2: "#FCE7F3",
};

const DARK: PaletteType = {
  bg: "#0E1015",
  card: "#151A24",
  text: "#FFFFFF",
  accent: "#7CFF6B",  
  accent2: "#4DE1FF", 
  accent3: "#FF7CE3", 
  bg1: "#0f172a",
  bg2: "#111827",
};

type ThemeValue = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  palette: PaletteType;
};

const ThemeCtx = createContext<ThemeValue>({
  mode: "dark",
  setMode: () => {},
  palette: DARK,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark");

  // Load saved preference
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("@mood/theme");
      if (saved === "light" || saved === "dark") setMode(saved as ThemeMode);
    })();
  }, []);

  // Persist preference
  useEffect(() => {
    AsyncStorage.setItem("@mood/theme", mode).catch(() => {});
  }, [mode]);

  const palette = mode === "light" ? LIGHT : DARK;

  return (
    <ThemeCtx.Provider value={{ mode, setMode, palette }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeCtx);
}

export const Palette = DARK;
