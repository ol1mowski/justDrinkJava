import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { PostDetailHeader } from './PostDetailHeader.component';

interface PostDetailErrorProps {
  onBack: () => void;
  error?: Error | null;
}

export const PostDetailError = ({ onBack, error }: PostDetailErrorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-java-light-blue to-java-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PostDetailHeader onBack={onBack} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
        >
          <div className="flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full mx-auto">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Nie można załadować posta
          </h1>

          <p className="text-gray-600 mb-6">
            {error?.message ||
              'Post o podanym ID nie istnieje lub wystąpił błąd podczas ładowania.'}
          </p>

          <button
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-java-orange hover:bg-java-orange/90 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-java-orange transition-colors duration-200"
          >
            Powrót do postów
          </button>
        </motion.div>
      </div>
    </div>
  );
};
