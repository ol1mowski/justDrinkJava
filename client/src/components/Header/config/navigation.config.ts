export interface NavigationItem {
  name: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { name: 'Posts', href: '/posts' },
  { name: 'About', href: '/about' },
  { name: 'Quizzes', href: '/quizzes' },
  { name: 'Ranking', href: '/ranking' },
  { name: 'Jobs', href: '/jobs' },
  { name: 'CV Guide', href: '/cv-guide' },
];
