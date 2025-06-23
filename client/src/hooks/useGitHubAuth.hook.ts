import { useCallback } from 'react';

export interface GitHubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  html_url: string;
}

interface UseGitHubAuthOptions {
  onSuccess: (user: GitHubUser) => Promise<void>;
  onError: (error: string) => void;
  clientId?: string;
}

export const useGitHubAuth = ({
  onSuccess,
  onError,
  clientId,
}: UseGitHubAuthOptions) => {
  const initiateGitHubAuth = useCallback(() => {
    const githubClientId = clientId || import.meta.env.VITE_GITHUB_CLIENT_ID;

    if (!githubClientId) {
      onError(
        'GitHub Client ID nie jest skonfigurowane. Dodaj VITE_GITHUB_CLIENT_ID do pliku .env'
      );
      return;
    }

    const scope = 'user:email';
    const redirectUri = window.location.origin + '/auth/github/callback';
    const state = generateRandomState();

    localStorage.setItem('github_oauth_state', state);

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;

    window.location.href = githubAuthUrl;
  }, [clientId, onError]);

  const handleGitHubCallback = useCallback(
    async (code: string, state: string) => {
      try {
        const savedState = localStorage.getItem('github_oauth_state');
        if (state !== savedState) {
          throw new Error('Nieprawidłowy stan OAuth - możliwy atak CSRF');
        }

        localStorage.removeItem('github_oauth_state');

        const response = await fetch('/api/auth/github/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state }),
        });

        if (!response.ok) {
          throw new Error('Błąd podczas wymiany kodu na token');
        }

        const userData: GitHubUser = await response.json();
        await onSuccess(userData);
      } catch (error) {
        console.error('Błąd GitHub OAuth callback:', error);
        onError(
          error instanceof Error
            ? error.message
            : 'Błąd podczas logowania przez GitHub'
        );
      }
    },
    [onSuccess, onError]
  );

  const generateRandomState = (): string => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  return {
    initiateGitHubAuth,
    handleGitHubCallback,
  };
};
