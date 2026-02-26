import { z } from 'zod';

export const BudgetSchema = z.object({
  id: z.number(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  totalSpent: z.coerce.number(),
  totalEarned: z.coerce.number(),
  remainingAmount: z.coerce.number(),
});

export type Budget = z.infer<typeof BudgetSchema>;

export const BudgetsReponseSchema = z.array(BudgetSchema);

const BudgetFormBase = z.object({
  title: z.string().trim().min(1, 'Tytuł jest wymagany'),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Wybierz datę początkową',
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Wybierz datę końcową',
  }),
});

export const CreateBudgetSchema = BudgetFormBase.refine(
  (data) => Date.parse(data.endDate) >= Date.parse(data.startDate),
  {
    message: 'Data końcowa musi być późniejsza niż początkowa',
    path: ['endDate'],
  },
);

export type CreateBudgetDto = z.infer<typeof CreateBudgetSchema>;

export const UpdateBudgetSchema = CreateBudgetSchema;

export type UpdateBudgetDto = z.infer<typeof UpdateBudgetSchema>;
