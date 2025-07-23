import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

// Lazy load pages
const HomePage = lazy(() =>
  import('../pages/HomePage/HomePage.page').then(module => ({
    default: module.HomePage,
  }))
);

const PostsPage = lazy(() =>
  import('../pages/PostsPage/PostsPage.page').then(module => ({
    default: module.PostsPage,
  }))
);

const PostDetailPage = lazy(() =>
  import('../pages/PostDetailPage/PostDetailPage.page').then(module => ({
    default: module.PostDetailPage,
  }))
);

const AuthPage = lazy(() =>
  import('../components/Auth/AuthPage.page').then(module => ({
    default: module.AuthPage,
  }))
);

const LoginPage = lazy(() =>
  import('../pages/LoginPage/LoginPage.page').then(module => ({
    default: module.LoginPage,
  }))
);

const AccountSettingsPage = lazy(() =>
  import('../pages/AccountSettingsPage/AccountSettingsPage.page').then(
    module => ({ default: module.AccountSettingsPage })
  )
);

const SearchPage = lazy(() =>
  import('../pages/SearchPage/SearchPage.page').then(module => ({
    default: module.SearchPage,
  }))
);

const QuizzesPage = lazy(() =>
  import('../pages/QuizzesPage/QuizzesPage.page').then(module => ({
    default: module.QuizzesPage,
  }))
);

const QuizDetailPage = lazy(() =>
  import('../pages/QuizDetailPage/QuizDetailPage.page').then(module => ({
    default: module.QuizDetailPage,
  }))
);

const RankingPage = lazy(() =>
  import('../pages/RankingPage/RankingPage.page').then(module => ({
    default: module.RankingPage,
  }))
);

const JobsPage = lazy(() =>
  import('../pages/JobsPage/JobsPage.page').then(module => ({
    default: module.JobsPage,
  }))
);

const CVGuidePage = lazy(() =>
  import('../pages/CVGuidePage/CVGuidePage.page').then(module => ({
    default: module.CVGuidePage,
  }))
);

const AboutPage = lazy(() =>
  import('../pages/AboutPage/AboutPage.page').then(module => ({
    default: module.AboutPage,
  }))
);

const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage/NotFoundPage.page').then(module => ({
    default: module.NotFoundPage,
  }))
);

export const router = createBrowserRouter([
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
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'account-settings',
        element: <AccountSettingsPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
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
        path: 'ranking',
        element: <RankingPage />,
      },
      {
        path: 'jobs',
        element: <JobsPage />,
      },
      {
        path: 'cv-guide',
        element: <CVGuidePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
