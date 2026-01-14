import { api } from '@/lib/axiosClient';
import { BudgetSchema, BudgetsReponseSchema, type Budget } from '@/schemas/budgetSchema';

export const getBudgetsByUserId = async (userId: string): Promise<Budget[]> => {
  const res = await api.get(`admin/users/${userId}/budgets`);
  const parsedData = BudgetsReponseSchema.parse(res);
  return parsedData;
};

export const getBudgetsByUserIdAndBudgetId = async (
  userId: string,
  budgetId: number,
): Promise<Budget> => {
  const res = await api.get(`admin/users/${userId}/budgets/${budgetId}`);
  const parsedData = BudgetSchema.parse(res);
  return parsedData;
};
