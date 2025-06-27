import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

interface FavouritesState {
  items: Product[];
}

const initialState: FavouritesState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavourite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearFavourites: state => {
      state.items = [];
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
