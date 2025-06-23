import { memo } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export const PostsSectionFooter = memo(() => {
  return (
    <div className="text-center mt-12">
      <Link to="/posts">
        <button
          className="inline-flex items-center gap-2 px-8 py-4 bg-java-orange hover:bg-java-red 
                 text-white font-semibold rounded-xl transition-all duration-300 
                 hover:shadow-lg hover:shadow-java-orange/25 hover:-translate-y-1
                 focus:outline-none focus:ring-2 focus:ring-java-orange/50 focus:ring-offset-2
                 cursor-pointer"
        >
          <span>Zobacz wszystkie posty</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </Link>
      <p className="mt-4 text-sm text-java-blue/70 dark:text-java-dark-text-secondary">
        Odkryj więcej artykułów i poradników na naszej stronie
      </p>
    </div>
  );
});

PostsSectionFooter.displayName = 'PostsSectionFooter';
