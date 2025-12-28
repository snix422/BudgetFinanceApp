import { api } from '../../lib/axiosClient';
import type { Budget } from '../../schemas/budgetSchema';
import {
  ExpenseSchema,
  ExpensesResponseSchema,
  type CreateExpenseDto,
  type Expense,
  type UpdateExpenseDto,
} from '../../schemas/expenseSchema';

export const getExpenses = async (): Promise<Expense[]> => {
  const res = await api.get('expenses');
  const parsedData = ExpensesResponseSchema.parse(res);
  return parsedData;
};

export const getExpenseById = async (id: number): Promise<Expense> => {
  const res = await api.get(`expenses/${id}`);
  const parsedData = ExpenseSchema.parse(res);
  return parsedData;
};

export const createExpense = async (newExpense: CreateExpenseDto): Promise<Budget> => {
  return await api.post(`expenses`, newExpense);
};

export const updateExpense = async (id: number, dto: UpdateExpenseDto): Promise<Expense> => {
  return await api.put(`expenses/${id}`, dto);
};

export const deleteExpense = async (id: number): Promise<void> => {
  return await api.delete(`expenses/${id}`);
};
