import { memo } from 'react';
import { RankingSection } from '../../components/RankingSection';

export const RankingPage = memo(() => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🏆 Ranking Użytkowników
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sprawdź najlepszych użytkowników naszej platformy. Zdobywaj punkty rozwiązując quizy i wspinaj się na szczyt rankingu!
          </p>
        </div>
        
        <RankingSection />
      </div>
    </div>
  );
});

RankingPage.displayName = 'RankingPage'; 