import { memo } from 'react'
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'

interface PostData {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  imageUrl?: string
}

const mockPostData: PostData = {
  id: '1',
  title: 'Spring Boot 3.2: Nowości i najlepsze praktyki bezpieczeństwa',
  excerpt: 'Odkryj najnowsze funkcjonalności Spring Boot 3.2 i dowiedz się, jak zaimplementować zaawansowane mechanizmy bezpieczeństwa w swoich aplikacjach. Przegląd Virtual Threads, GraalVM i nowych adnotacji.',
  author: 'Anna Kowalska',
  date: '2024-01-15',
  readTime: '8 min',
  category: 'Spring Boot',
  imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'
}

export const LatestPost = memo(() => {
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
        <div className="absolute inset-0 bg-gradient-to-br from-java-orange via-java-red to-java-blue opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-6xl font-bold opacity-80">☕</div>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-4 text-sm text-java-blue/90 dark:text-java-dark-text-secondary">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-java-blue/10 text-java-blue font-medium">
            {mockPostData.category}
          </span>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <time dateTime={mockPostData.date}>
              {new Date(mockPostData.date).toLocaleDateString('pl-PL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>{mockPostData.readTime} czytania</span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-java-gray dark:text-java-dark-text 
                      mb-4 group-hover:text-java-orange transition-colors duration-300 line-clamp-2">
          {mockPostData.title}
        </h2>

        <p className="text-java-blue/90 dark:text-java-dark-text-secondary mb-6 leading-relaxed line-clamp-3">
          {mockPostData.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-java-orange to-java-red 
                           flex items-center justify-center text-white font-medium">
              {mockPostData.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm text-java-gray dark:text-java-dark-text">
                <UserIcon className="w-4 h-4" />
                <span className="font-medium">{mockPostData.author}</span>
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