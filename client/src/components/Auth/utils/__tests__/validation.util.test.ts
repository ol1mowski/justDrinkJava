import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateLoginForm,
  validateRegisterForm,
  VALIDATION_RULES,
} from '../validation.util';

describe('validation.util', () => {
  describe('VALIDATION_RULES', () => {
    it('should have correct validation rules', () => {
      expect(VALIDATION_RULES.email.required).toBe('Email jest wymagany');
      expect(VALIDATION_RULES.email.pattern.message).toBe(
        'Nieprawidłowy format email'
      );
      expect(VALIDATION_RULES.password.required).toBe('Hasło jest wymagane');
      expect(VALIDATION_RULES.password.minLength.value).toBe(8);
      expect(VALIDATION_RULES.password.minLength.message).toBe(
        'Hasło musi mieć minimum 8 znaków'
      );
      expect(VALIDATION_RULES.confirmPassword.required).toBe(
        'Potwierdzenie hasła jest wymagane'
      );
    });
  });

  describe('validateEmail', () => {
    it('should return error for empty email', () => {
      expect(validateEmail('')).toBe('Email jest wymagany');
    });

    it('should return error for invalid email format', () => {
      expect(validateEmail('invalid-email')).toBe('Nieprawidłowy format email');
      expect(validateEmail('test@')).toBe('Nieprawidłowy format email');
      expect(validateEmail('test@domain')).toBe('Nieprawidłowy format email');
      expect(validateEmail('@domain.com')).toBe('Nieprawidłowy format email');
    });

    it('should return null for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(null);
      expect(validateEmail('user.name@domain.co.uk')).toBe(null);
      expect(validateEmail('user+tag@example.org')).toBe(null);
    });
  });

  describe('validatePassword', () => {
    it('should return error for empty password', () => {
      expect(validatePassword('')).toBe('Hasło jest wymagane');
    });

    it('should return error for password shorter than 8 characters', () => {
      expect(validatePassword('short')).toBe(
        'Hasło musi mieć minimum 8 znaków'
      );
      expect(validatePassword('1234567')).toBe(
        'Hasło musi mieć minimum 8 znaków'
      );
    });

    it('should return null for valid password', () => {
      expect(validatePassword('password123')).toBe(null);
      expect(validatePassword('12345678')).toBe(null);
      expect(validatePassword('verylongpassword')).toBe(null);
    });
  });

  describe('validateConfirmPassword', () => {
    it('should return error for empty confirm password', () => {
      expect(validateConfirmPassword('password123', '')).toBe(
        'Potwierdzenie hasła jest wymagane'
      );
    });

    it('should return error when passwords do not match', () => {
      expect(validateConfirmPassword('password123', 'different')).toBe(
        'Hasła nie są identyczne'
      );
      expect(validateConfirmPassword('password', 'Password')).toBe(
        'Hasła nie są identyczne'
      );
    });

    it('should return null when passwords match', () => {
      expect(validateConfirmPassword('password123', 'password123')).toBe(null);
      expect(validateConfirmPassword('', '')).toBe(
        'Potwierdzenie hasła jest wymagane'
      ); // Both empty
    });
  });

  describe('validateLoginForm', () => {
    it('should return errors for empty form', () => {
      const errors = validateLoginForm({
        email: '',
        password: '',
        rememberMe: false,
      });

      expect(errors.email).toBe('Email jest wymagany');
      expect(errors.password).toBe('Hasło jest wymagane');
    });

    it('should return email error for invalid email', () => {
      const errors = validateLoginForm({
        email: 'invalid-email',
        password: 'password123',
        rememberMe: false,
      });

      expect(errors.email).toBe('Nieprawidłowy format email');
      expect(errors.password).toBeUndefined();
    });

    it('should return password error for short password', () => {
      const errors = validateLoginForm({
        email: 'test@example.com',
        password: 'short',
        rememberMe: false,
      });

      expect(errors.email).toBeUndefined();
      expect(errors.password).toBe('Hasło musi mieć minimum 8 znaków');
    });

    it('should return no errors for valid form', () => {
      const errors = validateLoginForm({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      });

      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('should return multiple errors for invalid form', () => {
      const errors = validateLoginForm({
        email: 'invalid',
        password: 'short',
        rememberMe: false,
      });

      expect(errors.email).toBe('Nieprawidłowy format email');
      expect(errors.password).toBe('Hasło musi mieć minimum 8 znaków');
    });
  });

  describe('validateRegisterForm', () => {
    it('should return errors for empty form', () => {
      const errors = validateRegisterForm({
        email: '',
        password: '',
        confirmPassword: '',
      });

      expect(errors.email).toBe('Email jest wymagany');
      expect(errors.password).toBe('Hasło jest wymagane');
      expect(errors.confirmPassword).toBe('Potwierdzenie hasła jest wymagane');
    });

    it('should return error for mismatched passwords', () => {
      const errors = validateRegisterForm({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'different',
      });

      expect(errors.email).toBeUndefined();
      expect(errors.password).toBeUndefined();
      expect(errors.confirmPassword).toBe('Hasła nie są identyczne');
    });

    it('should return no errors for valid form', () => {
      const errors = validateRegisterForm({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });

      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('should return multiple errors for invalid form', () => {
      const errors = validateRegisterForm({
        email: 'invalid',
        password: 'short',
        confirmPassword: 'different',
      });

      expect(errors.email).toBe('Nieprawidłowy format email');
      expect(errors.password).toBe('Hasło musi mieć minimum 8 znaków');
      expect(errors.confirmPassword).toBe('Hasła nie są identyczne');
    });

    it('should handle empty confirm password with valid password', () => {
      const errors = validateRegisterForm({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: '',
      });

      expect(errors.confirmPassword).toBe('Potwierdzenie hasła jest wymagane');
    });
  });
});
