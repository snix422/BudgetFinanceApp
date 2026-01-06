import { api } from '@/lib/axiosClient';

export const getCategories = async (): Promise<any> => {
  const res = await api.get('categories');
  return res;
};
