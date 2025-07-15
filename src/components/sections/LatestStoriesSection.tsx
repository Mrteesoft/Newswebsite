'use client';

import { useLatestStories } from '@/hooks/useApi';
import StoryCard from '@/components/StoryCard';
import { StoriesGridSkeleton } from '@/components/ui/SkeletonLoader';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function LatestStoriesSection() {
  const { data: stories, isLoading, error, refetch } = useLatestStories({ per_page: 8 });

  if (isLoading) {
    return <StoriesGridSkeleton count={8} />;
  }

  if (error) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Stories</h2>
        <ErrorMessage
          message="Failed to load latest stories"
          onRetry={() => refetch()}
        />
      </section>
    );
  }

  if (!stories || !Array.isArray(stories) || stories.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Stories</h2>
        <p className="text-gray-500 text-center py-8">No stories available</p>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Stories</h2>
          <p className="text-gray-600 text-sm">
            Fresh updates and breaking news • {stories.length} articles
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Live Updates
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} variant="default" />
        ))}
      </div>
    </section>
  );
}
