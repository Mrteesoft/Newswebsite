'use client';

import { useCategories } from '@/hooks/useApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedCategory } from '@/store/slices/categoriesSlice';
import { CategoryNavSkeleton } from '@/components/ui/SkeletonLoader';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function CategoryNav() {
  const { data: categories, isLoading, error, refetch } = useCategories();
  const dispatch = useAppDispatch();
  const selectedCategoryId = useAppSelector((state) => state.categories.selectedCategoryId);

  const handleCategoryClick = (categoryId: number | null) => {
    dispatch(setSelectedCategory(categoryId));
  };

  if (isLoading) {
    return <CategoryNavSkeleton />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load categories"
        onRetry={() => refetch()}
        className="mb-4"
      />
    );
  }

  return (
    <nav className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-2">
      <div className="flex overflow-x-auto scrollbar-hide gap-2">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`flex-shrink-0 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
            selectedCategoryId === null
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            All Stories
          </span>
        </button>
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex-shrink-0 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              selectedCategoryId === category.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105'
            }`}
          >
            <span className="flex items-center gap-2">
              {getCategoryIcon(category.name)}
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );

  function getCategoryIcon(categoryName: string) {
    const iconClass = "w-4 h-4";

    switch (categoryName.toLowerCase()) {
      case 'politics':
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20"><path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" /></svg>;
      case 'technology':
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" /></svg>;
      case 'sports':
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>;
      case 'business':
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8-1a1 1 0 100 2h2a1 1 0 100-2h-2z" /></svg>;
      case 'entertainment':
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" /></svg>;
      default:
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
  }
}
