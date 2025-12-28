import { z } from 'zod';

export const ExpenseSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Tytuł jest wymagany'),
  amount: z.coerce.number().positive('Kwota musi być większa od zera'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Nieprawidłowy format daty',
  }),
  categoryId: z.coerce
    .number({ error: 'Wybierz kategorię' })
    .int()
    .positive('Musisz wybrać kategorię'),

  budgetId: z.coerce.number({ error: 'Błąd budżetu' }).int().positive('Id budżetu jest wymagane'),
});

export type Expense = z.infer<typeof ExpenseSchema>;

export const ExpensesResponseSchema = z.array(ExpenseSchema);

export const CreateExpenseSchema = ExpenseSchema.omit({ id: true });

export type CreateExpenseDto = z.infer<typeof CreateExpenseSchema>;

export const UpdateExpenseSchema = ExpenseSchema.partial();

export type UpdateExpenseDto = z.infer<typeof UpdateExpenseSchema>;
