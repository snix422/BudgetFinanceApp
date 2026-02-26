import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteIncome, updateIncome } from '@/api/admin//incomes';
import type { UpdateExpenseDto } from '@/schemas/expenseSchema';
import { deleteExpense, updateExpense } from '@/api/admin/expenses';
import type { UpdateIncomeDto } from '@/schemas/incomeSchema';

export const useAdminTransactionMutations = (budgetId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['admin', 'budget'];

  const deleteExpenseMutation = useMutation({
    mutationFn: (id: number) => deleteExpense(Number(budgetId), id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteIncomeMutation = useMutation({
    mutationFn: (id: number) => deleteIncome(Number(budgetId), id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateExpenseMutation = useMutation({
    mutationFn: (payload: { id: number; data: UpdateExpenseDto; budgetId: number }) =>
      updateExpense(Number(budgetId), payload.id, payload.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.error('Błąd edycji wydatku:', error);
      alert('Nie udało się zaktualizować wydatku.');
    },
  });

  const updateIncomeMutation = useMutation({
    mutationFn: (payload: { id: number; data: UpdateIncomeDto; budgetId: number }) =>
      updateIncome(Number(payload.budgetId), payload.id, payload.data),

    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: () => alert('Nie udało się zaktualizować wpływu.'),
  });

  return {
    deleteExpense: deleteExpenseMutation.mutate,
    deleteIncome: deleteIncomeMutation.mutate,
    updateExpense: updateExpenseMutation.mutate,
    updateExpenseLoading: updateExpenseMutation.isPending,
    updateIncome: updateIncomeMutation.mutate,
    updateIncomeLoading: updateIncomeMutation.isPending,

    isUpdating: updateExpenseMutation.isPending || updateIncomeMutation.isPending,
  };
};
