import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { ErrorBoundaryWrapper, ScrollToTop } from '../../components/ui'

export const MainLayout = memo(() => {
  return (
    <div className="min-h-screen bg-java-white dark:bg-java-dark-bg 
                   text-java-gray dark:text-java-dark-text transition-colors duration-300">
      <ScrollToTop />
      <ErrorBoundaryWrapper
        title="Błąd aplikacji"
        message="Wystąpił nieoczekiwany błąd w aplikacji"
      >
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </ErrorBoundaryWrapper>
    </div>
  )
})

MainLayout.displayName = 'MainLayout' 