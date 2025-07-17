import { memo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ErrorBoundaryWrapper, ScrollToTop } from '../../components/ui';
import { MobileMenu } from '../../components/Header/components/MobileMenu.components';

export const MainLayout = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-java-white dark:bg-java-dark-bg 
                   text-java-gray dark:text-java-dark-text transition-colors duration-300
                   overflow-x-hidden"
    >
      <ScrollToTop />
      <ErrorBoundaryWrapper
        title="Błąd aplikacji"
        message="Wystąpił nieoczekiwany błąd w aplikacji"
      >
        <Header onMenuOpen={() => setIsMobileMenuOpen(true)} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </ErrorBoundaryWrapper>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
});

MainLayout.displayName = 'MainLayout';
