import { memo } from 'react';
import { LockClosedIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import type { AuthHeaderProps } from '../types';

export const AuthHeader = memo<AuthHeaderProps>(({ isRegisterMode }) => (
  <div className="text-center mb-8">
    <div className="w-16 h-16 bg-java-orange rounded-full flex items-center justify-center mx-auto mb-6">
      {isRegisterMode ? (
        <UserPlusIcon className="w-8 h-8 text-white" />
      ) : (
        <LockClosedIcon className="w-8 h-8 text-white" />
      )}
    </div>
    <h2 className="text-3xl font-bold text-gray-900 mb-2">
      {isRegisterMode ? 'Dołącz do nas!' : 'Witaj ponownie!'}
    </h2>
    <p className="text-gray-600">
      {isRegisterMode
        ? 'Stwórz swoje konto w Just Drink Java'
        : 'Zaloguj się do swojego konta'}
    </p>
  </div>
));

AuthHeader.displayName = 'AuthHeader';
