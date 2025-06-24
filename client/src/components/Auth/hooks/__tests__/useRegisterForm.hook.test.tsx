import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useRegisterForm } from '../useRegisterForm.hook';

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

describe('useRegisterForm', () => {
  const mockRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.location.href = '';

    mockUseAuth.mockReturnValue({
      register: mockRegister,
      isLoading: false,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with default form data', () => {
    const { result } = renderHook(() => useRegisterForm());

    expect(result.current.formData).toEqual({
      email: '',
      password: '',
      confirmPassword: '',
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isValid).toBe(false);
  });

  it('should update form field', () => {
    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
    });

    expect(result.current.formData.email).toBe('test@example.com');
  });

  it('should clear field error when updating field', () => {
    const { result } = renderHook(() => useRegisterForm());

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
    const { result } = renderHook(() => useRegisterForm());

    mockRegister.mockResolvedValue({
      success: false,
      error: 'Server error',
    });

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
      result.current.updateField('confirmPassword', 'password123');
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
    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.email).toBe('Email jest wymagany');
    expect(result.current.errors.password).toBe('Hasło jest wymagane');
    expect(result.current.errors.confirmPassword).toBe(
      'Potwierdzenie hasła jest wymagane'
    );
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should validate password confirmation', async () => {
    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
      result.current.updateField('confirmPassword', 'differentpassword');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.confirmPassword).toBe(
      'Hasła nie są identyczne'
    );
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should handle successful registration', async () => {
    mockRegister.mockResolvedValue({
      success: true,
    });

    const mockOnSuccess = vi.fn();
    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
      result.current.updateField('confirmPassword', 'password123');
    });

    await act(async () => {
      await result.current.handleSubmit(mockOnSuccess);
    });

    expect(mockRegister).toHaveBeenCalledWith({
      username: 'test',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(mockOnSuccess).toHaveBeenCalled();
    expect(window.location.href).toBe('/');
    expect(result.current.formData).toEqual({
      email: '',
      password: '',
      confirmPassword: '',
    });
    expect(result.current.errors).toEqual({});
  });

  it('should generate username from email', async () => {
    mockRegister.mockResolvedValue({
      success: true,
    });

    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.updateField('email', 'john.doe@example.com');
      result.current.updateField('password', 'password123');
      result.current.updateField('confirmPassword', 'password123');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockRegister).toHaveBeenCalledWith(
      expect.objectContaining({
        username: 'john.doe',
      })
    );
  });

  it('should handle registration failure with specific errors', async () => {
    mockRegister.mockResolvedValue({
      success: false,
      errors: {
        email: 'Email już istnieje',
        password: 'Hasło zbyt słabe',
      },
    });

    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123'); // Valid password to avoid validation error
      result.current.updateField('confirmPassword', 'password123');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors).toEqual({
      email: 'Email już istnieje',
      password: 'Hasło zbyt słabe',
    });
    expect(window.location.href).toBe('');
  });

  it('should handle registration failure with general error', async () => {
    mockRegister.mockResolvedValue({
      success: false,
      error: 'Błąd rejestracji',
    });

    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
      result.current.updateField('confirmPassword', 'password123');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.server).toBe('Błąd rejestracji');
  });

  it('should handle unexpected error during registration', async () => {
    mockRegister.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
      result.current.updateField('confirmPassword', 'password123');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.errors.server).toBe(
      'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.'
    );
  });

  it('should reset form', () => {
    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
      result.current.updateField('confirmPassword', 'password123');
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
      confirmPassword: '',
    });
    expect(result.current.errors).toEqual({});
  });

  it('should validate form correctly', () => {
    const { result } = renderHook(() => useRegisterForm());

    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.updateField('email', 'test@example.com');
      result.current.updateField('password', 'password123');
      result.current.updateField('confirmPassword', 'different');
    });

    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.updateField('confirmPassword', 'password123');
    });

    expect(result.current.isValid).toBe(true);
  });

  it('should reflect loading state from useAuth', () => {
    mockUseAuth.mockReturnValue({
      register: mockRegister,
      isLoading: true,
    });

    const { result } = renderHook(() => useRegisterForm());

    expect(result.current.isLoading).toBe(true);
  });
});
