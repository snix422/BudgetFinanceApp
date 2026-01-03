import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email jest wymagany')
    .min(6, 'Email musi mieć co najmniej 6 znaków')
    .email('Niepoprawny format adresu email'),
  password: z.string().min(1, 'Hasło jest wymagane').min(6, 'Hasło musi mieć co najmniej 6 znaków'),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
