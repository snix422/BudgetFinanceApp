import { z } from 'zod';

export const BudgetSchema = z.object({
  id: z.number({
    required_error: 'Pole jest wymagane',
    invalid_type_error: 'Pole musi być liczbą',
  }),
  title: z.string().trim().min(1, 'Tytuł jest wymagany'),
  totalAmount: z.coerce
    .number({ invalid_type_error: 'Wpisz liczbę' })
    .positive('Kwota musi być dodatnia'),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Nieprawidłowy format daty',
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Nieprawidłowy format daty',
  }),
});

export type Budget = z.infer<typeof BudgetSchema>;

export const BudgetsReponseSchema = z.array(BudgetSchema);

export const CreateBudgetSchema = BudgetSchema.omit({ id: true });

export type CreateBudgetDto = Omit<Budget, 'id'>;

export type UpdateBudgetDto = Partial<CreateBudgetDto>;
