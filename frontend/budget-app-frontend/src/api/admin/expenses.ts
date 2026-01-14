// src/api/admin/expenses.ts

import { api } from '@/lib/axiosClient';
import type { UpdateExpenseDto } from '@/schemas/expenseSchema';

// Zwróć uwagę, że nazwy funkcji mogą być krótkie, bo import wskazuje, że to admin
// import { updateExpense } from 'api/admin/expenses'

export const updateExpense = async (
  budgetId: number,
  expenseId: number,
  data: UpdateExpenseDto,
) => {
  // Endpoint admina
  return await api.put(`/admin/budgets/${budgetId}/expenses/${expenseId}`, data);
};

export const deleteExpense = async (budgetId: number, expenseId: number) => {
  // Endpoint admina
  await api.delete(`/admin/budgets/${budgetId}/expenses/${expenseId}`);
};
