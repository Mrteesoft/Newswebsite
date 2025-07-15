'use client';

import { useEditorPicks } from '@/hooks/useApi';
import StoryCard from '@/components/StoryCard';
import { StoriesGridSkeleton } from '@/components/ui/SkeletonLoader';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function EditorPicksSection() {
  const { data: stories, isLoading, error, refetch } = useEditorPicks({ per_page: 6 });

  if (isLoading) {
    return <StoriesGridSkeleton count={6} />;
  }

  if (error) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Editor's Picks</h2>
        <ErrorMessage
          message="Failed to load editor's picks"
          onRetry={() => refetch()}
        />
      </section>
    );
  }

  if (!stories || !Array.isArray(stories) || stories.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Editor's Picks</h2>
        <p className="text-gray-500 text-center py-8">No stories available</p>
      </section>
    );
  }

  return (
    <section className="mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Editor's Picks</h2>
          <p className="text-gray-600 text-sm">
            Selected by our editorial team • {stories.length} articles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} variant="default" />
        ))}
      </div>
    </section>
  );
}
