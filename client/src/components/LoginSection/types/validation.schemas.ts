import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email jest wymagany')
    .email('Email musi mieć poprawny format'),
  password: z
    .string()
    .min(1, 'Hasło jest wymagane')
    .min(8, 'Hasło musi mieć minimum 8 znaków'),
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email jest wymagany')
    .email('Email musi mieć poprawny format'),
  password: z
    .string()
    .min(1, 'Hasło jest wymagane')
    .min(8, 'Hasło musi mieć minimum 8 znaków')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Hasło musi zawierać małą literę, wielką literę i cyfrę'
    ),
  firstName: z
    .string()
    .min(1, 'Imię jest wymagane')
    .min(2, 'Imię musi mieć minimum 2 znaki')
    .max(50, 'Imię może mieć maksymalnie 50 znaków'),
  lastName: z
    .string()
    .min(1, 'Nazwisko jest wymagane')
    .min(2, 'Nazwisko musi mieć minimum 2 znaki')
    .max(50, 'Nazwisko może mieć maksymalnie 50 znaków'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>; 