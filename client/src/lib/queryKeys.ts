export const queryKeys = {
  user: {
    all: ['user'] as const,
    current: () => [...queryKeys.user.all, 'current'] as const,
  },

  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.posts.lists(), { filters }] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.posts.details(), id] as const,
    latest: (limit?: number) => [...queryKeys.posts.all, 'latest', { limit }] as const,
    search: (params: Record<string, unknown>) => 
      [...queryKeys.posts.all, 'search', params] as const,
  },

  statistics: {
    all: ['statistics'] as const,
    overview: () => [...queryKeys.statistics.all, 'overview'] as const,
  },

  hashtags: {
    all: ['hashtags'] as const,
    list: (limit?: number) => [...queryKeys.hashtags.all, 'list', { limit }] as const,
  },

  quizzes: {
    all: ['quizzes'] as const,
    lists: () => [...queryKeys.quizzes.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.quizzes.lists(), { filters }] as const,
    details: () => [...queryKeys.quizzes.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.quizzes.details(), id] as const,
  },

  categories: {
    all: ['categories'] as const,
    list: () => [...queryKeys.categories.all, 'list'] as const,
  },
} as const 