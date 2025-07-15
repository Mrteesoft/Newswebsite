import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setBookmarks, toggleBookmark } from '@/store/slices/bookmarksSlice';
import { localStorageUtils } from '@/utils/localStorage';

export const useBookmarks = () => {
  const dispatch = useAppDispatch();
  const bookmarkedStoryIds = useAppSelector((state) => state.bookmarks.bookmarkedStoryIds);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorageUtils.getBookmarks();
    if (savedBookmarks.length > 0) {
      dispatch(setBookmarks(savedBookmarks));
    }
  }, [dispatch]);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorageUtils.setBookmarks(bookmarkedStoryIds);
  }, [bookmarkedStoryIds]);

  const isBookmarked = (storyId: number) => {
    return bookmarkedStoryIds.includes(storyId);
  };

  const handleToggleBookmark = (storyId: number) => {
    dispatch(toggleBookmark(storyId));
  };

  return {
    bookmarkedStoryIds,
    isBookmarked,
    toggleBookmark: handleToggleBookmark,
  };
};
