import { memo, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes.config'
import { LoadingSpinner } from '../components/ui'

const router = createBrowserRouter(routes)

const RouterLoadingFallback = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-java-white dark:bg-java-dark-bg">
    <div className="text-center">
      <LoadingSpinner size="lg" className="text-java-orange mb-4" />
      <p className="text-java-blue/90 dark:text-java-dark-text-secondary">
        Ładowanie strony...
      </p>
    </div>
  </div>
))

RouterLoadingFallback.displayName = 'RouterLoadingFallback'

export const AppRouter = memo(() => {
  return (
    <Suspense fallback={<RouterLoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  )
})

AppRouter.displayName = 'AppRouter' 