import z from 'zod';
import { api } from '../../lib/axiosClient';
import {
  BudgetSchema,
  type Budget,
  type CreateBudgetDto,
  type UpdateBudgetDto,
} from '../../schemas/budgetSchema';

const budgetResponseSchema = z.array(BudgetSchema);

export const getBudgets = async (): Promise<Budget[]> => {
  const res = await api.get('budgets');
  const parsedData = budgetResponseSchema.parse(res);

  return parsedData;
};

export const getBudgetById = async (id: number): Promise<Budget> => {
  const res = await api.get(`budgets/${id}`);

  const parsedData = BudgetSchema.parse(res);
  return parsedData;
};

export const createBudget = async (newBudgetData: CreateBudgetDto): Promise<Budget> => {
  return await api.post(`budgets`, newBudgetData);
};

export const updateBudget = async (id: number, dto: UpdateBudgetDto): Promise<Budget> => {
  return await api.put(`budgets/${id}`, dto);
};

export const deleteBudget = async (id: number): Promise<void> => {
  return await api.delete(`budgets/${id}`);
};
