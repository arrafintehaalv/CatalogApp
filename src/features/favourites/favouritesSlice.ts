// src/features/favourites/favouritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouritesState {
  items: string[]; // or a more complex object if needed
}

const initialState: FavouritesState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item !== action.payload);
    },
    clearFavourites: state => {
      state.items = [];
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
