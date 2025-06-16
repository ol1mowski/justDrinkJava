import { memo } from 'react'
import { careerTips } from '../types/careerTipsData'

export const CVCareerTipsUnauthenticated = memo(() => (
  <div className="relative">
    <div className="blur-sm pointer-events-none">
      <div className="space-y-8">
        {careerTips.slice(0, 3).map((tip, index) => (
          <div 
            key={tip.id}
            className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-java-orange"
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
    </div>

    {/* Overlay z komunikatem o logowaniu */}
    <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-lg">
      <div className="text-center p-8 max-w-md">
        <div className="text-6xl mb-6">🔒</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Więcej porad czeka na Ciebie!
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          Aby zobaczyć więcej porad musisz się zalogować
        </p>
        
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-java-orange text-white font-bold py-3 px-8 rounded-lg hover:bg-java-orange/90 transition-colors"
          >
            Zaloguj się ☕
          </button>
          <button 
            onClick={() => window.location.href = '/register'}
            className="bg-java-blue text-white font-bold py-3 px-8 rounded-lg hover:bg-java-blue/90 transition-colors"
          >
            Zarejestruj się 🚀
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-bold text-gray-800 mb-2">Co zyskasz po zalogowaniu?</h4>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>✅ 10 sprawdzonych porad karrierowych</li>
            <li>✅ Dostęp do wszystkich quizów</li>
            <li>✅ Personalizowane rekomendacje</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
))

CVCareerTipsUnauthenticated.displayName = 'CVCareerTipsUnauthenticated' 