import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MoodEntry = {
  id: string;
  mood: string;
  note?: string;
  date: string;
};

type MoodState = {
  moods: MoodEntry[];
};

const initialState: MoodState = {
  moods: [],
};

const moodSlice = createSlice({
  name: "moods",
  initialState,
  reducers: {
    addMood: (state, action: PayloadAction<Omit<MoodEntry, "id">>) => {
      const newMood = { id: Date.now().toString(), ...action.payload };
      state.moods.push(newMood);
    },
  },
});

export const { addMood } = moodSlice.actions;
export default moodSlice.reducer;
