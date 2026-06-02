import { generateBudgetShareLink } from '@/api/budgets/budgets';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useGenerateShareLink = () => {
  return useMutation({
    mutationFn: (budgetId: number) => generateBudgetShareLink(budgetId),
    onError: (error) => {
      console.error('Błąd generowania linku do udostępniania:', error);
      toast.error('Wystąpił błąd podczas generowania linku udostępniania.');
    },
  });
};
