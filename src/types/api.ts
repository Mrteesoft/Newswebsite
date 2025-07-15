// API Response Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Story {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  published_at: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  category: Category;
  tags?: string[];
  read_time?: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  message?: string;
  status: boolean;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

// API Endpoints
export const API_ENDPOINTS = {
  CATEGORIES: 'https://api.agcnewsnet.com/api/general/categories',
  TOP_STORIES: 'https://api.agcnewsnet.com/api/general/top-stories',
  EDITOR_PICKS: 'https://api.agcnewsnet.com/api/general/editor-picks',
  FEATURED_STORIES: 'https://api.agcnewsnet.com/api/general/stories/featured-stories',
  LATEST_STORIES: 'https://api.agcnewsnet.com/api/general/stories/latest-stories',
  MISSED_STORIES: 'https://api.agcnewsnet.com/api/general/stories/missed-stories',
  CATEGORY_STORIES: (categoryId: number) => 
    `https://api.agcnewsnet.com/api/general/categories/${categoryId}/stories`,
  SINGLE_STORY: (storyId: number) => 
    `https://api.agcnewsnet.com/api/general/stories/${storyId}`,
} as const;
