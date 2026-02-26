import { api } from '../../lib/axiosClient';
import {
  IncomeSchema,
  IncomesResponseSchema,
  type CreateIncomeDto,
  type Income,
  type UpdateIncomeDto,
} from '../../schemas/incomeSchema';

export const getIncomes = async (budgetId: number): Promise<Income[]> => {
  const res = await api.get(`budgets/${budgetId}/incomes`);
  const parsedData = IncomesResponseSchema.parse(res);
  return parsedData;
};

export const getIncomeById = async (id: number, budgetId: number): Promise<Income> => {
  const res = await api.get(`budgets/${budgetId}/incomes/${id}`);
  const parsedData = IncomeSchema.parse(res);
  return parsedData;
};

export const createIncome = async (dto: CreateIncomeDto, budgetId: number): Promise<number> => {
  return await api.post(`budgets/${budgetId}/incomes`, dto);
};

export const updateIncome = async (
  id: number,
  dto: UpdateIncomeDto,
  budgetId: number,
): Promise<void> => {
  return await api.put(`budgets/${budgetId}/incomes/${id}`, dto);
};

export const deleteIncome = async (id: number, budgetId: number): Promise<void> => {
  return await api.delete(`budgets/${budgetId}/incomes/${id}`);
};
