import { configureStore } from '@reduxjs/toolkit';
import moodReducer from "../app/moodSlice";


export const store = configureStore({
  reducer: {
    mood: moodReducer
  }
})

export type RootState = ReturnType<typeof store.getState>