import { useQuery } from '@tanstack/react-query';
import { getBudgetById } from '../api/budgets/budgets';

const useGetBudgetById = (id: number) => {
  const {
    data: budget,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['budget-query-key', id],
    queryFn: () => getBudgetById(id),
    enabled: !!id,
  });

  return {
    budget,
    isLoading,
    error,
  };
};

export default useGetBudgetById;
