import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout/MainLayout.layout'

const HomePage = lazy(() => import('../pages/HomePage/HomePage.page').then(module => ({ default: module.HomePage })))
const PostsPage = lazy(() => import('../pages/PostsPage/PostsPage.page').then(module => ({ default: module.PostsPage })))
const SearchPage = lazy(() => import('../pages/SearchPage/SearchPage.page').then(module => ({ default: module.SearchPage })))
const AboutPage = lazy(() => import('../pages/AboutPage/AboutPage.page').then(module => ({ default: module.AboutPage })))
const JobsPage = lazy(() => import('../pages/JobsPage/JobsPage.page').then(module => ({ default: module.JobsPage })))
const QuizzesPage = lazy(() => import('../pages/QuizzesPage/QuizzesPage.page').then(module => ({ default: module.QuizzesPage })))
const QuizDetailPage = lazy(() => import('../pages/QuizDetailPage/QuizDetailPage.page').then(module => ({ default: module.QuizDetailPage })))
const CVGuidePage = lazy(() => import('../pages/CVGuidePage/CVGuidePage.page').then(module => ({ default: module.CVGuidePage })))
const AccountSettingsPage = lazy(() => import('../pages/AccountSettingsPage/AccountSettingsPage.page').then(module => ({ default: module.AccountSettingsPage })))
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage.page').then(module => ({ default: module.LoginPage })))
const GitHubCallbackPage = lazy(() => import('../pages/GitHubCallbackPage/GitHubCallbackPage.page').then(module => ({ default: module.GitHubCallbackPage })))
const PostDetailPage = lazy(() => import('../pages/PostDetailPage/PostDetailPage.page').then(module => ({ default: module.PostDetailPage })))
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
        path: 'posts/:id',
        element: <PostDetailPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
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
        path: 'quizzes/:id',
        element: <QuizDetailPage />,
      },
      {
        path: 'cv-guide',
        element: <CVGuidePage />,
      },
      {
        path: 'account/settings',
        element: <AccountSettingsPage />,
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