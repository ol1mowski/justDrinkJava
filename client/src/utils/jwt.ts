export interface JWTPayload {
  sub: string;
  iat: number;
  exp: number;
}

export interface UserFromToken {
  email: string;
  username: string;
}

export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];

    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);

    const decodedPayload = atob(paddedPayload);

    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Błąd podczas dekodowania JWT:', error);
    return null;
  }
};

export const getUserFromToken = (token: string): UserFromToken | null => {
  const payload = decodeJWT(token);
  if (!payload) {
    return null;
  }

  const emailOrUsername = payload.sub;

  const isEmail = emailOrUsername.includes('@');

  return {
    email: isEmail ? emailOrUsername : '',
    username: isEmail ? emailOrUsername.split('@')[0] : emailOrUsername,
  };
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token);
  if (!payload) {
    return true;
  }

  return payload.exp * 1000 < Date.now();
};

export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const setTokenToStorage = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const removeTokenFromStorage = (): void => {
  localStorage.removeItem('accessToken');
};
