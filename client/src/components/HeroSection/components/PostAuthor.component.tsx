import { memo } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import type { UserData } from '../../../api/types.api';

interface PostAuthorProps {
  user: UserData;
}

export const PostAuthor = memo<PostAuthorProps>(({ user }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full bg-gradient-to-r from-java-orange to-java-red 
                     flex items-center justify-center text-white font-medium text-sm"
      >
        {user.username.charAt(0).toUpperCase()}
      </div>
      <div>
        <div className="flex items-center gap-1 text-sm text-java-gray dark:text-java-dark-text">
          <UserIcon className="w-4 h-4" />
          <span className="font-medium">{user.username}</span>
        </div>
      </div>
    </div>
  );
});

PostAuthor.displayName = 'PostAuthor';
