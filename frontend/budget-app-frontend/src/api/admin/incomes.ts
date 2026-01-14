import { api } from '@/lib/axiosClient';
import type { UpdateExpenseDto } from '@/schemas/expenseSchema';
import type { UpdateIncomeDto } from '@/schemas/incomeSchema';

// Zwróć uwagę, że nazwy funkcji mogą być krótkie, bo import wskazuje, że to admin
// import { updateExpense } from 'api/admin/expenses'

export const updateIncome = async (budgetId: number, incomeId: number, data: UpdateIncomeDto) => {
  // Endpoint admina
  return await api.put(`/admin/budgets/${budgetId}/incomes/${incomeId}`, data);
};

export const deleteIncome = async (budgetId: number, incomeId: number) => {
  // Endpoint admina
  await api.delete(`/admin/budgets/${budgetId}/expenses/${incomeId}`);
};
