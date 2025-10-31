import { configureStore } from '@reduxjs/toolkit';
// CORRECT PATH: Since moodsSlice.js is in the same folder, use './'
import moodsReducer from './moodSlice'; 

// Configure the store with the moods reducer
export const store = configureStore({
  reducer: {
    moods: moodsReducer,
    // Add other reducers here later if needed
  },
});