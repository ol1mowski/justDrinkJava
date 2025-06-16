export interface JWTPayload {
  sub: string; // email lub username
  iat: number; // issued at
  exp: number; // expiration
}

export interface UserFromToken {
  email: string;
  username: string;
}

export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    // Dzielę token na części
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Dekoduję payload (środkową część)
    const payload = parts[1];
    
    // Dodaję padding jeśli potrzebny
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    
    // Dekoduję base64
    const decodedPayload = atob(paddedPayload);
    
    // Parsuje JSON
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

  // sub zawiera email lub username
  const emailOrUsername = payload.sub;
  
  // Sprawdzam czy to email czy username
  const isEmail = emailOrUsername.includes('@');
  
  return {
    email: isEmail ? emailOrUsername : '',
    username: isEmail ? emailOrUsername.split('@')[0] : emailOrUsername
  };
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token);
  if (!payload) {
    return true;
  }

  // exp jest w sekundach, Date.now() w milisekundach
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