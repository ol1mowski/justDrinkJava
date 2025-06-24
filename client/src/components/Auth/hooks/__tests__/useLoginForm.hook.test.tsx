import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useLoginForm } from '../useLoginForm.hook';

vi.mock('../../../../hooks/auth/useAuth.hook', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../../../../hooks/auth/useAuth.hook';

const mockUseAuth = useAuth as any;

Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

describe('useLoginForm', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.location.href = '';

    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: false,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with default form data', () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.formData).toEqual({
      email: '',
      password: '',
      rememberMe: false,
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isValid).toBe(false);
  });

  it('should update form field', () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
    });

    expect(result.current.formData.email).toBe('test@example.com');
  });

  it('should update boolean field', () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.updateField('rememberMe', true);
    });

    expect(result.current.formData.rememberMe).toBe(true);
  });

  it('should clear field error when updating field', () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handleSubmit();
    });

    expect(result.current.errors.email).toBeDefined();

    act(() => {
      result.current.updateField('email', 'test@example.com');
    });

    expect(result.current.errors.email).toBeUndefined();
  });

  it('should clear server error when updating field', async () => {
    const { result } = renderHook(() => useLoginForm());

    mockLogin.mockResolvedValue({
      success: false,
      error: 'Server error',
    });

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.server).toBe('Server error');

    act(() => {
      result.current.updateField('email', 'new@example.com');
    });

    expect(result.current.errors.server).toBeUndefined();
  });

  it('should validate form and show errors on submit', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.email).toBe('Email jest wymagany');
    expect(result.current.errors.password).toBe('Hasło jest wymagane');
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('should handle successful login', async () => {
    mockLogin.mockResolvedValue({
      success: true,
    });

    const mockOnSuccess = vi.fn();
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
    });

    await act(async () => {
      await result.current.handleSubmit(mockOnSuccess);
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(mockOnSuccess).toHaveBeenCalled();
    expect(window.location.href).toBe('/');
    expect(result.current.formData).toEqual({
      email: '',
      password: '',
      rememberMe: false,
    });
    expect(result.current.errors).toEqual({});
  });

  it('should handle login failure with specific errors', async () => {
    mockLogin.mockResolvedValue({
      success: false,
      errors: {
        email: 'Email nie istnieje',
        password: 'Nieprawidłowe hasło',
      },
    });

    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'wrongpassword');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.email).toBe('Email nie istnieje');
    expect(result.current.errors.password).toBe('Nieprawidłowe hasło');
    expect(window.location.href).toBe('');
  });

  it('should handle login failure with general error', async () => {
    mockLogin.mockResolvedValue({
      success: false,
      error: 'Nieprawidłowe dane logowania',
    });

    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.server).toBe('Nieprawidłowe dane logowania');
  });

  it('should handle unexpected error during login', async () => {
    mockLogin.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.server).toBe(
      'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.'
    );
  });

  it('should reset form', () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
    });

    act(() => {
      result.current.handleSubmit();
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual({
      email: '',
      password: '',
      rememberMe: false,
    });
    expect(result.current.errors).toEqual({});
  });

  it('should validate form correctly', () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
    });

    expect(result.current.isValid).toBe(true);
  });

  it('should reflect loading state from useAuth', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: true,
    });

    const { result } = renderHook(() => useLoginForm());

    expect(result.current.isLoading).toBe(true);
  });
});
