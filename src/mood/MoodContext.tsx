//src/mood/MoodContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "W8_MOODS";

function getLocalDateISO(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export type MoodEntry = {
  id: string;
  ts: number;                 
  dateISO: string;        
  mood: "Happy" | "Sad" | "Stressed" | "Relaxed" | "Calm" | "Tired";
  note?: string;
};

type MoodCtx = {
  moods: MoodEntry[];
  addMood: (m: Omit<MoodEntry, "id">) => void;
};

const Ctx = createContext<MoodCtx | null>(null);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [moods, setMoods] = useState<MoodEntry[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed: any[] = raw ? JSON.parse(raw) : [];

        const upgraded: MoodEntry[] = parsed.map((e) => {
          if (typeof e.ts === "number") return e as MoodEntry;
          
          const maybeTs = Number(String(e.id ?? "").slice(0, 13));
          const ts =
            Number.isFinite(maybeTs) && maybeTs > 0 ? maybeTs : Date.parse(`${e.dateISO}T12:00:00Z`);

          return {
            id: e.id ?? String(Date.now()) + Math.random().toString(36).slice(2),
            ts,
            
            dateISO: getLocalDateISO(new Date(ts)),
            mood: e.mood,
            note: e.note,
          } as MoodEntry;
        });

        setMoods(upgraded);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(upgraded));
      } catch {
        setMoods([]);
      }
    })();
  }, []);


  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(moods)).catch(() => {});
  }, [moods]);

  const addMood: MoodCtx["addMood"] = (m) => {
    setMoods((prev) => [
      { id: String(Date.now()) + Math.random().toString(36).slice(2), ...m },
      ...prev,
    ]);
  };

  return <Ctx.Provider value={{ moods, addMood }}>{children}</Ctx.Provider>;
}

export function useMood() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMood must be used within MoodProvider");
  return v;
}
