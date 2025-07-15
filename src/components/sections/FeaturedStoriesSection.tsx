'use client';

import { useState } from 'react';
import { useFeaturedStories, useTopStories } from '@/hooks/useApi';
import StoryCard from '@/components/StoryCard';
import { StoriesGridSkeleton } from '@/components/ui/SkeletonLoader';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function FeaturedStoriesSection() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAll, setShowAll] = useState(false);
  const { data: featuredStories, isLoading: featuredLoading, error: featuredError, refetch: refetchFeatured } = useFeaturedStories({ per_page: 12 });
  const { data: topStories, isLoading: topLoading, error: topError, refetch: refetchTop } = useTopStories();

  // Use featured stories if available, otherwise fall back to top stories
  const stories = (featuredStories && featuredStories.length > 0) ? featuredStories : (topStories || []);
  const isLoading = featuredLoading || topLoading;
  const error = featuredError || topError;
  const isFallback = !featuredStories || featuredStories.length === 0;

  const refetch = () => {
    refetchFeatured();
    refetchTop();
  };

  if (isLoading) {
    return <StoriesGridSkeleton count={12} />;
  }

  if (error) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
        <ErrorMessage
          message="Failed to load featured stories"
          onRetry={refetch}
        />
      </section>
    );
  }

  if (!stories || !Array.isArray(stories) || stories.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
        <p className="text-gray-500 text-center py-8">No stories available</p>
      </section>
    );
  }

  const mainFeaturedStory = stories[0];
  const secondaryStories = stories.slice(1, 5);
  const remainingStories = stories.slice(5);
  const displayedRemainingStories = showAll ? remainingStories : remainingStories.slice(0, 4);

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Stories</h2>
          <p className="text-gray-600 text-base">
            {isFallback
              ? `Top stories curated for you • ${stories.length} articles`
              : `Handpicked stories from our editorial team • ${stories.length} articles`
            }
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            isFallback
              ? 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800'
              : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800'
          }`}>
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {isFallback ? 'Top Stories' : 'Featured'}
          </span>
        </div>
      </div>

      {/* Main Featured Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Featured Story - Takes 2/3 width */}
        <div className="lg:col-span-2">
          <StoryCard story={mainFeaturedStory} variant="featured" className="h-full" />
        </div>

        {/* Secondary Featured Stories - Takes 1/3 width */}
        <div className="space-y-6">
          {secondaryStories.map((story, index) => (
            <div key={story.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex gap-4 p-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">{index + 2}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {story.category.name}
                    </span>
                  </div>

                  <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
                    <a href={`/stories/${story.id}`}>{story.title}</a>
                  </h4>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{new Date(story.published_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{story.author.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Featured Stories Grid */}
      {remainingStories.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">More Featured Stories</h3>

            {remainingStories.length > 4 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
              >
                {showAll ? 'Show Less' : `Show All (${remainingStories.length})`}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedRemainingStories.map((story) => (
              <StoryCard key={story.id} story={story} variant="default" />
            ))}
          </div>

          {/* Load More Button */}
          {!showAll && remainingStories.length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Load More Featured Stories
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
