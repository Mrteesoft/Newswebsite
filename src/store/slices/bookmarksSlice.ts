import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookmarksState {
  bookmarkedStoryIds: number[];
}

const initialState: BookmarksState = {
  bookmarkedStoryIds: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<number>) => {
      const storyId = action.payload;
      if (!state.bookmarkedStoryIds.includes(storyId)) {
        state.bookmarkedStoryIds.push(storyId);
      }
    },
    removeBookmark: (state, action: PayloadAction<number>) => {
      const storyId = action.payload;
      state.bookmarkedStoryIds = state.bookmarkedStoryIds.filter(
        (id) => id !== storyId
      );
    },
    toggleBookmark: (state, action: PayloadAction<number>) => {
      const storyId = action.payload;
      const index = state.bookmarkedStoryIds.indexOf(storyId);
      if (index === -1) {
        state.bookmarkedStoryIds.push(storyId);
      } else {
        state.bookmarkedStoryIds.splice(index, 1);
      }
    },
    setBookmarks: (state, action: PayloadAction<number[]>) => {
      state.bookmarkedStoryIds = action.payload;
    },
    clearBookmarks: (state) => {
      state.bookmarkedStoryIds = [];
    },
  },
});

export const {
  addBookmark,
  removeBookmark,
  toggleBookmark,
  setBookmarks,
  clearBookmarks,
} = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
