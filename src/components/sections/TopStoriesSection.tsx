'use client';

import { useTopStories } from '@/hooks/useApi';
import StoryCard from '@/components/StoryCard';
import Carousel from '@/components/ui/Carousel';
import { TopStoriesSkeleton } from '@/components/ui/SkeletonLoader';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function TopStoriesSection() {
  const { data: stories, isLoading, error, refetch } = useTopStories();

  if (isLoading) {
    return <TopStoriesSkeleton />;
  }

  if (error) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Stories</h2>
        <ErrorMessage
          message="Failed to load top stories"
          onRetry={() => refetch()}
        />
      </section>
    );
  }

  if (!stories || !Array.isArray(stories) || stories.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Stories</h2>
        <p className="text-gray-500 text-center py-8">No stories available</p>
      </section>
    );
  }

  // Take top 5 stories for carousel, rest for sidebar
  const carouselStories = stories.slice(0, 5);
  const sidebarStories = stories.slice(5, 8);

  return (
    <section className="mb-12 sm:mb-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Top Stories</h2>
          <p className="text-gray-600 text-base">
            Breaking news and most important stories • Live updates
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
            LIVE
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Auto-updating
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Main Carousel - Takes 3/4 width */}
        <div className="lg:col-span-3">
          <Carousel
            stories={carouselStories}
            autoSlideInterval={6000}
            className="w-full"
          />
        </div>

        {/* Sidebar Stories - Takes 1/4 width */}
        {sidebarStories.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Headlines
            </h3>
            {sidebarStories.map((story, index) => (
              <div key={story.id} className="group">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{index + 6}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm leading-tight">
                      <a href={`/stories/${story.id}`}>{story.title}</a>
                    </h4>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {story.category.name}
                      </span>
                      <span>•</span>
                      <span>{new Date(story.published_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
