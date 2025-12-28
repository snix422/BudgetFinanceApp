import { useQuery } from '@tanstack/react-query';
import { getExpenseById } from '../api/expenses/expenses';

const useGetExpenseById = (id: number) => {
  const {
    data: expense,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['expenseById-query-key', id],
    queryFn: () => getExpenseById(id),
    enabled: !!id,
  });

  return {
    expense,
    isLoading,
    error,
  };
};

export default useGetExpenseById;
