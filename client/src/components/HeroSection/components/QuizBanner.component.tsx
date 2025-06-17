import { memo } from 'react'
import { Link } from 'react-router-dom'
import { AcademicCapIcon, TrophyIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export const QuizBanner = memo(() => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 
                     rounded-2xl border border-gray-200
                     group-hover:shadow-lg transition-all duration-300" />
      
      <div className="relative p-6 lg:p-8 text-gray-800">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 bg-java-orange/10 rounded-xl">
            <AcademicCapIcon className="w-8 h-8 text-java-orange" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                Sprawdź swoją wiedzę!
              </h3>
              <SparklesIcon className="w-5 h-5 text-java-orange" />
            </div>
            
            <p className="text-gray-600 mb-4 text-sm lg:text-base leading-relaxed">
              Rozwiązuj interaktywne quizy z Javy i sprawdź jak dobrze znasz ten język programowania. 
              Zdobywaj punkty i rywalizuj z innymi developerami!
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-4 text-xs lg:text-sm">
              <div className="flex items-center gap-2">
                <TrophyIcon className="w-4 h-4 text-java-orange" />
                <span className="text-gray-600">Ranking graczy</span>
              </div>
              <div className="flex items-center gap-2">
                <AcademicCapIcon className="w-4 h-4 text-java-blue" />
                <span className="text-gray-600">Różne poziomy</span>
              </div>
            </div>
            
            <Link 
              to="/quizzes"
              className="inline-flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 
                       bg-java-orange hover:bg-java-red
                       text-white font-semibold rounded-lg transition-all duration-300 
                       hover:shadow-lg hover:shadow-java-orange/25 hover:-translate-y-0.5
                       focus:outline-none focus:ring-2 focus:ring-java-orange/50 
                       text-sm lg:text-base"
            >
              <span>Rozpocznij quiz</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
        
        <div className="absolute bottom-4 right-8 opacity-10">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
        </div>
        
        <div className="absolute bottom-8 right-4 opacity-10">
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  )
})

QuizBanner.displayName = 'QuizBanner' 