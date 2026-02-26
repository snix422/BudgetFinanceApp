import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email jest wymagany')
      .min(6, 'Email musi mieć co najmniej 6 znaków')
      .email('Niepoprawny format adresu email'),
    password: z
      .string()
      .min(1, 'Hasło jest wymagane')
      .min(6, 'Hasło musi mieć co najmniej 6 znaków'),
    confirmPassword: z
      .string()
      .min(1, 'Pole potwierdź hasło jest wymagane')
      .min(6, 'Pole potwierdź hasło musi mieć co najmniej 6 znaków'),
    firstName: z
      .string()
      .min(1, 'Imię jest wymagane')
      .min(3, 'Imię musi mieć co najmniej 3 znaków'),
    lastName: z.string().min(1, 'Imię jest wymagane').min(3, 'Imię musi mieć co najmniej 3 znaków'),
    phone: z
      .string()
      .length(9, 'Numer telefonu musi mieć dokładnie 9 cyfr')
      .regex(/^\d+$/, 'Numer telefonu może zawierać tylko cyfry'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła muszą być identyczne',
    path: ['confirmPasswor'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
