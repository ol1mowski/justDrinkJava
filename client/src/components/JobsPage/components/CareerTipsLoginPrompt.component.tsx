import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  UserPlusIcon, 
  BriefcaseIcon, 
  ArrowRightIcon,
  StarIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { Button } from '../../ui'

export const CareerTipsLoginPrompt = memo(() => {
  const navigate = useNavigate()

  const handleNavigateToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="bg-gradient-to-br from-java-orange/5 via-white to-java-orange/10 rounded-3xl shadow-xl border border-java-orange/20 p-8">
      <div className="text-center">
        <div className="relative mx-auto mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-java-orange to-java-red rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <BriefcaseIcon className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <StarIcon className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <h3 className="text-3xl font-bold bg-gradient-to-r from-java-orange to-java-red bg-clip-text text-transparent mb-4">
          Ekskluzywne Porady Kariery 🚀
        </h3>
        
        <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
          Odkryj szczegółowy przewodnik <span className="font-bold text-java-orange">6 kroków do pierwszej pracy</span> jako Java Developer. 
          Praktyczne porady od doświadczonych programistów, które pomogą Ci zdobyć wymarzoną pozycję w IT.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-white/80 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-java-orange/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <BriefcaseIcon className="w-6 h-6 text-java-orange" />
            </div>
            <div className="text-lg font-bold text-java-gray mb-2">Portfolio & Projekty</div>
            <div className="text-sm text-gray-600">Jak stworzyć portfolio, które przyciągnie pracodawców</div>
          </div>
          
          <div className="text-center p-6 bg-white/80 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-java-orange/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <ChartBarIcon className="w-6 h-6 text-java-orange" />
            </div>
            <div className="text-lg font-bold text-java-gray mb-2">Umiejętności Techniczne</div>
            <div className="text-sm text-gray-600">Jakie technologie opanować i w jakiej kolejności</div>
          </div>
          
          <div className="text-center p-6 bg-white/80 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-java-orange/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserGroupIcon className="w-6 h-6 text-java-orange" />
            </div>
            <div className="text-lg font-bold text-java-gray mb-2">Networking & Społeczność</div>
            <div className="text-sm text-gray-600">Jak budować kontakty w branży IT</div>
          </div>
        </div>

        <div className="bg-java-orange/5 rounded-2xl p-6 mb-8">
          <h4 className="text-xl font-semibold text-java-gray mb-3">
            🎯 Co zyskujesz po zalogowaniu:
          </h4>
          <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-java-orange rounded-full mr-3"></span>
              Dostęp do wszystkich porad kariery
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-java-orange rounded-full mr-3"></span>
              Ekskluzywne treści dla zalogowanych
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-java-orange rounded-full mr-3"></span>
              Możliwość zapisywania ulubionych artykułów
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-java-orange rounded-full mr-3"></span>
              Udział w quizach i rankingach
            </li>
          </ul>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleNavigateToLogin}
          rightIcon={<ArrowRightIcon className="w-5 h-5" />}
          className="bg-gradient-to-r from-java-orange to-java-red hover:from-java-red hover:to-java-orange shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <UserPlusIcon className="w-5 h-5 mr-2" />
          Zaloguj się i odkryj porady
        </Button>
        
        <p className="text-xs text-gray-500 mt-4">
          Darmowe konto • Bez opłat • Natychmiastowy dostęp do wszystkich treści
        </p>
      </div>
    </div>
  )
})

CareerTipsLoginPrompt.displayName = 'CareerTipsLoginPrompt' 