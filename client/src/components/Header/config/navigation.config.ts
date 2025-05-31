export interface NavigationItem {
  name: string
  href: string
}

export const navigationItems: NavigationItem[] = [
  { name: 'Posts', href: '/posts' },
  { name: 'About', href: '/about' },
  { name: 'Quizzes', href: '/quizzes' },
  { name: 'Jobs', href: '/jobs' },
] 