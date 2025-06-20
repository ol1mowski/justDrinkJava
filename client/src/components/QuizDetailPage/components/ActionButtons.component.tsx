import { memo } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface ActionButtonsProps {
  onRestart: () => void;
}

export const ActionButtons = memo<ActionButtonsProps>(({ onRestart }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <button
        onClick={onRestart}
        className="inline-flex items-center justify-center space-x-3 px-10 py-4 bg-gradient-to-r from-java-orange to-java-red 
                   hover:from-java-red hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-200 
                   cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105
                   focus:outline-none focus:ring-4 focus:ring-java-orange/50"
      >
        <ArrowPathIcon className="w-6 h-6" />
        <span className="text-lg">Spróbuj ponownie</span>
      </button>

      <button
        onClick={() => (window.location.href = "/quizzes")}
        className="inline-flex items-center justify-center space-x-3 px-10 py-4 bg-white hover:bg-gray-50 
                   text-gray-700 font-semibold rounded-xl transition-all duration-200 cursor-pointer
                   shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-gray-200 hover:border-gray-300
                   focus:outline-none focus:ring-4 focus:ring-gray-300/50"
      >
        <span className="text-lg">Powrót do quizów</span>
      </button>
    </div>
  );
});

ActionButtons.displayName = 'ActionButtons'; 