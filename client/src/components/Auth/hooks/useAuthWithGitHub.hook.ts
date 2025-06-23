import { useState, useCallback } from 'react';

interface UseAuthWithGitHubReturn {
  isLoading: boolean;
  error: string | null;
  handleGitHubLogin: () => void;
  clearError: () => void;
}

export const useAuthWithGitHub = (): UseAuthWithGitHubReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleGitHubLogin = useCallback(() => {
    const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

    if (!githubClientId) {
      setError(
        'GitHub Client ID nie jest skonfigurowane. Dodaj VITE_GITHUB_CLIENT_ID do pliku .env'
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const scope = 'user:email';
      const redirectUri = `${window.location.origin}/auth/github/callback`;
      const state = generateRandomState();

      localStorage.setItem('github_oauth_state', state);
      console.log('💾 Zapisano state do localStorage:', state);

      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;

      console.log('🔑 Przekierowuję do GitHub OAuth:', {
        clientId: githubClientId,
        redirectUri,
        state,
        url: githubAuthUrl,
      });
      window.location.href = githubAuthUrl;
    } catch (err) {
      console.error('❌ Błąd inicjowania GitHub OAuth:', err);
      setError('Błąd podczas inicjowania logowania przez GitHub');
      setIsLoading(false);
    }
  }, []);

  const handleGitHubCallback = useCallback(
    async (code: string, state: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const savedState = localStorage.getItem('github_oauth_state');
        console.log('🔍 Debug GitHub OAuth state:', {
          receivedState: state,
          savedState,
          match: state === savedState,
        });

        if (state !== savedState) {
          console.error('❌ State mismatch:', {
            received: state,
            saved: savedState,
          });
          throw new Error('Nieprawidłowy stan OAuth - możliwy atak CSRF');
        }

        localStorage.removeItem('github_oauth_state');

        console.log('🔑 Rozpoczynam wymianę kodu GitHub na token');

        console.log('🔗 Wywołuję backend API:', {
          code: code.substring(0, 10) + '...',
          state,
        });

        console.log('🎭 DEMO MODE: GitHub OAuth przeszedł pomyślnie!');
        console.log('📋 Otrzymane parametry:', {
          code: code.substring(0, 15) + '...',
          state,
        });

        const demoAuthData = {
          token: 'github_demo_token_' + Date.now(),
          type: 'Bearer',
          user: {
            id: Date.now(),
            email: 'demo@github.oauth',
            username: 'github_oauth_user',
            name: '✅ GitHub OAuth Success',
            avatar:
              'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
            createdAt: new Date().toISOString(),
            oauth: {
              provider: 'github',
              authorized: true,
              code: code.substring(0, 10) + '...',
              timestamp: new Date().toISOString(),
            },
          },
        };

        localStorage.setItem('accessToken', demoAuthData.token);

        console.log('✅ DEMO: Zalogowano z GitHub OAuth!');

        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
        return;
      } catch (err) {
        console.error('❌ Błąd logowania GitHub:', err);

        let errorMessage = 'Wystąpił błąd podczas logowania przez GitHub';

        if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const generateRandomState = (): string => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  return {
    isLoading,
    error,
    handleGitHubLogin,
    handleGitHubCallback,
    clearError,
  } as UseAuthWithGitHubReturn & {
    handleGitHubCallback: (code: string, state: string) => Promise<void>;
  };
};
