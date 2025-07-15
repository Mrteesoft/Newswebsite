'use client';

import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { 
  useTopStories, 
  useEditorPicks, 
  useFeaturedStories, 
  useLatestStories,
  useCategoryStories 
} from '@/hooks/useApi';
import StoryCard from '@/components/StoryCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Story } from '@/types/api';

export default function FilteredStoriesSection() {
  const searchQuery = useAppSelector((state) => state.categories.searchQuery);
  const selectedCategoryId = useAppSelector((state) => state.categories.selectedCategoryId);

  // Fetch data from different endpoints
  const { data: topStories, isLoading: topLoading, error: topError } = useTopStories();
  const { data: editorPicks, isLoading: editorLoading, error: editorError } = useEditorPicks({ per_page: 15 });
  const { data: featuredStories, isLoading: featuredLoading, error: featuredError } = useFeaturedStories({ per_page: 15 });
  const { data: latestStories, isLoading: latestLoading, error: latestError } = useLatestStories({ per_page: 15 });
  const { 
    data: categoryStories, 
    isLoading: categoryLoading, 
    error: categoryError 
  } = useCategoryStories(selectedCategoryId || 0, { per_page: 15 });

  // Combine all stories and remove duplicates
  const allStories = useMemo(() => {
    const stories: Story[] = [];
    const seenIds = new Set<number>();

    // Add stories from different sources
    const sources = [topStories, editorPicks, featuredStories, latestStories];

    sources.forEach(source => {
      if (source && Array.isArray(source)) {
        source.forEach(story => {
          if (story && story.id && !seenIds.has(story.id)) {
            stories.push(story);
            seenIds.add(story.id);
          }
        });
      }
    });

    return stories;
  }, [topStories, editorPicks, featuredStories, latestStories]);

  // Filter stories based on search query and selected category
  const filteredStories = useMemo(() => {
    let stories = selectedCategoryId ? (categoryStories && Array.isArray(categoryStories) ? categoryStories : []) : allStories;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      stories = stories.filter(story =>
        story && story.title && story.excerpt && story.author && story.category && (
          story.title.toLowerCase().includes(query) ||
          story.excerpt.toLowerCase().includes(query) ||
          story.author.name.toLowerCase().includes(query) ||
          story.category.name.toLowerCase().includes(query)
        )
      );
    }

    return stories;
  }, [allStories, categoryStories, searchQuery, selectedCategoryId]);

  // Loading state
  const isLoading = selectedCategoryId 
    ? categoryLoading 
    : topLoading || editorLoading || featuredLoading || latestLoading;

  // Error state
  const hasError = selectedCategoryId 
    ? categoryError 
    : topError || editorError || featuredError || latestError;

  // Show filtered results only when there's a search query or selected category
  if (!searchQuery.trim() && !selectedCategoryId) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {searchQuery.trim() ? `Search Results for "${searchQuery}"` : 'Category Stories'}
        </h2>
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  if (hasError) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {searchQuery.trim() ? `Search Results for "${searchQuery}"` : 'Category Stories'}
        </h2>
        <ErrorMessage
          message="Failed to load stories"
          onRetry={() => window.location.reload()}
        />
      </section>
    );
  }

  const getTitle = () => {
    if (searchQuery.trim() && selectedCategoryId) {
      return `Search Results for "${searchQuery}" in selected category`;
    } else if (searchQuery.trim()) {
      return `Search Results for "${searchQuery}"`;
    } else if (selectedCategoryId) {
      return 'Category Stories';
    }
    return 'Stories';
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {getTitle()}
        </h2>
        <span className="text-sm text-gray-500">
          {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
        </span>
      </div>

      {filteredStories.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
            <p className="text-gray-500">
              {searchQuery.trim() 
                ? `No stories match your search for "${searchQuery}"`
                : 'No stories found in this category'
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} variant="default" />
          ))}
        </div>
      )}
    </section>
  );
}
