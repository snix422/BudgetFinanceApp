import { api } from '@/lib/axiosClient';
import type { Category } from '@/schemas/categorySchema';

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get<unknown, Category[]>('categories');
  console.log(res, 'api response');
  return res;
};
