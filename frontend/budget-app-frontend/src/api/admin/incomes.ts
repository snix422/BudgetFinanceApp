import { api } from '@/lib/axiosClient';
import type { UpdateIncomeDto } from '@/schemas/incomeSchema';

export const updateIncome = async (budgetId: number, incomeId: number, data: UpdateIncomeDto) => {
  return await api.put(`/admin/budgets/${budgetId}/incomes/${incomeId}`, data);
};

export const deleteIncome = async (budgetId: number, incomeId: number) => {
  await api.delete(`/admin/budgets/${budgetId}/incomes/${incomeId}`);
};
