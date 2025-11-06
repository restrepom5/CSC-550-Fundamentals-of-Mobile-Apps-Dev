//src/mood/MoodContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type MoodEntry = {
  id: string;
  dateISO: string; 
  mood: "Happy" | "Sad" | "Stressed" | "Relaxed" | "Calm" | "Tired";
  note?: string;
};

type MoodCtx = {
  moods: MoodEntry[];
  addMood: (m: Omit<MoodEntry, "id">) => void;
};

const Ctx = createContext<MoodCtx | null>(null);
const STORAGE_KEY = "W8_MOODS";

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [moods, setMoods] = useState<MoodEntry[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setMoods(JSON.parse(raw));
      } catch {}
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(moods)).catch(() => {});
  }, [moods]);

  const addMood: MoodCtx["addMood"] = (m) => {
    setMoods((prev) => [{ id: String(Date.now()) + Math.random().toString(36).slice(2), ...m }, ...prev]);
  };

  return <Ctx.Provider value={{ moods, addMood }}>{children}</Ctx.Provider>;
}

export function useMood() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMood must be used within MoodProvider");
  return v;
}
