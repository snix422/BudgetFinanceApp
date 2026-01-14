import { getBudgetsByUserIdAndBudgetId } from '@/api/admin/budgets';
import { useQuery } from '@tanstack/react-query';

const useGetBudgetsByUserIdAndBudgetId = (userId: string | undefined, budgetId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-budgets-by-userId-budgetId'],
    queryFn: () => getBudgetsByUserIdAndBudgetId(userId!, budgetId),
    enabled: !!userId && !!budgetId,
  });

  return { data, isLoading, error };
};

export default useGetBudgetsByUserIdAndBudgetId;
