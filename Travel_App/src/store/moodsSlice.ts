import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Mood interface based on your initial state structure
export interface Mood {
    id: string;
    date: string;
    mood: string;
    note: string; // <-- Now uses 'note' (singular)
    location?: string;
}

const initialState = {
  moods: [
    // ✅ FIX: Use ISO 8601 strings (e.g., '2025-10-29T00:00:00.000Z') for reliable parsing.
    { id: '1', date: new Date('2025-10-29').toISOString(), mood: 'Happy', note: 'Had a great day coding!', location: 'New Haven, CT' },
    { id: '2', date: new Date('2025-10-28').toISOString(), mood: 'Stressed', note: 'Project deadlines looming.', location: 'New York, NY' },
  ] as Mood[], 
};

const moodsSlice = createSlice({
  name: 'moods',
  initialState,
  reducers: {
    // Action creator for adding a new mood entry
    // Use PayloadAction<Mood> to enforce type checking on dispatch
    addMood: (state, action: PayloadAction<Mood>) => {
      // Use Immer to safely mutate state: add the new mood to the top
      state.moods.unshift(action.payload); 
    },
  },
});

export const { addMood } = moodsSlice.actions;
// Ensure this file is saved as moodsSlice.ts if you are using TypeScript
export default moodsSlice.reducer;