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
  title: z.string().trim().min(1, 'Tytuł jest wymagany'),
  amount: z.coerce.number({ invalid_type_error: 'Wpisz liczbę' }).positive('Kwota jest wymagana'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Wybierz datę',
  }),
  categoryId: z
    .number({
      required_error: 'Kategoria jest wymagana',
      invalid_type_error: 'Kategoria jest wymagana', // To zadziała, jeśli user nic nie wybierze
    })
    .int()
    .positive({ message: 'Wybierz poprawną kategorię' }), // ID musi być > 0
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
