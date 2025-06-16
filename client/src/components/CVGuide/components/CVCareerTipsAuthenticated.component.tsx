import { memo } from 'react'
import { careerTips } from '../types/careerTipsData'
import type { AuthUser } from '../../../hooks/useAuthStatus.hook'

interface CVCareerTipsAuthenticatedProps {
  user: AuthUser
}

export const CVCareerTipsAuthenticated = memo<CVCareerTipsAuthenticatedProps>(({ user }) => (
  <>
    <div className="space-y-8">
      {careerTips.map((tip, index) => (
        <div 
          key={tip.id}
          className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-java-orange hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-start space-x-4">
            <div className="text-4xl">{tip.icon}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className="bg-java-orange text-white text-sm font-bold px-3 py-1 rounded-full">
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold text-gray-800">
                  {tip.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {tip.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-16 text-center bg-gradient-to-r from-java-blue to-java-orange rounded-xl p-8 text-white">
      <h2 className="text-2xl font-bold mb-4">
        Witaj {user.username}! Gotowy na swoją karierę w IT? ☕
      </h2>
      <p className="text-lg opacity-90 mb-6">
        Pamiętaj: każdy ekspert był kiedyś początkującym. Kluczem jest konsekwencja i ciągłe uczenie się!
      </p>
      <div className="flex justify-center space-x-4">
        <button 
          onClick={() => window.location.href = '/quizzes'}
          className="bg-white text-java-blue font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Sprawdź swoją wiedzę 🧪
        </button>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-java-orange/20 text-white font-bold py-3 px-6 rounded-lg hover:bg-java-orange/30 transition-colors border border-white/30"
        >
          Wróć do głównej ☕
        </button>
      </div>
    </div>
  </>
))

CVCareerTipsAuthenticated.displayName = 'CVCareerTipsAuthenticated' 