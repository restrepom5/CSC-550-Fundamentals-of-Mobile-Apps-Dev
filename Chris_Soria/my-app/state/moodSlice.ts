// state/moodSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FoodReview = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  dishName: string;
  rating: number; // 1–5
  dateISO: string;
};

type AddReviewPayload = {
  restaurantId: string;
  restaurantName: string;
  dishName: string;
  rating: number;
};

export type MoodState = {
  items: FoodReview[];
};

const initialState: MoodState = {
  items: [],
};

const moodSlice = createSlice({
  name: "mood",
  initialState,
  reducers: {
    // keep the old name addMood for compatibility, but it now means “add review”
    addMood(state, action: PayloadAction<AddReviewPayload>) {
      const { restaurantId, restaurantName, dishName, rating } = action.payload;
      state.items.unshift({
        id: Date.now().toString(),
        restaurantId,
        restaurantName,
        dishName,
        rating,
        dateISO: new Date().toISOString(),
      });
    },
    clearMoods(state) {
      state.items = [];
    },
    removeMood(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addMood, clearMoods, removeMood } = moodSlice.actions;
export default moodSlice.reducer;
