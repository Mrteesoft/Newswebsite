'use client';

import { useCategoryStories } from '@/hooks/useApi';
import StoryCard from '@/components/StoryCard';
import { StoriesGridSkeleton } from '@/components/ui/SkeletonLoader';
import { Story } from '@/types/api';

interface RelatedStoriesProps {
  currentStory: Story;
  className?: string;
}

export default function RelatedStories({ currentStory, className = '' }: RelatedStoriesProps) {
  const { data: stories, isLoading, error } = useCategoryStories(
    currentStory.category.id,
    { per_page: 4 }
  );

  if (isLoading) {
    return (
      <section className={`${className}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Related Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="animate-pulse bg-gray-200 rounded aspect-video w-full"></div>
              <div className="p-4 space-y-3">
                <div className="animate-pulse bg-gray-200 rounded h-4 w-full"></div>
                <div className="animate-pulse bg-gray-200 rounded h-4 w-3/4"></div>
                <div className="animate-pulse bg-gray-200 rounded h-3 w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !stories || !Array.isArray(stories)) {
    return null;
  }

  // Filter out the current story and get up to 4 related stories
  const relatedStories = stories
    .filter(story => story.id !== currentStory.id)
    .slice(0, 4);

  if (relatedStories.length === 0) {
    return null;
  }

  return (
    <section className={`${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Related Stories</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedStories.map((story) => (
          <StoryCard key={story.id} story={story} variant="compact" />
        ))}
      </div>
    </section>
  );
}
