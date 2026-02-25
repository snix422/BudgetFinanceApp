import { api } from '@/lib/axiosClient';
import type { Category } from '@/schemas/categorySchema';

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get('categories');
  return res.data;
};
