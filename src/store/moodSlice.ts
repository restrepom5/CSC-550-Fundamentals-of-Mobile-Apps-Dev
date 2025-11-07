// Is this the file copy to make changes in the state and then replace in the store?
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  note?: string;
}

interface MoodState {
  moods: MoodEntry[];
}

const initialState: MoodState = {
  moods: [],
};

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    addMood: (state, action: PayloadAction<MoodEntry>) => {
      state.moods.push(action.payload);
    },
  },
});

export const { addMood } = moodSlice.actions;
export default moodSlice.reducer;
