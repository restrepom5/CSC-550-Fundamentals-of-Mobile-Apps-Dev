import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MOOD_STORAGE_KEY = '@moods';

interface MoodEntry {
  id: string;
  mood: string;
  note: string;
  date: string;
}

interface MoodContextType {
  moods: MoodEntry[];
  addMood: (mood: string, note: string) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);

  // Load moods from storage when the app starts
  useEffect(() => {
    const loadMoods = async () => {
      try {
        const storedMoods = await AsyncStorage.getItem(MOOD_STORAGE_KEY);
        if (storedMoods) {
          setMoods(JSON.parse(storedMoods));
        }
      } catch (e) {
        console.error("Failed to load wishlist.", e);
      }
    };
    loadMoods();
  }, []);

  const addMood = async (mood: string, note: string) => {
    const newMoodEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      note,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    

    const updatedMoods = [newMoodEntry, ...moods].slice(0, 5);
    setMoods(updatedMoods);
    
    // Save the updated list back to storage
    try {
      await AsyncStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(updatedMoods));
    } catch (e) {
      console.error("Failed to save wishlist.", e);
    }
  };

  return (
    <MoodContext.Provider value={{ moods, addMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMoods = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMoods must be used within a MoodProvider');
  }
  return context;
};
