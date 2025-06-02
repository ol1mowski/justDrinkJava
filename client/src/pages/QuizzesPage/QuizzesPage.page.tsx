import { memo } from 'react'
import { AcademicCapIcon, TrophyIcon } from '@heroicons/react/24/outline'

export const QuizzesPage = memo(() => {
  return (
    <div className="min-h-screen py-16 lg:py-24 bg-java-white dark:bg-java-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-java-orange/10 rounded-lg">
              <AcademicCapIcon className="w-6 h-6 text-java-orange" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-java-gray dark:text-java-dark-text">
              Quizy Java
            </h1>
            <TrophyIcon className="w-6 h-6 text-java-orange" />
          </div>
          <p className="text-lg text-java-blue/90 dark:text-java-dark-text-secondary max-w-2xl mx-auto">
            Sprawdź swoją wiedzę z programowania w Java. Rozwiązuj quizy na różnych poziomach trudności 
            i rywalizuj z innymi developerami!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="group p-6 bg-java-white dark:bg-java-dark-surface rounded-xl 
                         border border-java-gray/10 dark:border-java-dark-text/10 
                         hover:border-java-orange/30 dark:hover:border-java-orange/30 
                         transition-all duration-300 hover:shadow-lg hover:shadow-java-orange/10
                         hover:-translate-y-1 cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full 
                             flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text mb-2">
                Podstawy Java
              </h3>
              <p className="text-sm text-java-blue/90 dark:text-java-dark-text-secondary mb-4">
                Quizy dla początkujących programistów Java
              </p>
              <div className="text-xs text-java-orange font-semibold">
                Poziom: Początkujący
              </div>
            </div>
          </div>

          <div className="group p-6 bg-java-white dark:bg-java-dark-surface rounded-xl 
                         border border-java-gray/10 dark:border-java-dark-text/10 
                         hover:border-java-orange/30 dark:hover:border-java-orange/30 
                         transition-all duration-300 hover:shadow-lg hover:shadow-java-orange/10
                         hover:-translate-y-1 cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/30 rounded-full 
                             flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text mb-2">
                Java Średniozaawansowana
              </h3>
              <p className="text-sm text-java-blue/90 dark:text-java-dark-text-secondary mb-4">
                Quizy dla programistów z doświadczeniem
              </p>
              <div className="text-xs text-java-orange font-semibold">
                Poziom: Średniozaawansowany
              </div>
            </div>
          </div>

          <div className="group p-6 bg-java-white dark:bg-java-dark-surface rounded-xl 
                         border border-java-gray/10 dark:border-java-dark-text/10 
                         hover:border-java-orange/30 dark:hover:border-java-orange/30 
                         transition-all duration-300 hover:shadow-lg hover:shadow-java-orange/10
                         hover:-translate-y-1 cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full 
                             flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text mb-2">
                Java Ekspert
              </h3>
              <p className="text-sm text-java-blue/90 dark:text-java-dark-text-secondary mb-4">
                Quizy dla zaawansowanych programistów
              </p>
              <div className="text-xs text-java-orange font-semibold">
                Poziom: Zaawansowany
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🧠</div>
          <p className="text-lg text-java-blue/90 dark:text-java-dark-text-secondary">
            System quizów w budowie... 🚧
          </p>
          <p className="text-sm text-java-gray/70 dark:text-java-dark-text-secondary mt-2">
            Tutaj będą interaktywne quizy z różnych dziedzin Java, system punktów i ranking graczy.
          </p>
        </div>
      </div>
    </div>
  )
})

QuizzesPage.displayName = 'QuizzesPage' 