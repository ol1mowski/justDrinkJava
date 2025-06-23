export const queryKeys = {
  user: {
    all: ['user'] as const,
    current: () => [...queryKeys.user.all, 'current'] as const,
  },

  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.posts.lists(), filters] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.posts.details(), id] as const,
    latest: () => [...queryKeys.posts.all, 'latest'] as const,
    search: (query: string) =>
      [...queryKeys.posts.all, 'search', query] as const,
  },

  comments: {
    all: ['comments'] as const,
    lists: () => [...queryKeys.comments.all, 'list'] as const,
    list: (postId: number) => [...queryKeys.comments.lists(), postId] as const,
  },

  users: {
    all: ['users'] as const,
    current: () => [...queryKeys.users.all, 'current'] as const,
    profile: (id: number) => [...queryKeys.users.all, 'profile', id] as const,
  },

  statistics: {
    all: ['statistics'] as const,
    general: () => [...queryKeys.statistics.all, 'general'] as const,
  },

  categories: {
    all: ['categories'] as const,
    list: (limit?: number) =>
      [...queryKeys.categories.all, 'list', { limit }] as const,
  },

  quizzes: {
    all: ['quizzes'] as const,
    lists: () => [...queryKeys.quizzes.all, 'list'] as const,
    list: (page: number, size: number) =>
      [...queryKeys.quizzes.lists(), { page, size }] as const,
    details: () => [...queryKeys.quizzes.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.quizzes.details(), id] as const,
    questions: (id: number) =>
      [...queryKeys.quizzes.all, 'questions', id] as const,
    category: (category: string) =>
      [...queryKeys.quizzes.all, 'category', category] as const,
  },

  rankings: {
    all: ['rankings'] as const,
    users: () => [...queryKeys.rankings.all, 'users'] as const,
  },
} as const;
