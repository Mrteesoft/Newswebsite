'use client';

import { useTopStories } from '@/hooks/useApi';
import Link from 'next/link';
import { useState } from 'react';

export default function TrendingStories() {
  const { data: stories, isLoading, error } = useTopStories();
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (storyId: number) => {
    setImageErrors(prev => new Set(prev).add(storyId));
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Trending Now</h3>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="animate-pulse bg-gray-200 rounded w-16 h-12 flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="animate-pulse bg-gray-200 rounded h-4 w-full"></div>
                <div className="animate-pulse bg-gray-200 rounded h-3 w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !stories || !Array.isArray(stories)) {
    return null;
  }

  const trendingStories = stories.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900">Trending Now</h3>
      </div>
      
      <div className="space-y-4">
        {trendingStories.map((story, index) => (
          <Link
            key={story.id}
            href={`/stories/${story.id}`}
            className="flex gap-3 group hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 relative">
              <span className="absolute -top-1 -left-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center z-10">
                {index + 1}
              </span>
              {!imageErrors.has(story.id) && story.featured_image ? (
                <img
                  src={story.featured_image}
                  alt={story.title}
                  className="w-16 h-12 object-cover rounded"
                  onError={() => handleImageError(story.id)}
                />
              ) : (
                <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                {story.title}
              </h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded w-fit">
                  {story.category.name}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(story.published_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          View all trending stories
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
