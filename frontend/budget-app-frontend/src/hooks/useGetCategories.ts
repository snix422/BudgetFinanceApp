import { getCategories } from '@/api/categories/categories';
import { useQuery } from '@tanstack/react-query';

const useGetCategories = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories-query-key'],
    queryFn: getCategories,
  });

  return {
    categories,
    isLoading,
    error,
  };
};

export default useGetCategories;
