const BOOKMARKS_KEY = 'news-platform-bookmarks';

export const localStorageUtils = {
  // Get bookmarks from localStorage
  getBookmarks: (): number[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const bookmarks = localStorage.getItem(BOOKMARKS_KEY);
      return bookmarks ? JSON.parse(bookmarks) : [];
    } catch (error) {
      console.error('Error reading bookmarks from localStorage:', error);
      return [];
    }
  },

  // Save bookmarks to localStorage
  setBookmarks: (bookmarks: number[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks to localStorage:', error);
    }
  },

  // Clear bookmarks from localStorage
  clearBookmarks: (): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(BOOKMARKS_KEY);
    } catch (error) {
      console.error('Error clearing bookmarks from localStorage:', error);
    }
  },
};
