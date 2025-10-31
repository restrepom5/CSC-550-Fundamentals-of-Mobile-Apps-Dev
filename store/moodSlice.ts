import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MoodValue = 'Happy' | 'Sad' | 'Stressed' | 'Relaxed' | 'Calm' | 'Tired';

export interface MoodEntry {
  id: string;
  date: string;      // ISO timestamp
  mood: MoodValue;
  note?: string;
}

type AddPayload = { mood: MoodValue; note?: string };

const initialState: MoodEntry[] = [];

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    addMood: (state, action: PayloadAction<AddPayload>) => {
      state.unshift({
        // fallback if crypto.randomUUID isn't available on device/simulator
        id:
          (global as any).crypto?.randomUUID?.() ??
          (typeof require === 'function'
            ? String(Date.now())
            : String(Date.now())),
        date: new Date().toISOString(),
        mood: action.payload.mood,
        note: action.payload.note,
      });
    },
    clearMoods: () => [],
  },
});

export const { addMood, clearMoods } = moodSlice.actions;
export default moodSlice.reducer;

