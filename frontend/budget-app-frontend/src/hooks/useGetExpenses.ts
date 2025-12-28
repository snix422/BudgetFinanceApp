import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createExpense, deleteExpense, getExpenses, updateExpense } from '../api/expenses/expenses';

import { toast } from 'sonner';
import type { CreateExpenseDto, UpdateExpenseDto } from '../schemas/expenseSchema';

const useGetExpenses = () => {
  const queryClient = useQueryClient();

  const {
    data: expenses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['expenses-query-key'],
    queryFn: getExpenses,
  });

  const addExpense = useMutation({
    mutationFn: createExpense,
    onMutate: async (dto: CreateExpenseDto) => {
      await queryClient.cancelQueries({ queryKey: ['expenses-query-key'] });
    },
    onSuccess(data, variables, onMutateResult, context) {
      console.log('ID nowego wydatku:', data);
      console.log('Dodano wydatek pomyślnie:', variables.title);
      toast.success('Dodano wydatek pomyślnie!');
    },

    onError(error, variables, onMutateResult, context) {
      console.log(`Błąd przy dodawaniu "${variables.title}":`, error);
      toast.error('Wystąpił błąd z dodawaniem wydatku!');
    },

    onSettled(data, error, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ['expenses-query-key'] });
    },
  });

  const editExpense = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateExpenseDto }) => updateExpense(id, dto),
    onMutate: async (variables: { id: number; dto: UpdateExpenseDto }, context) => {
      await queryClient.cancelQueries({ queryKey: ['expenses-query-key'] });
    },

    onSuccess(data, variables, onMutateResult, context) {
      console.log('Edytowano wydatek pomyślnie. ID:', variables.id);
      toast.success('Edytowano wydatek pomyślnie!');
    },

    onError(error, variables, onMutateResult, context) {
      console.log(`Błąd edycji wydatku ID ${variables.id}:`, error);
      toast.error('Wystąpił błąd z edycją wydatku!');
    },

    onSettled(data, error, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ['expenses-query-key'] });
    },
  });

  const removeExpense = useMutation({
    mutationFn: deleteExpense,
    onMutate(variables, context) {
      queryClient.cancelQueries({ queryKey: ['expenses-query-key'] });
    },
    onSuccess(data, variables, onMutateResult, context) {
      toast.success('Usunięto wydatek pomyślnie!');
      console.log('Usunięto budżet o ID:', deletedId);
    },
    onError(error, variables, onMutateResult, context) {
      console.log(`Wystąpił błąd z usuwaniem wydatku ID ${deletedId}:`, error);
      toast.error('Wystąpił błąd z usuwaniem wydatku!');
    },
    onSettled(data, error, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ['expenses-query-key'] });
    },
  });

  return {
    expenses,
    isLoading,
    error,
    addExpense: addExpense.mutate,
    updateExpense: editExpense.mutate,
    deleteExpense: removeExpense.mutate,
  };
};

export default useGetExpenses;
