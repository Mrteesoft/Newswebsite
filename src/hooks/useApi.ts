import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { PaginationParams } from '@/types/api';

// Query Keys
export const QUERY_KEYS = {
  CATEGORIES: 'categories',
  TOP_STORIES: 'topStories',
  EDITOR_PICKS: 'editorPicks',
  FEATURED_STORIES: 'featuredStories',
  LATEST_STORIES: 'latestStories',
  MISSED_STORIES: 'missedStories',
  CATEGORY_STORIES: 'categoryStories',
  SINGLE_STORY: 'singleStory',
} as const;

// React Query Hooks
export const useCategories = () => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: apiService.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    refetchOnWindowFocus: false,
  });

  // Debug logging
  if (result.error) {
    console.error('Categories query error:', result.error);
  }
  if (result.data) {
    console.log('Categories query success:', result.data);
  }

  return result;
};

export const useTopStories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TOP_STORIES],
    queryFn: apiService.getTopStories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useEditorPicks = (params: PaginationParams = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.EDITOR_PICKS, params],
    queryFn: () => apiService.getEditorPicks(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useFeaturedStories = (params: PaginationParams = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FEATURED_STORIES, params],
    queryFn: () => apiService.getFeaturedStories(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useLatestStories = (params: PaginationParams = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LATEST_STORIES, params],
    queryFn: () => apiService.getLatestStories(params),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useMissedStories = (params: PaginationParams = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MISSED_STORIES, params],
    queryFn: () => apiService.getMissedStories(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCategoryStories = (categoryId: number | null, params: PaginationParams = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORY_STORIES, categoryId, params],
    queryFn: () => apiService.getCategoryStories(categoryId!, params),
    enabled: !!categoryId && categoryId > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useSingleStory = (storyId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SINGLE_STORY, storyId],
    queryFn: () => apiService.getSingleStory(storyId),
    enabled: !!storyId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
