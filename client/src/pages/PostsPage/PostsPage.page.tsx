import { memo } from 'react'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

export const PostsPage = memo(() => {
  return (
    <div className="min-h-screen py-16 lg:py-24 bg-java-white dark:bg-java-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-java-orange/10 rounded-lg">
              <DocumentTextIcon className="w-6 h-6 text-java-orange" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-java-gray dark:text-java-dark-text">
              Wszystkie posty
            </h1>
          </div>
          <p className="text-lg text-java-blue/90 dark:text-java-dark-text-secondary max-w-2xl mx-auto">
            Przeglądaj wszystkie artykuły, tutoriale i poradniki dotyczące programowania w Java.
          </p>
        </div>
        
        <div className="text-center py-12">
          <p className="text-lg text-java-blue/90 dark:text-java-dark-text-secondary">
            Strona w budowie... 🚧
          </p>
          <p className="text-sm text-java-gray/70 dark:text-java-dark-text-secondary mt-2">
            Tutaj będzie lista wszystkich postów z paginacją, filtrami i sortowaniem.
          </p>
        </div>
      </div>
    </div>
  )
})

PostsPage.displayName = 'PostsPage' 