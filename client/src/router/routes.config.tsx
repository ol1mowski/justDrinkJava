import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout/MainLayout.layout'

const HomePage = lazy(() => import('../pages/HomePage/HomePage.page').then(module => ({ default: module.HomePage })))
const PostsPage = lazy(() => import('../pages/PostsPage/PostsPage.page').then(module => ({ default: module.PostsPage })))
const AboutPage = lazy(() => import('../pages/AboutPage/AboutPage.page').then(module => ({ default: module.AboutPage })))
const JobsPage = lazy(() => import('../pages/JobsPage/JobsPage.page').then(module => ({ default: module.JobsPage })))
const QuizzesPage = lazy(() => import('../pages/QuizzesPage/QuizzesPage.page').then(module => ({ default: module.QuizzesPage })))
const CVGuidePage = lazy(() => import('../pages/CVGuidePage/CVGuidePage.page').then(module => ({ default: module.CVGuidePage })))
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage.page').then(module => ({ default: module.LoginPage })))
const GitHubCallbackPage = lazy(() => import('../pages/GitHubCallbackPage/GitHubCallbackPage.page').then(module => ({ default: module.GitHubCallbackPage })))
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
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'jobs',
        element: <JobsPage />,
      },
      {
        path: 'quizzes',
        element: <QuizzesPage />,
      },
      {
        path: 'cv-guide',
        element: <CVGuidePage />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'auth/github/callback',
    element: <GitHubCallbackPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
] 