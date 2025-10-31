export type MoodValue = 'Happy' | 'Sad' | 'Stressed' | 'Relaxed' | 'Calm' | 'Tired';

export interface MoodEntry {
  id: string;
  date: string;   // ISO timestamp
  mood: MoodValue;
  note?: string;
}

