import { memo } from 'react'
import { UserPlusIcon, TrophyIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Button } from '../../ui'

interface LoginPromptCardProps {
  score: number
  correctAnswers: number
  onNavigateToLogin: () => void
}

export const LoginPromptCard = memo<LoginPromptCardProps>(({
  score,
  correctAnswers,
  onNavigateToLogin
}) => {
  const earnedPoints = Math.floor((score / 100) * correctAnswers * 5)

  return (
    <div className="bg-gradient-to-br from-java-orange/5 via-white to-java-orange/10 rounded-3xl shadow-xl border border-java-orange/20 p-8 mb-8">
      <div className="text-center">
        <div className="relative mx-auto mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-java-orange to-java-red rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <TrophyIcon className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">+{earnedPoints}</span>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold bg-gradient-to-r from-java-orange to-java-red bg-clip-text text-transparent mb-3">
          Świetny wynik! 🎉
        </h3>
        
        <p className="text-gray-600 leading-relaxed mb-6">
          Zdobyłbyś <span className="font-bold text-java-orange">{earnedPoints} punktów</span> za ten quiz! 
          Zaloguj się, aby zapisać swoje wyniki i rywalizować z innymi użytkownikami w rankingu.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-white/80 rounded-xl border border-gray-100">
            <div className="text-2xl font-bold text-java-orange">{earnedPoints}</div>
            <div className="text-sm text-gray-600">Punktów do zdobycia</div>
          </div>
          <div className="text-center p-4 bg-white/80 rounded-xl border border-gray-100">
            <div className="text-2xl font-bold text-green-600">🏆</div>
            <div className="text-sm text-gray-600">Ranking użytkowników</div>
          </div>
          <div className="text-center p-4 bg-white/80 rounded-xl border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">📊</div>
            <div className="text-sm text-gray-600">Statystyki postępów</div>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={onNavigateToLogin}
          rightIcon={<ArrowRightIcon className="w-5 h-5" />}
          className="bg-gradient-to-r from-java-orange to-java-red hover:from-java-red hover:to-java-orange shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <UserPlusIcon className="w-5 h-5 mr-2" />
          Zaloguj się i zbieraj punkty
        </Button>
        
        <p className="text-xs text-gray-500 mt-4">
          Darmowe konto • Bez opłat • Natychmiastowy dostęp
        </p>
      </div>
    </div>
  )
})

LoginPromptCard.displayName = 'LoginPromptCard' 