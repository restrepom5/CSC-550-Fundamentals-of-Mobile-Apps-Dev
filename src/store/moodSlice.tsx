import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MoodEntry = {
  id: number;
  date: string;
  mood: string;
  note?: string;
};

type MoodState = {
  moods: MoodEntry[];
};

const initialState: MoodState = {
  moods: [],
};

const moodSlice = createSlice({
  name: "mood",
  initialState,
  reducers: {
    addMood: (state, action: PayloadAction<MoodEntry>) => {
      state.moods.push(action.payload);
    },
  },
});

export const { addMood } = moodSlice.actions;
export default moodSlice.reducer;
