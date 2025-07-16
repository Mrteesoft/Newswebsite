import { 
  Category, 
  Story, 
  ApiResponse, 
  PaginationParams, 
  API_ENDPOINTS 
} from '@/types/api';

// Generic API fetch function with improved error handling
async function apiRequest<T>(url: string): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
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
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('API request timeout:', url);
        throw new Error('Request timeout - please try again');
      }
      console.error('API request failed:', error.message);
      throw error;
    }
    console.error('Unknown API error:', error);
    throw new Error('An unexpected error occurred');
  }
}

// Transform API story data to match our Story interface with validation
function transformStoryData(apiData: any): Story {
  if (!apiData) {
    throw new Error('Invalid story data: data is null or undefined');
  }

  const storyData = apiData.story || apiData;

  if (!storyData.id && !storyData.story?.id) {
    throw new Error('Invalid story data: missing required id field');
  }

  const categoryName = storyData.category?.category_name || storyData.category?.name || 'General';
  const contentLength = storyData.content?.length || 0;

  return {
    id: Number(storyData.id) || Number(apiData.id) || 0,
    title: String(storyData.title || 'Untitled'),
    slug: String(storyData.slug || storyData.title?.toLowerCase().replace(/\s+/g, '-') || ''),
    excerpt: String(storyData.description || storyData.subtitle || '').substring(0, 300),
    content: String(storyData.content || ''),
    featured_image: String(storyData.banner_image || storyData.featured_image || ''),
    published_at: String(storyData.created_at || storyData.published_at || new Date().toISOString()),
    author: {
      id: Number(storyData.author_id) || 1,
      name: String(storyData.author || 'Unknown Author'),
      avatar: storyData.author_avatar || undefined,
    },
    category: {
      id: Number(storyData.category?.category_id || storyData.category?.id) || 1,
      name: String(categoryName),
      slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
    },
    tags: Array.isArray(storyData.tags) ? storyData.tags : [],
    read_time: Math.max(1, Math.ceil(contentLength / 1000)) || 5,
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
    try {
      const data = await apiRequest<any[]>(API_ENDPOINTS.TOP_STORIES);
      if (!Array.isArray(data)) {
        console.warn('Top stories data is not an array:', data);
        return [];
      }
      return data.map(transformStoryData).filter(Boolean);
    } catch (error) {
      console.error('Error fetching top stories:', error);
      return [];
    }
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
