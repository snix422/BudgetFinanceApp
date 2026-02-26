import { useQuery } from '@tanstack/react-query';
import { getExpenseById } from '../api/expenses/expenses';

const useGetExpenseById = (id: number, budgetId: number) => {
  const {
    data: expense,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['expense-query-key', budgetId, id],
    queryFn: () => getExpenseById(id, budgetId),
    enabled: !!id,
  });

  return {
    expense,
    isLoading,
    error,
  };
};

export default useGetExpenseById;
