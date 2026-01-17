import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteIncome, updateIncome } from '@/api/admin//incomes';
import type { UpdateExpenseDto } from '@/schemas/expenseSchema';
import { deleteExpense, updateExpense } from '@/api/admin/expenses';
import type { UpdateIncomeDto } from '@/schemas/incomeSchema';

export const useAdminTransactionMutations = (budgetId: string | number) => {
  const queryClient = useQueryClient();
  const queryKey = ['admin', 'budget', String(budgetId)];

  // --- DELETE (To już mieliśmy) ---
  const deleteExpenseMutation = useMutation({
    mutationFn: (id: number) => deleteExpense(Number(budgetId), id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteIncomeMutation = useMutation({
    mutationFn: (id: number) => deleteIncome(Number(budgetId), id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  // --- UPDATE EXPENSE (Nowość!) ---
  const updateExpenseMutation = useMutation({
    // Payload to obiekt zawierający ID i dane do zmiany
    mutationFn: (payload: { id: number; data: UpdateExpenseDto; budgetId: number }) =>
      updateExpense(Number(budgetId), payload.id, payload.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      // Tu opcjonalnie: toast.success("Zaktualizowano wydatek");
    },
    onError: (error) => {
      console.error('Błąd edycji wydatku:', error);
      alert('Nie udało się zaktualizować wydatku.');
    },
  });

  // --- UPDATE INCOME (Nowość!) ---
  const updateIncomeMutation = useMutation({
    mutationFn: (payload: { id: number; data: UpdateIncomeDto; budgetId: number }) =>
      updateIncome(Number(payload.budgetId), payload.id, payload.data),

    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (error) => alert('Nie udało się zaktualizować wpływu.'),
  });

  return {
    deleteExpense: deleteExpenseMutation.mutate,
    deleteIncome: deleteIncomeMutation.mutate,
    updateExpense: updateExpenseMutation.mutate, // Eksportujemy funkcję
    updateExpenseLoading: updateExpenseMutation.isPending,
    updateIncome: updateIncomeMutation.mutate, // Eksportujemy funkcję
    updateIncomeLoading: updateIncomeMutation.isPending,

    // Stany ładowania (przydatne do zablokowania formularza)
    isUpdating: updateExpenseMutation.isPending || updateIncomeMutation.isPending,
  };
};
