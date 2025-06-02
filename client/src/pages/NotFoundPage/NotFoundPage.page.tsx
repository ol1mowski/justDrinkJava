import { memo } from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export const NotFoundPage = memo(() => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-java-white dark:bg-java-dark-bg">
      <div className="text-center px-4">
        <div className="mb-8">
          <div className="text-9xl font-bold text-java-orange mb-4">404</div>
          <h1 className="text-4xl font-bold text-java-gray dark:text-java-dark-text mb-4">
            Strona nie została znaleziona
          </h1>
          <p className="text-lg text-java-blue/90 dark:text-java-dark-text-secondary max-w-md mx-auto">
            Ups! Wygląda na to, że strona, której szukasz, nie istnieje lub została przeniesiona.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-java-orange hover:bg-java-red 
                     text-white font-semibold rounded-lg transition-all duration-300 
                     hover:shadow-lg hover:shadow-java-orange/25
                     focus:outline-none focus:ring-2 focus:ring-java-orange/50"
          >
            <HomeIcon className="w-5 h-5" />
            Strona główna
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-java-orange 
                     text-java-orange hover:bg-java-orange hover:text-white
                     font-semibold rounded-lg transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-java-orange/50"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Wróć
          </button>
        </div>
        
        <div className="mt-12">
          <div className="text-6xl mb-4">☕</div>
          <p className="text-sm text-java-gray/70 dark:text-java-dark-text-secondary">
            Może skorzystaj z tego czasu na przerwę na kawę?
          </p>
        </div>
      </div>
    </div>
  )
})

NotFoundPage.displayName = 'NotFoundPage' 