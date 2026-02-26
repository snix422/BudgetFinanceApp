import { getBudgetsByUserId } from '@/api/admin/budgets';
import { useQuery } from '@tanstack/react-query';

const useGetBudgetsByUserId = (userId: string | undefined) => {
  const {
    data: budgets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['budgetsByUserId'],
    queryFn: () => getBudgetsByUserId(userId!),
    enabled: !!userId,
  });

  return { budgets, isLoading, error };
};

export default useGetBudgetsByUserId;
