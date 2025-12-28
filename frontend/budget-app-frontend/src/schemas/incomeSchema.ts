import { z } from 'zod';

export const IncomeSchema = z.object({
  id: z.number(),
  title: z.string().trim().min(1, 'Tytuł jest wymagany'),
  amount: z.coerce.number().positive('Kwota musi być większa od zera'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Nieprawidłowy format daty',
  }),
  categoryId: z.coerce
    .number({ invalid_type_error: 'Wybierz kategorię' })
    .int()
    .positive('Musisz wybrać kategorię'),
  budgetId: z.coerce
    .number({ invalid_type_error: 'Błąd budżetu' })
    .int()
    .positive('Id budżetu jest wymagane'),
});

export type Income = z.infer<typeof IncomeSchema>;

export const IncomesResponseSchema = z.array(IncomeSchema);

export const CreateIncomeSchema = IncomeSchema.omit({ id: true });

export type CreateIncomeDto = z.infer<typeof CreateIncomeSchema>;

export const UpdateIncomeSchema = IncomeSchema.partial();

export type UpdateIncomeDto = z.infer<typeof UpdateIncomeSchema>;
