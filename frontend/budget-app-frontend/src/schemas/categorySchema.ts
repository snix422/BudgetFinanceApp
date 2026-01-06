import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Tytuł jest wymagany' })
    .max(50, { message: 'Tytuł jest za długi' }),

  rule: z
    .number({ invalid_type_error: 'Podaj poprawną liczbę' })
    .min(1, { message: 'Liczba musi być większa od 0' }),
});

export type Category = z.infer<typeof categorySchema>;

export const CategoryResponse = z.array(categorySchema);
