import { api } from '@/lib/axiosClient';
import type { UpdateExpenseDto } from '@/schemas/expenseSchema';

export const updateExpense = async (
  budgetId: number,
  expenseId: number,
  data: UpdateExpenseDto,
) => {
  return await api.put(`/admin/budgets/${budgetId}/expenses/${expenseId}`, data);
};

export const deleteExpense = async (budgetId: number, expenseId: number) => {
  await api.delete(`/admin/budgets/${budgetId}/expenses/${expenseId}`);
};
