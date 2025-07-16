'use client';

import { useState, useEffect, useCallback } from 'react';
import { Story } from '@/types/api';
import Link from 'next/link';
import { useBookmarks } from '@/hooks/useBookmarks';

interface CarouselProps {
  stories: Story[];
  autoSlideInterval?: number;
  className?: string;
}

export default function Carousel({ stories, autoSlideInterval = 5000, className = '' }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  }, [stories.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
  }, [stories.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying || stories.length <= 1) return;

    const interval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide, autoSlideInterval, stories.length]);

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  if (!stories || stories.length === 0) return null;

  const currentStory = stories[currentIndex];

  const handleBookmarkClick = (e: React.MouseEvent, storyId: number) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(storyId);
  };

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Carousel Container */}
      <div className="relative h-screen sm:h-[400px] lg:h-[500px] overflow-hidden rounded-none sm:rounded-xl lg:rounded-2xl shadow-xl sm:shadow-2xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={currentStory.featured_image || '/api/placeholder/1200/500'}
            alt={currentStory.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/api/placeholder/1200/500';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center sm:justify-end p-6 sm:p-6 lg:p-8">
          <div className="max-w-4xl text-center sm:text-left">
            {/* Breaking News Badge */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 mb-6 sm:mb-4">
              <span className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
                BREAKING NEWS
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {currentStory.category.name}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-4 leading-tight">
              {currentStory.title}
            </h2>

            {/* Excerpt */}
            <p className="text-base sm:text-base lg:text-lg text-gray-200 mb-6 sm:mb-6 line-clamp-3 sm:line-clamp-2 max-w-3xl">
              {currentStory.excerpt}
            </p>

            {/* Meta Info & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4 text-gray-300">
                <span className="text-sm">By {currentStory.author.name}</span>
                <span className="text-sm">•</span>
                <span className="text-sm">
                  {new Date(currentStory.published_at).toLocaleDateString()}
                </span>
                {currentStory.read_time && (
                  <>
                    <span className="text-sm">•</span>
                    <span className="text-sm">{currentStory.read_time} min read</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleBookmarkClick(e, currentStory.id)}
                  className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className={`w-5 h-5 ${isBookmarked(currentStory.id) ? 'fill-current' : ''}`}
                    fill={isBookmarked(currentStory.id) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>

                <Link
                  href={`/stories/${currentStory.id}`}
                  className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Read Full Story
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {stories.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Play/Pause Button */}
        {stories.length > 1 && (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Dots Indicator */}
      {stories.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {stories.length > 1 && isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: `${((Date.now() % autoSlideInterval) / autoSlideInterval) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
