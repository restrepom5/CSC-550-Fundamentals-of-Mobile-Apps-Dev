import AsyncStorage from "@react-native-async-storage/async-storage";
import type { MoodEntry } from "../context/MoodContext";

const KEY = "MOOD_ENTRIES_V1";

export async function loadMoods(): Promise<MoodEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as MoodEntry[]) : [];
  } catch (e) {
    console.warn("Failed to load moods", e);
    return [];
  }
}

export async function saveMoods(moods: MoodEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(moods));
  } catch (e) {
    console.warn("Failed to save moods", e);
  }
}
