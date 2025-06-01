import { memo } from 'react'
import { CalendarIcon, ClockIcon, UserIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useLatestPost } from '../../../hooks/useLatestPost'

const LoadingSkeleton = memo(() => (
  <article className="group relative bg-java-white dark:bg-java-dark-surface rounded-2xl overflow-hidden 
                     border border-java-gray/10 dark:border-java-dark-text/10 animate-pulse">
    <div className="relative h-48 sm:h-56 lg:h-64 bg-java-gray/10 dark:bg-java-dark-text/10" />
    <div className="p-6 sm:p-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-6 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-24" />
        <div className="h-4 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-32" />
      </div>
      <div className="h-8 bg-java-gray/10 dark:bg-java-dark-text/10 rounded mb-4" />
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-java-gray/10 dark:bg-java-dark-text/10 rounded" />
        <div className="h-4 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-4/5" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-java-gray/10 dark:bg-java-dark-text/10" />
          <div className="h-4 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-24" />
        </div>
        <div className="h-10 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-32" />
      </div>
    </div>
  </article>
))

const ErrorState = memo(({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <article className="group relative bg-java-white dark:bg-java-dark-surface rounded-2xl overflow-hidden 
                     border border-java-red/20 dark:border-java-red/20">
    <div className="p-6 sm:p-8 text-center">
      <div className="mb-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-java-red/10 flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-java-red mb-2">
        Błąd podczas ładowania
      </h3>
      <p className="text-java-blue/90 dark:text-java-dark-text-secondary mb-4">
        {error}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 bg-java-orange hover:bg-java-red 
                 text-white font-medium rounded-lg transition-colors duration-200 
                 focus:outline-none focus:ring-2 focus:ring-java-orange/50 cursor-pointer"
      >
        <ArrowPathIcon className="w-4 h-4" />
        Spróbuj ponownie
      </button>
    </div>
  </article>
))

export const LatestPost = memo(() => {
  const { data: postData, loading, error, refetch } = useLatestPost()

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />
  }

  if (!postData) {
    return <ErrorState error="Brak danych do wyświetlenia" onRetry={refetch} />
  }

  const hasImage = postData.imageUrl && postData.imageUrl.trim() !== ''
  const imageUrl = hasImage ? postData.imageUrl : null

  return (
    <article className="group relative bg-java-white dark:bg-java-dark-surface rounded-2xl overflow-hidden 
                       border border-java-gray/10 dark:border-java-dark-text/10 
                       hover:border-java-orange/30 dark:hover:border-java-orange/30 
                       transition-all duration-300 hover:shadow-xl hover:shadow-java-orange/10
                       cursor-pointer">
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                        bg-java-orange text-white shadow-lg">
          ✨ Najnowszy post
        </span>
      </div>

      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
        {imageUrl ? (
          <>
            <img 
              src={imageUrl} 
              alt={postData.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const fallback = target.nextElementSibling as HTMLDivElement
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-java-orange via-java-red to-java-blue opacity-90">
              <div className="text-white text-6xl font-bold opacity-80">☕</div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-java-orange via-java-red to-java-blue opacity-90 flex items-center justify-center">
            <div className="text-white text-6xl font-bold opacity-80">☕</div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-4 text-sm text-java-blue/90 dark:text-java-dark-text-secondary">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-java-blue/10 text-java-blue font-medium">
            {postData.category ? postData.category.name : 'Ogólne'}
          </span>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <time dateTime={postData.createdAt}>
              {new Date(postData.createdAt).toLocaleDateString('pl-PL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>{postData.readTimeFormatted}</span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-java-gray dark:text-java-dark-text 
                      mb-4 group-hover:text-java-orange transition-colors duration-300 line-clamp-2">
          {postData.title}
        </h2>

        <p className="text-java-blue/90 dark:text-java-dark-text-secondary mb-6 leading-relaxed line-clamp-3">
          {postData.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-java-orange to-java-red 
                           flex items-center justify-center text-white font-medium text-sm">
              {postData.user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm text-java-gray dark:text-java-dark-text">
                <UserIcon className="w-4 h-4" />
                <span className="font-medium">{postData.user.username}</span>
              </div>
            </div>
          </div>

          <button className="inline-flex items-center px-4 py-2 bg-java-orange hover:bg-java-red 
                           text-white font-medium rounded-lg transition-colors duration-200 
                           focus:outline-none focus:ring-2 focus:ring-java-orange/50
                           cursor-pointer">
            Czytaj dalej →
          </button>
        </div>
      </div>
    </article>
  )
})

LatestPost.displayName = 'LatestPost' 