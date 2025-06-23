import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LockClosedIcon,
  ArrowRightIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../../../ui';

interface UserRankingFooterProps {
  isAuthenticated: boolean;
}

export const UserRankingFooter = memo<UserRankingFooterProps>(
  ({ isAuthenticated }) => {
    const navigate = useNavigate();

    if (!isAuthenticated) {
      return (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl border border-blue-200/60 p-4 shadow-sm">
            <div className="flex items-center justify-center mb-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md">
                <LockClosedIcon className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">
                  Więcej pozycji w rankingu
                </p>
                <p className="text-xs text-gray-600">
                  Zaloguj się, aby zobaczyć pełną listę najlepszych użytkowników
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/login')}
                rightIcon={<ArrowRightIcon className="w-4 h-4" />}
                className="bg-gradient-to-r from-java-orange to-java-red hover:from-java-red hover:to-java-orange shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Zaloguj się
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/ranking')}
            rightIcon={<TrophyIcon className="w-4 h-4" />}
            className="text-java-orange hover:text-java-red hover:bg-orange-50 cursor-pointer"
          >
            Zobacz pełny ranking
          </Button>
        </div>
      </div>
    );
  }
);

UserRankingFooter.displayName = 'UserRankingFooter';
