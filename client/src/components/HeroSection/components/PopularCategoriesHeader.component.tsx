import { memo } from 'react';
import { FolderIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export const PopularCategoriesHeader = memo(() => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-java-orange/10 rounded-lg">
          <FolderIcon className="w-5 h-5 text-java-orange" />
        </div>
        <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text">
          Popularne kategorie
        </h3>
      </div>
      <ChartBarIcon className="w-5 h-5 text-java-orange" />
    </div>
  );
});

PopularCategoriesHeader.displayName = 'PopularCategoriesHeader';
