import { getSharedBudget } from '@/api/budgets/budgets';
import { useQuery } from '@tanstack/react-query';

const useGetSharedBudget = (token: string) => {
  const {
    data: sharedData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['shared-budget-query-key', token],
    queryFn: () => getSharedBudget(token),
    enabled: !!token, // Zapobiega wywołaniu zapytania, jeśli token jest pusty
  });

  return {
    sharedData,
    isLoading,
    error,
  };
};

export default useGetSharedBudget;
