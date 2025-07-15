import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoriesState {
  selectedCategoryId: number | null;
  searchQuery: string;
}

const initialState: CategoriesState = {
  selectedCategoryId: null,
  searchQuery: '',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategoryId = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategoryId = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
  },
});

export const {
  setSelectedCategory,
  clearSelectedCategory,
  setSearchQuery,
  clearSearchQuery,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
