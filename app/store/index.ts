import { configureStore } from "@reduxjs/toolkit";
import moodReducer from "./moodslice";

export const store = configureStore({
  reducer: {
    moods: moodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
