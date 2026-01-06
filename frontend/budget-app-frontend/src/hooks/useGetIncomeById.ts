import { useQuery } from '@tanstack/react-query';
import { getIncomeById } from '../api/incomes/incomes';

const useIncomeById = (id: number, budgetId: number) => {
  const {
    data: income,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['incomeById-query-key', id],
    queryFn: () => getIncomeById(id, budgetId),
  });

  return {
    income,
    isLoading,
    error,
  };
};

export default useIncomeById;
