'use client';

import { useState, useEffect } from 'react';
import StoryCard from '@/components/StoryCard';
import { Story } from '@/types/api';

interface SearchResultsProps {
  query: string;
  stories: Story[];
  isLoading?: boolean;
  className?: string;
}

export default function SearchResults({ query, stories, isLoading = false, className = '' }: SearchResultsProps) {
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredStories([]);
      return;
    }

    const filtered = stories.filter(story =>
      story.title.toLowerCase().includes(query.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      story.category.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredStories(filtered);
  }, [query, stories]);

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <div className="mb-6">
          <div className="animate-pulse bg-gray-200 rounded h-6 w-48 mb-2"></div>
          <div className="animate-pulse bg-gray-200 rounded h-4 w-32"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
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
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Search for stories</h3>
        <p className="text-gray-500">Enter a keyword to find relevant news articles</p>
      </div>
    );
  }

  if (filteredStories.length === 0) {
    return (
      <div className={`${className}`}>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Search Results for "{query}"
          </h2>
          <p className="text-gray-600 text-sm">0 articles found</p>
        </div>
        
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.9-6.134-2.379M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-500 mb-4">
            We couldn't find any articles matching "{query}". Try different keywords or check your spelling.
          </p>
          <div className="text-sm text-gray-500">
            <p className="mb-2">Suggestions:</p>
            <ul className="space-y-1">
              <li>• Try more general keywords</li>
              <li>• Check for typos in your search</li>
              <li>• Use different search terms</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Search Results for "{query}"
        </h2>
        <p className="text-gray-600 text-sm">
          {filteredStories.length} article{filteredStories.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <StoryCard key={story.id} story={story} variant="default" />
        ))}
      </div>
    </div>
  );
}
