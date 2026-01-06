import { z } from 'zod';

export const IncomeSchema = z.object({
  id: z.number(),
  title: z.string(),
  amount: z.coerce.number(), // Bez walidacji logicznej, tylko typ
  date: z.string(), // Zakładamy, że backend wysyła poprawny ISO string
});

export const IncomeFormSchema = z.object({
  title: z.string().trim().min(1, 'Tytuł jest wymagany'),
  amount: z.coerce
    .number({ invalid_type_error: 'Wpisz liczbę' })
    .positive('Kwota musi być dodatnia'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Wybierz datę',
  }),
});

export type Income = z.infer<typeof IncomeSchema>;

export const IncomesResponseSchema = z.array(IncomeSchema);

export const CreateIncomeSchema = IncomeFormSchema;

export type CreateIncomeDto = z.infer<typeof CreateIncomeSchema>;

export const UpdateIncomeSchema = CreateIncomeSchema;

export type UpdateIncomeDto = z.infer<typeof UpdateIncomeSchema>;
