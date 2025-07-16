import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Story } from '@/types/api';
import { useBookmarks } from '@/hooks/useBookmarks';

interface StoryCardProps {
  story: Story;
  variant?: 'default' | 'featured' | 'compact' | 'hero';
  className?: string;
}

export default function StoryCard({ story, variant = 'default', className = '' }: StoryCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(story.id);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(story.id);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const ImageComponent = ({ src, alt, width, height, className, fill, priority }: any) => {
    if (imageError || !src) {
      return (
        <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      );
    }

    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        fill={fill}
        priority={priority}
        onError={handleImageError}
      />
    );
  };

  if (variant === 'compact') {
    return (
      <Link href={`/stories/${story.id}`} className={`block group ${className}`}>
        <article className="flex gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex-shrink-0">
            <ImageComponent
              src={story.featured_image}
              alt={story.title}
              width={80}
              height={60}
              className="rounded object-cover w-16 h-12 sm:w-20 sm:h-15"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 leading-tight">
              {story.title}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1 text-xs text-gray-500">
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                {story.category.name}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>{formatDate(story.published_at)}</span>
            </div>
          </div>
          <button
            onClick={handleBookmarkClick}
            className="flex-shrink-0 p-1 hover:bg-gray-200 rounded"
          >
            <svg
              className={`w-4 h-4 ${bookmarked ? 'text-blue-600 fill-current' : 'text-gray-400'}`}
              fill={bookmarked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </article>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/stories/${story.id}`} className={`block group ${className}`}>
        <article className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-video relative">
            <ImageComponent
              src={story.featured_image}
              alt={story.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <button
              onClick={handleBookmarkClick}
              className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm"
            >
              <svg
                className={`w-5 h-5 ${bookmarked ? 'text-blue-600 fill-current' : 'text-gray-600'}`}
                fill={bookmarked ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {story.category.name}
              </span>
              <span>•</span>
              <span>{formatDate(story.published_at)}</span>
              {story.read_time && (
                <>
                  <span>•</span>
                  <span>{story.read_time} min read</span>
                </>
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
              {story.title}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {story.excerpt}
            </p>
            <div className="flex items-center gap-2">
              {story.author.avatar && (
                <ImageComponent
                  src={story.author.avatar}
                  alt={story.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-gray-700">{story.author.name}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/stories/${story.id}`} className={`block group ${className}`}>
      <article className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
        <div className="aspect-video relative">
          <ImageComponent
            src={story.featured_image}
            alt={story.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleBookmarkClick}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm"
          >
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 ${bookmarked ? 'text-blue-600 fill-current' : 'text-gray-600'}`}
              fill={bookmarked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium w-fit">
              {story.category.name}
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="hidden sm:inline">•</span>
              <span>{formatDate(story.published_at)}</span>
              {story.read_time && (
                <>
                  <span>•</span>
                  <span>{story.read_time} min read</span>
                </>
              )}
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 leading-tight">
            {story.title}
          </h2>
          <p className="text-gray-600 line-clamp-3 mb-3 text-sm sm:text-base flex-1">
            {story.excerpt}
          </p>
          <div className="flex items-center gap-2 mt-auto">
            {story.author.avatar && (
              <ImageComponent
                src={story.author.avatar}
                alt={story.author.name}
                width={28}
                height={28}
                className="rounded-full"
              />
            )}
            <span className="text-sm text-gray-700">{story.author.name}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
