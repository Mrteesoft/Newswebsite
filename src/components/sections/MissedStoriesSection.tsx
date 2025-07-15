'use client';

import { useMissedStories } from '@/hooks/useApi';
import StoryCard from '@/components/StoryCard';
import { StoriesGridSkeleton } from '@/components/ui/SkeletonLoader';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function MissedStoriesSection() {
  const { data: stories, isLoading, error, refetch } = useMissedStories({ per_page: 5 });

  if (isLoading) {
    return <StoriesGridSkeleton count={5} />;
  }

  if (error) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Stories You Missed</h2>
        <ErrorMessage
          message="Failed to load missed stories"
          onRetry={() => refetch()}
        />
      </section>
    );
  }

  if (!stories || !Array.isArray(stories) || stories.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Stories You Missed</h2>
        <p className="text-gray-500 text-center py-8">No stories available</p>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Stories You Missed</h2>
          <p className="text-gray-600 text-sm">
            Catch up on important stories • {stories.length} articles
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Catch Up
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} variant="default" />
        ))}
      </div>
    </section>
  );
}
