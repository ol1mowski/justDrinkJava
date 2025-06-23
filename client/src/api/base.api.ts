export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export class ApiNetworkError extends Error {
  constructor(message: string = 'Network error occurred') {
    super(message);
    this.name = 'ApiNetworkError';
  }
}

export class ApiValidationError extends Error {
  public errors: Record<string, string>;

  constructor(message: string, errors: Record<string, string> = {}) {
    super(message);
    this.name = 'ApiValidationError';
    this.errors = errors;
  }
}

export class ApiAuthenticationError extends Error {
  constructor(message: string = 'Authentication required') {
    super(message);
    this.name = 'ApiAuthenticationError';
  }
}

export class ApiAuthorizationError extends Error {
  constructor(message: string = 'Access denied') {
    super(message);
    this.name = 'ApiAuthorizationError';
  }
}

export class ApiNotFoundError extends Error {
  constructor(message: string = 'Resource not found') {
    super(message);
    this.name = 'ApiNotFoundError';
  }
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('accessToken');
};

export const buildUrl = (
  endpoint: string,
  params?: Record<string, string | number>
): string => {
  const url = new URL(endpoint, API_CONFIG.BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value.toString());
    });
  }

  return url.toString();
};
