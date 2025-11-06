import React, { createContext, useContext, useEffect, useState } from "react";
import { loadMoods, saveMoods } from "../utils/storage";

export type MoodEntry = {
  id: string;
  dateISO: string; // ISO timestamp
  mood: string;
  note?: string;
};

export type MoodContextValue = {
  moods: MoodEntry[];
  addMood: (entry: MoodEntry) => void;
};

const MoodContext = createContext<MoodContextValue | null>(null);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const initial = await loadMoods();
      setMoods(initial || []);
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (ready) saveMoods(moods);
  }, [moods, ready]);

  const addMood = (entry: MoodEntry) => setMoods((prev) => [entry, ...prev]);

  return (
    <MoodContext.Provider value={{ moods, addMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMoods() {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error("useMoods must be used within MoodProvider");
  return ctx;
}
