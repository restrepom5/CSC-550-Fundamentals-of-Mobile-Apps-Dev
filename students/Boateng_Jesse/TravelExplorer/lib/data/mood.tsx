// lib/mood.tsx
import React, { createContext, useContext, useState } from "react";

export type Mood = "Happy" | "Sad" | "Stressed" | "Relaxed" | "Calm" | "Tired";
export type MoodEntry = { id: string; dateISO: string; mood: Mood; note?: string };

type MoodContextType = {
  moods: MoodEntry[];
  addMood: (mood: Mood, note?: string) => void;
};

const MoodContext = createContext<MoodContextType | null>(null);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [moods, setMoods] = useState<MoodEntry[]>([]);

  const addMood = (mood: Mood, note?: string) => {
    const entry: MoodEntry = {
      id: Math.random().toString(36).slice(2),
      dateISO: new Date().toISOString(),
      mood,
      note: note?.trim() || undefined,
    };
    setMoods((prev) => [entry, ...prev]);
  };

  return (
    <MoodContext.Provider value={{ moods, addMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error("useMood must be used inside <MoodProvider>");
  return ctx;
}
