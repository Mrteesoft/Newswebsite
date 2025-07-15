import React from 'react';

// Page Loading Spinner
export function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading News Platform</h2>
        <p className="text-gray-600">Getting the latest stories for you...</p>
      </div>
    </div>
  );
}

// Section Loading Skeleton
export function SectionLoader({ title, count = 4 }: { title: string; count?: number }) {
  return (
    <section className="mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <div className="animate-pulse bg-gray-200 rounded h-8 w-48 mb-2"></div>
          <div className="animate-pulse bg-gray-200 rounded h-4 w-64"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
            <div className="animate-pulse bg-gray-200 rounded aspect-video w-full"></div>
            <div className="p-3 sm:p-4 flex-1 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                <div className="animate-pulse bg-gray-200 rounded h-5 w-16"></div>
                <div className="animate-pulse bg-gray-200 rounded h-3 w-20"></div>
              </div>
              <div className="animate-pulse bg-gray-200 rounded h-6 w-full mb-2"></div>
              <div className="animate-pulse bg-gray-200 rounded h-6 w-3/4 mb-3"></div>
              <div className="animate-pulse bg-gray-200 rounded h-4 w-full mb-2"></div>
              <div className="animate-pulse bg-gray-200 rounded h-4 w-5/6 mb-3"></div>
              <div className="flex items-center gap-2 mt-auto">
                <div className="animate-pulse bg-gray-200 rounded-full w-7 h-7"></div>
                <div className="animate-pulse bg-gray-200 rounded h-4 w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Inline Loading Spinner
export function InlineLoader({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}></div>
    </div>
  );
}

// Button Loading State
export function ButtonLoader({ children, isLoading, className = '' }: { 
  children: React.ReactNode; 
  isLoading: boolean; 
  className?: string;
}) {
  return (
    <button 
      disabled={isLoading}
      className={`inline-flex items-center justify-center ${className} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {isLoading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
      )}
      {children}
    </button>
  );
}

// Content Loading Placeholder
export function ContentLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
}

// Hero Section Loading
export function HeroLoader() {
  return (
    <section className="relative h-[60vh] sm:h-[70vh] bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/20 rounded w-32 mx-auto mb-4"></div>
          <div className="h-12 bg-white/20 rounded w-96 mx-auto mb-2"></div>
          <div className="h-12 bg-white/20 rounded w-80 mx-auto mb-6"></div>
          <div className="h-6 bg-white/20 rounded w-64 mx-auto mb-8"></div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
            <div className="h-12 bg-white/20 rounded w-40"></div>
            <div className="h-12 bg-white/20 rounded w-32"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Trending Stories Loading
export function TrendingLoader() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <div className="animate-pulse bg-gray-200 rounded h-5 w-32"></div>
      </div>
      
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="animate-pulse bg-gray-200 rounded w-8 h-8 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-400">{i + 1}</span>
              </div>
            </div>
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
