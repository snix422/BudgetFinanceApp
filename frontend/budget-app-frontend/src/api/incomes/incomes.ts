import { api } from '../../lib/axiosClient';
import {
  IncomeSchema,
  IncomesResponseSchema,
  type CreateIncomeDto,
  type Income,
  type UpdateIncomeDto,
} from '../../schemas/incomeSchema';

export const getIncomes = async (): Promise<Income[]> => {
  const res = await api.get('incomes');
  const parsedData = IncomesResponseSchema.parse(res);
  return parsedData;
};

export const getIncomeById = async (id: number): Promise<Income> => {
  const res = await api.get(`incomes/${id}`);
  const parsedData = IncomeSchema.parse(res);
  return parsedData;
};

export const createIncome = async (newIncome: CreateIncomeDto): Promise<number> => {
  return await api.post(`incomes`, newIncome);
};

export const updateIncome = async (id: number, dto: UpdateIncomeDto): Promise<void> => {
  return await api.put(`incomes/${id}`, dto);
};

export const deleteIncome = async (id: number): Promise<void> => {
  return await api.delete(`incomes/${id}`);
};
