// What is the file that reducers are making a copy of the stete? Reducers
// won't do changes in the store directly because of the immutability concept. 
// they will make a copy of the state, then replace the original state with a copy
import { configureStore } from '@reduxjs/toolkit';
import moodReducer from './moodSlice';

export const store = configureStore({
  reducer: {
    mood: moodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
