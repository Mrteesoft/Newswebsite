'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useBookmarks } from '@/hooks/useBookmarks';
import { apiService } from '@/services/api';
import { Story } from '@/types/api';

export default function BookmarksPage() {
  const { bookmarkedStoryIds } = useBookmarks();
  const [bookmarkedStories, setBookmarkedStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarkedStories = async () => {
      if (bookmarkedStoryIds.length === 0) {
        setBookmarkedStories([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch each bookmarked story
        const storyPromises = bookmarkedStoryIds.map(id => 
          apiService.getSingleStory(id).catch(() => null)
        );
        
        const stories = await Promise.all(storyPromises);
        const validStories = stories.filter((story): story is Story => story !== null);
        
        setBookmarkedStories(validStories);
      } catch (err) {
        setError('Failed to load bookmarked stories');
        console.error('Error fetching bookmarked stories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedStories();
  }, [bookmarkedStoryIds]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookmarked Stories</h1>
          <p className="text-gray-600">
            {bookmarkedStoryIds.length === 0 
              ? 'No bookmarked stories yet' 
              : `${bookmarkedStoryIds.length} bookmarked ${bookmarkedStoryIds.length === 1 ? 'story' : 'stories'}`
            }
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        ) : bookmarkedStories.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarked stories</h3>
              <p className="text-gray-500 mb-6">
                Start bookmarking stories you want to read later by clicking the bookmark icon on any story.
              </p>
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Stories
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedStories.map((story) => (
              <StoryCard key={story.id} story={story} variant="default" />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
