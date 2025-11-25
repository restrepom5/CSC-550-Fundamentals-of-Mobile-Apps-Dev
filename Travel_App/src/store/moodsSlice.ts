import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Mood interface based on your initial state structure
export interface Mood {
    id: string;
    date: string;
    mood: string;
    note: string; // <-- Changed from 'notes' to 'note' (singular)
}

const initialState = {
  // Placeholder data as required by the assignment
  moods: [
    { id: '1', date: 'Oct 29, 2025', mood: 'Happy', note: 'Had a great day coding!' },
    { id: '2', date: 'Oct 28, 2025', mood: 'Stressed', note: 'Project deadlines looming.' },
  ] as Mood[], // Use 'as Mood[]' for proper typing of initial state
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