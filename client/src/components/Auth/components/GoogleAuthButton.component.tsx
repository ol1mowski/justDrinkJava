import { memo, useEffect } from 'react';
import { useGoogleAuth } from '../../../hooks/useGoogleAuth.hook';
import type { GoogleUser } from '../../../hooks/useGoogleAuth.hook';

interface GoogleAuthButtonProps {
  onSuccess: (user: GoogleUser, token: string) => Promise<void>;
  onError: (error: string) => void;
  isLoading?: boolean;
  className?: string;
}

export const GoogleAuthButton = memo<GoogleAuthButtonProps>(
  ({ onSuccess, onError, isLoading = false, className = '' }) => {
    const {
      buttonRef,
      initializeGoogleAuth,
      renderGoogleButton,
      isGoogleLoaded,
    } = useGoogleAuth({
      onSuccess,
      onError,
    });

    useEffect(() => {
      const initGoogle = () => {
        if (isGoogleLoaded()) {
          initializeGoogleAuth();
          renderGoogleButton({
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            width: '100%',
            locale: 'pl',
          });
        }
      };

      if (isGoogleLoaded()) {
        initGoogle();
      } else {
        const checkGoogleLoaded = setInterval(() => {
          if (isGoogleLoaded()) {
            clearInterval(checkGoogleLoaded);
            initGoogle();
          }
        }, 100);

        return () => clearInterval(checkGoogleLoaded);
      }
    }, [initializeGoogleAuth, renderGoogleButton, isGoogleLoaded]);

    if (isLoading) {
      return (
        <div
          className={`flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-gray-50 ${className}`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Ładowanie...</span>
          </div>
        </div>
      );
    }

    return (
      <div className={className}>
        <div ref={buttonRef} />
      </div>
    );
  }
);

GoogleAuthButton.displayName = 'GoogleAuthButton';
