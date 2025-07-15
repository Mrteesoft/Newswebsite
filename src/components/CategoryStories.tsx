'use client';

import { useCategoryStories } from '@/hooks/useApi';
import StoryCard from '@/components/StoryCard';
import { StoriesGridSkeleton } from '@/components/ui/SkeletonLoader';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Category } from '@/types/api';

interface CategoryStoriesProps {
  category: Category;
  className?: string;
}

export default function CategoryStories({ category, className = '' }: CategoryStoriesProps) {
  const { data: stories, isLoading, error, refetch } = useCategoryStories(category.id, { per_page: 12 });

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <div className="mb-6">
          <div className="animate-pulse bg-gray-200 rounded h-8 w-64 mb-2"></div>
          <div className="animate-pulse bg-gray-200 rounded h-4 w-48"></div>
        </div>
        <StoriesGridSkeleton count={12} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
          <p className="text-gray-600 text-sm">Latest stories in this category</p>
        </div>
        <ErrorMessage
          message={`Failed to load ${category.name.toLowerCase()} stories`}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!stories || !Array.isArray(stories) || stories.length === 0) {
    return (
      <div className={`${className}`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
          <p className="text-gray-600 text-sm">Latest stories in this category</p>
        </div>
        
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stories available</h3>
          <p className="text-gray-500">
            There are currently no stories in the {category.name.toLowerCase()} category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
          <p className="text-gray-600 text-sm">
            Latest stories in this category • {stories.length} articles
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <span 
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: `${category.color || '#3B82F6'}20`, 
              color: category.color || '#3B82F6' 
            }}
          >
            <span 
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: category.color || '#3B82F6' }}
            ></span>
            {category.name}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} variant="default" />
        ))}
      </div>
      
      {stories.length >= 12 && (
        <div className="text-center mt-8">
          <button className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
            Load More Stories
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
