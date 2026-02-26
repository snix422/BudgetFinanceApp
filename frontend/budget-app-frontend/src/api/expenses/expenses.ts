import { api } from '../../lib/axiosClient';
import type { Budget } from '../../schemas/budgetSchema';
import {
  ExpenseSchema,
  ExpensesResponseSchema,
  type CreateExpenseDto,
  type Expense,
  type UpdateExpenseDto,
} from '../../schemas/expenseSchema';

export const getExpenses = async (budgetId: number): Promise<Expense[]> => {
  const res = await api.get(`budgets/${budgetId}/expenses`);
  const parsedData = ExpensesResponseSchema.parse(res);
  return parsedData;
};

export const getExpenseById = async (id: number, budgetId: number): Promise<Expense> => {
  const res = await api.get(`budgets/${budgetId}/expenses/${id}`);
  const parsedData = ExpenseSchema.parse(res);
  return parsedData;
};

export const createExpense = async (
  newExpense: CreateExpenseDto,
  budgetId: number,
): Promise<Budget> => {
  return await api.post(`budgets/${budgetId}/expenses`, newExpense);
};

export const updateExpense = async (
  id: number,
  dto: UpdateExpenseDto,
  budgetId: number,
): Promise<Expense> => {
  return await api.put(`budgets/${budgetId}/expenses/${id}`, dto);
};

export const deleteExpense = async (id: number, budgetId: number): Promise<void> => {
  return await api.delete(`budgets/${budgetId}/expenses/${id}`);
};
