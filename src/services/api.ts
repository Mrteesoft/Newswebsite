import { 
  Category, 
  Story, 
  ApiResponse, 
  PaginationParams, 
  API_ENDPOINTS 
} from '@/types/api';

// Generic API fetch function
async function apiRequest<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Handle the nested data structure from the API
    if (result.data && result.data.data) {
      return result.data.data;
    } else if (result.data) {
      return result.data;
    }

    return result;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Transform API story data to match our Story interface
function transformStoryData(apiData: any): Story {
  return {
    id: apiData.story?.id || apiData.id,
    title: apiData.story?.title || apiData.title,
    slug: apiData.story?.slug || apiData.slug || '',
    excerpt: apiData.story?.description || apiData.description || '',
    content: apiData.story?.content || apiData.content || '',
    featured_image: apiData.story?.banner_image || apiData.banner_image || '',
    published_at: apiData.story?.created_at || apiData.created_at || '',
    author: {
      id: 1,
      name: apiData.story?.author || apiData.author || 'Unknown Author',
      avatar: undefined,
    },
    category: {
      id: apiData.story?.category?.category_id || apiData.category?.category_id || 1,
      name: apiData.story?.category?.category_name || apiData.category?.category_name || 'General',
      slug: apiData.story?.category?.category_name?.toLowerCase().replace(/\s+/g, '-') || 'general',
    },
    tags: [],
    read_time: Math.ceil((apiData.story?.content?.length || 0) / 1000) || 5,
  };
}

// API Service Functions
export const apiService = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const data = await apiRequest<any[]>(API_ENDPOINTS.CATEGORIES);
      console.log('Categories API response:', data);

      if (!Array.isArray(data)) {
        console.warn('Categories data is not an array:', data);
        // Return fallback categories if API fails
        return [
          { id: 1, name: 'Politics', slug: 'politics', description: 'Political news and updates' },
          { id: 2, name: 'Business', slug: 'business', description: 'Business and economic news' },
          { id: 3, name: 'Sports', slug: 'sports', description: 'Sports news and updates' },
          { id: 4, name: 'Entertainment', slug: 'entertainment', description: 'Entertainment news' },
        ];
      }

      const categories = data.map(cat => ({
        id: cat.category_id || cat.id,
        name: cat.category_name || cat.name,
        slug: (cat.category_name || cat.name || '').toLowerCase().replace(/\s+/g, '-'),
        description: cat.description,
      }));

      console.log('Transformed categories:', categories);
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Return fallback categories if API fails
      return [
        { id: 1, name: 'Politics', slug: 'politics', description: 'Political news and updates' },
        { id: 2, name: 'Business', slug: 'business', description: 'Business and economic news' },
        { id: 3, name: 'Sports', slug: 'sports', description: 'Sports news and updates' },
        { id: 4, name: 'Entertainment', slug: 'entertainment', description: 'Entertainment news' },
      ];
    }
  },

  // Get top stories
  getTopStories: async (): Promise<Story[]> => {
    const data = await apiRequest<any[]>(API_ENDPOINTS.TOP_STORIES);
    return Array.isArray(data) ? data.map(transformStoryData) : [];
  },

  // Get editor's picks
  getEditorPicks: async (params: PaginationParams = {}): Promise<Story[]> => {
    const { page = 1, per_page = 15 } = params;
    const url = `${API_ENDPOINTS.EDITOR_PICKS}?page=${page}&per_page=${per_page}`;
    const data = await apiRequest<any[]>(url);
    return Array.isArray(data) ? data.map(transformStoryData) : [];
  },

  // Get featured stories
  getFeaturedStories: async (params: PaginationParams = {}): Promise<Story[]> => {
    const { page = 1, per_page = 15 } = params;
    const url = `${API_ENDPOINTS.FEATURED_STORIES}?page=${page}&per_page=${per_page}`;
    const data = await apiRequest<any[]>(url);
    return Array.isArray(data) ? data.map(transformStoryData) : [];
  },

  // Get latest stories
  getLatestStories: async (params: PaginationParams = {}): Promise<Story[]> => {
    const { page = 1, per_page = 7 } = params;
    const url = `${API_ENDPOINTS.LATEST_STORIES}?page=${page}&per_page=${per_page}`;
    const data = await apiRequest<any[]>(url);
    return Array.isArray(data) ? data.map(transformStoryData) : [];
  },

  // Get missed stories
  getMissedStories: async (params: PaginationParams = {}): Promise<Story[]> => {
    const { page = 1, per_page = 5 } = params;
    const url = `${API_ENDPOINTS.MISSED_STORIES}?page=${page}&per_page=${per_page}`;
    const data = await apiRequest<any[]>(url);
    return Array.isArray(data) ? data.map(transformStoryData) : [];
  },

  // Get stories by category
  getCategoryStories: async (
    categoryId: number,
    params: PaginationParams = {}
  ): Promise<Story[]> => {
    const { page = 1, per_page = 15 } = params;
    const url = `${API_ENDPOINTS.CATEGORY_STORIES(categoryId)}?page=${page}&per_page=${per_page}`;
    const data = await apiRequest<any[]>(url);
    return Array.isArray(data) ? data.map(transformStoryData) : [];
  },

  // Get single story
  getSingleStory: async (storyId: number): Promise<Story> => {
    const data = await apiRequest<any>(API_ENDPOINTS.SINGLE_STORY(storyId));
    return transformStoryData(data);
  },
};
