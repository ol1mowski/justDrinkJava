import { memo } from 'react'
import { DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline'

export const PostsSectionHeader = memo(() => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-2 bg-java-orange/10 rounded-lg">
          <DocumentTextIcon className="w-6 h-6 text-java-orange" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-java-gray dark:text-java-dark-text">
          Najnowsze artykuły
        </h2>
        <SparklesIcon className="w-6 h-6 text-java-orange" />
      </div>
      <p className="text-lg text-java-blue/90 dark:text-java-dark-text-secondary max-w-2xl mx-auto">
        Odkryj najnowsze trendy w Java, poznaj najlepsze praktyki i rozwijaj swoje umiejętności programistyczne.
      </p>
    </div>
  )
})

PostsSectionHeader.displayName = 'PostsSectionHeader' 