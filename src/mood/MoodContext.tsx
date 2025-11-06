//src/mood/MoodContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function getLocalDateISO(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

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

  useEffect(() => {
    (async () => {
      try {
        const done = await AsyncStorage.getItem("@mood/migrated_v2");
        if (done) return;

        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) {
          await AsyncStorage.setItem("@mood/migrated_v2", "1");
          return;
        }

        const list: MoodEntry[] = JSON.parse(raw);
        let changed = false;

        const fixed = list.map((e) => {
          const ms = Number(String(e.id).slice(0, 13));
          if (!Number.isFinite(ms) || ms < 1262304000000 || ms > 2050000000000) {
            return e;
          }
          const localISO = getLocalDateISO(new Date(ms));
          if (localISO !== e.dateISO) {
            changed = true;
            return { ...e, dateISO: localISO };
          }
          return e;
        });

        if (changed) {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fixed));
          setMoods(fixed);
        }

        await AsyncStorage.setItem("@mood/migrated_v2", "1");
      } catch {}
    })();
  }, []);

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

export function useMood() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMood must be used within MoodProvider");
  return v;
}
