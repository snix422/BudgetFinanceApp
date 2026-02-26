import { z } from 'zod';

export const ExpenseSchema = z.object({
  id: z.number(),
  title: z.string(),
  amount: z.coerce.number(),
  date: z.string(),
  categoryId: z.coerce.number(),
  categoryName: z.string(),
  categoryRule: z.number(),
});

export const ExpenseFormSchema = z.object({
  title: z.string().trim().min(1, 'Nazwa wydatku jest  wymagana'),
  amount: z.coerce.number({ invalid_type_error: 'Wpisz liczbę' }).positive('Kwota jest wymagana'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Wybierz datę',
  }),
  categoryId: z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? 0 : Number(val)),
    z.number().gt(0, { message: 'Kategoria jest wymagana' }),
  ),
});

export type Expense = z.infer<typeof ExpenseSchema>;

export const ExpensesResponseSchema = z.array(ExpenseSchema);

export const CreateExpenseSchema = ExpenseFormSchema;

export type CreateExpenseDto = z.infer<typeof CreateExpenseSchema>;

export const UpdateExpenseSchema = CreateExpenseSchema;

export type UpdateExpenseDto = z.infer<typeof UpdateExpenseSchema>;

//export const CreateExpenseSchema = ExpenseSchema.omit({ id: true });

//export type CreateExpenseDto = z.infer<typeof CreateExpenseSchema>;

//export const UpdateExpenseSchema = ExpenseSchema.partial();

//export type UpdateExpenseDto = z.infer<typeof UpdateExpenseSchema>;
