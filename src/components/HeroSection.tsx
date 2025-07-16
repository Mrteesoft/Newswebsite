'use client';

import { useTopStories } from '@/hooks/useApi';
import Link from 'next/link';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function HeroSection() {
  const { data: stories, isLoading } = useTopStories();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (isLoading) {
    return (
      <section className="relative h-[70vh] bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-white/20 rounded w-96 mx-auto mb-2"></div>
            <div className="h-4 bg-white/20 rounded w-80 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  const heroStory = stories && stories.length > 0 ? stories[0] : null;

  return (
    <section className="relative h-screen sm:h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            <div className="mb-4">
              <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                BREAKING NEWS
              </span>
            </div>
            
            {heroStory ? (
              <>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {heroStory.title}
                </h1>

                <p className="text-lg sm:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
                  {heroStory.excerpt}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                  <Link
                    href={`/stories/${heroStory.id}`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-center"
                  >
                    Read Full Story
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  <button
                    onClick={() => toggleBookmark(heroStory.id)}
                    className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors backdrop-blur-sm"
                  >
                    <svg
                      className={`w-4 h-4 mr-2 ${isBookmarked(heroStory.id) ? 'fill-current' : ''}`}
                      fill={isBookmarked(heroStory.id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    {isBookmarked(heroStory.id) ? 'Bookmarked' : 'Bookmark'}
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-6 sm:mt-8 text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {heroStory.category.name}
                    </span>
                  </div>
                  <span className="text-sm">
                    {new Date(heroStory.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-sm">By {heroStory.author.name}</span>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Stay Informed with the Latest News
                </h1>
                
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Your trusted source for breaking news, in-depth analysis, and stories that matter.
                </p>
                
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Explore Stories
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
