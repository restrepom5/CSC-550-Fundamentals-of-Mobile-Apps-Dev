// theme/ThemeProvider.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

type Mode = "light" | "dark" | "system";

type Theme = {
  mode: Mode;                      
  colorScheme: "light" | "dark";    
  colors: {
    bg: string;
    text: string;
    card: string;
    tint: string;
    muted: string;
  };
  setMode: (m: Mode) => void;
};

const lightColors = {
  bg: "#FFFFFF",
  text: "#111111",
  card: "#F4F4F5",
  tint: "#1e90ff",
  muted: "#666",
};

const darkColors = {
  bg: "#111213",
  text: "#F8F8F8",
  card: "#1C1D20",
  tint: "#6AAEFF",
  muted: "#A0A0A0",
};

const ThemeCtx = createContext<Theme | null>(null);

function resolveScheme(mode: Mode, sys: ColorSchemeName): "light" | "dark" {
  if (mode === "system") return sys === "dark" ? "dark" : "light";
  return mode;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("system");
  const [sysScheme, setSysScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => setSysScheme(colorScheme));
    return () => sub.remove();
  }, []);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("@mode");
      if (saved === "light" || saved === "dark" || saved === "system") setMode(saved);
    })();
  }, []);

  const colorScheme = resolveScheme(mode, sysScheme);
  const colors = colorScheme === "dark" ? darkColors : lightColors;

  const value = useMemo<Theme>(
    () => ({
      mode,
      colorScheme,
      colors,
      setMode: async (m: Mode) => {
        setMode(m);
        await AsyncStorage.setItem("@mode", m);
      },
    }),
    [mode, colorScheme]
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
