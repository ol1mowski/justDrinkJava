import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LockClosedIcon,
  HomeIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/auth/useAuth.hook';
import { RankingSection } from '../../components/RankingSection';
import { Button } from '../../components/ui';

export const RankingPage = memo(() => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
            <div className="mb-8">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <LockClosedIcon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-java-orange to-java-red rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                Dostęp ograniczony
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Aby zobaczyć pełny ranking użytkowników i zdobywać punkty,
                musisz się zalogować do swojego konta.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => navigate('/login')}
                rightIcon={<ArrowRightIcon className="w-5 h-5" />}
                className="bg-gradient-to-r from-java-orange to-java-red hover:from-java-red hover:to-java-orange shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Zaloguj się
              </Button>

              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => navigate('/')}
                leftIcon={<HomeIcon className="w-5 h-5" />}
                className="border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 cursor-pointer"
              >
                Powrót do strony głównej
              </Button>
            </div>

            <div className="pt-6 border-t border-gray-200/60">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Top 3</span>
                </div>
                <span>•</span>
                <span>dostępne bez logowania na stronie głównej</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🏆 Ranking Użytkowników
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sprawdź najlepszych użytkowników naszej platformy. Zdobywaj punkty
            rozwiązując quizy i wspinaj się na szczyt rankingu!
          </p>
        </div>

        <RankingSection />
      </div>
    </div>
  );
});

RankingPage.displayName = 'RankingPage';
