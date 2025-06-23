import { memo } from 'react';

interface PostActionsProps {
  onReadMore?: () => void;
}

export const PostActions = memo<PostActionsProps>(({ onReadMore }) => {
  return (
    <button
      onClick={onReadMore}
      className="inline-flex items-center px-4 py-2 bg-java-orange hover:bg-java-red 
               text-white font-medium rounded-lg transition-colors duration-200 
               focus:outline-none focus:ring-2 focus:ring-java-orange/50
               cursor-pointer"
    >
      Czytaj dalej →
    </button>
  );
});

PostActions.displayName = 'PostActions';
