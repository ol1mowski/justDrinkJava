import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout/MainLayout.layout'

const HomePage = lazy(() => import('../pages/HomePage/HomePage.page').then(module => ({ default: module.HomePage })))
const PostsPage = lazy(() => import('../pages/PostsPage/PostsPage.page').then(module => ({ default: module.PostsPage })))
const QuizzesPage = lazy(() => import('../pages/QuizzesPage/QuizzesPage.page').then(module => ({ default: module.QuizzesPage })))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage.page').then(module => ({ default: module.NotFoundPage })))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        element: <PostsPage />,
      },
      {
        path: 'quizzes',
        element: <QuizzesPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
] 