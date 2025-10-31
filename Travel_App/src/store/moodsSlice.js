import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Placeholder data as required by the assignment
  moods: [
    { id: '1', date: 'Oct 29, 2025', mood: 'Happy', note: 'Had a great day coding!' },
    { id: '2', date: 'Oct 28, 2025', mood: 'Stressed', note: 'Project deadlines looming.' },
  ],
};

const moodsSlice = createSlice({
  name: 'moods',
  initialState,
  reducers: {
    // Action creator for adding a new mood entry
    addMood: (state, action) => {
      // Use Immer to safely mutate state: add the new mood to the top
      state.moods.unshift(action.payload); 
    },
  },
});

export const { addMood } = moodsSlice.actions;
export default moodsSlice.reducer;