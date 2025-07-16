'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSingleStory } from '@/hooks/useApi';
import { useBookmarks } from '@/hooks/useBookmarks';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedStories from '@/components/RelatedStories';
import BackToTop from '@/components/BackToTop';
import ShareStory from '@/components/ShareStory';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function StoryPage() {
  const params = useParams();
  const storyId = parseInt(params.id as string);
  const { data: story, isLoading, error, refetch } = useSingleStory(storyId);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage
            message="Failed to load story"
            onRetry={() => refetch()}
          />
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const bookmarked = isBookmarked(story.id);

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
        onError={() => setImageError(true)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {story.category.name}
              </span>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium truncate">
              {story.title}
            </li>
          </ol>
        </nav>

        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-6 pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {story.category.name}
                </span>
                <span className="text-gray-500 text-xs sm:text-sm">
                  {formatDate(story.published_at)}
                </span>
                {story.read_time && (
                  <>
                    <span className="text-gray-300 hidden sm:inline">•</span>
                    <span className="text-gray-500 text-xs sm:text-sm">
                      {story.read_time} min read
                    </span>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => toggleBookmark(story.id)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                >
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${bookmarked ? 'text-blue-600 fill-current' : 'text-gray-400'}`}
                    fill={bookmarked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                  </span>
                </button>

                <ShareStory story={story} />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {story.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {story.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
              {story.author.avatar && (
                <ImageComponent
                  src={story.author.avatar}
                  alt={story.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-gray-900">{story.author.name}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video relative">
            <ImageComponent
              src={story.featured_image}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-6 pt-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: story.content }}
            />

            {/* Tags */}
            {story.tags && story.tags.length > 0 && (
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium hover:from-blue-100 hover:to-purple-100 hover:text-blue-800 transition-all duration-300 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Related Stories */}
        <RelatedStories currentStory={story} className="mt-8 sm:mt-12" />

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
