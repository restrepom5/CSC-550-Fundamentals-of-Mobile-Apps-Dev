// state/favoritesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FavoriteDestination = {
  id: string;
  name: string;
  region: string;
};

type FavoritesState = {
  items: FavoriteDestination[];
};

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(
      state,
      action: PayloadAction<FavoriteDestination>
    ) {
      const exists = state.items.find((f) => f.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((f) => f.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
