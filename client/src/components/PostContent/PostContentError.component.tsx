import { motion } from 'framer-motion';
import {
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { PostContentApiError } from '../../api/postContent.api';

interface PostContentErrorProps {
  error: PostContentApiError | Error | null;
  onRetry?: () => void;
  className?: string;
}

export const PostContentError = ({
  error,
  onRetry,
  className = '',
}: PostContentErrorProps) => {
  const getErrorMessage = (
    error: PostContentApiError | Error | null
  ): string => {
    if (!error) return 'Wystąpił nieznany błąd';

    if (error instanceof PostContentApiError) {
      switch (error.status) {
        case 404:
          return 'Zawartość posta nie została znaleziona';
        case 500:
          return 'Błąd serwera. Spróbuj ponownie później';
        case 403:
          return 'Brak uprawnień do wyświetlenia tego contentu';
        default:
          return error.message || 'Błąd podczas ładowania contentu';
      }
    }

    return error.message || 'Wystąpił nieoczekiwany błąd';
  };

  const getErrorTitle = (error: PostContentApiError | Error | null): string => {
    if (!error) return 'Błąd';

    if (error instanceof PostContentApiError) {
      switch (error.status) {
        case 404:
          return 'Nie znaleziono';
        case 500:
          return 'Błąd serwera';
        case 403:
          return 'Brak dostępu';
        default:
          return 'Błąd ładowania';
      }
    }

    return 'Błąd';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-8 text-center bg-red-50 border border-red-200 rounded-lg ${className}`}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full">
        <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {getErrorTitle(error)}
      </h3>

      <p className="text-gray-600 mb-6 max-w-md">{getErrorMessage(error)}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-java-orange hover:bg-java-orange/90 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-java-orange transition-colors duration-200"
        >
          <ArrowPathIcon className="w-4 h-4 mr-2" />
          Spróbuj ponownie
        </button>
      )}

      {error instanceof PostContentApiError && (
        <details className="mt-4 text-xs text-gray-500">
          <summary className="cursor-pointer hover:text-gray-700">
            Szczegóły błędu
          </summary>
          <div className="mt-2 p-2 bg-gray-100 rounded text-left">
            <p>
              <strong>Status:</strong> {error.status}
            </p>
            <p>
              <strong>Błąd:</strong> {error.error}
            </p>
            <p>
              <strong>Ścieżka:</strong> {error.path}
            </p>
            <p>
              <strong>Czas:</strong>{' '}
              {new Date(error.timestamp).toLocaleString('pl-PL')}
            </p>
          </div>
        </details>
      )}
    </motion.div>
  );
};
