import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createExpense, deleteExpense, getExpenses, updateExpense } from '../api/expenses/expenses';
import { toast } from 'sonner';
import type { CreateExpenseDto, Expense, UpdateExpenseDto } from '../schemas/expenseSchema';

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
    mutationFn: (dto: CreateExpenseDto) => createExpense(dto),
    onMutate: async (variables, context) => {
      await queryClient.cancelQueries({ queryKey: ['expenses-query-key'] });
      const previousExpenses = queryClient.getQueryData(['expenses-query-key']);
      queryClient.setQueryData(['expenses-query-key'], (old: Expense[] = []) => {
        const optimisticExpense = {
          id: Math.floor(Math.random() * 100000),
          ...variables,
        };
        return [...old, optimisticExpense];
      });
      return { previousExpenses };
    },
    onSuccess(data, variables, onMutateResult, context) {
      console.log('ID nowego wydatku:', data);
      console.log('Dodano wydatek pomyślnie:', variables.title);
      toast.success('Dodano wydatek pomyślnie!');
    },

    onError(error, variables, onMutateResult, context) {
      console.log(`Błąd przy dodawaniu "${variables.title}":`, error);
      toast.error('Wystąpił błąd z dodawaniem wydatku!');
      if (onMutateResult?.previousExpenses) {
        queryClient.setQueryData(['expenses-quere-key'], onMutateResult.previousExpenses);
      }
    },

    onSettled(data, error, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ['expenses-query-key'] });
    },
  });

  const editExpense = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateExpenseDto }) => updateExpense(id, dto),
    onMutate: async (variables: { id: number; dto: UpdateExpenseDto }, context) => {
      await queryClient.cancelQueries({ queryKey: ['expenses-query-key'] });
      const previousExpense = queryClient.getQueryData(['expenses-query-key']);
      queryClient.setQueryData(['expenses-query-key'], (old: Expense[] = []) => {
        return old.map((expense) => {
          if (expense.id == variables.id) {
            return { ...expenses, ...variables };
          }
          return expense;
        });
      });

      return { previousExpense };
    },

    onSuccess(data, variables, onMutateResult, context) {
      console.log('Edytowano wydatek pomyślnie. ID:', variables.id);
      toast.success('Edytowano wydatek pomyślnie!');
    },

    onError(error, variables, onMutateResult, context) {
      console.log(`Błąd edycji wydatku ID ${variables.id}:`, error);
      toast.error('Wystąpił błąd z edycją wydatku!');
      if (onMutateResult?.previousExpense) {
        queryClient.setQueryData(['expenses-query-key'], onMutateResult.previousExpense);
      }
    },

    onSettled(data, error, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ['expenses-query-key'] });
    },
  });

  const removeExpense = useMutation({
    mutationFn: (id: number) => deleteExpense(id),
    onMutate(variables, context) {
      queryClient.cancelQueries({ queryKey: ['expenses-query-key'] });
      const previousExpenses = queryClient.getQueryData(['expenses-query-key']);

      queryClient.setQueryData(['expenses-query-key'], (old: Expense[]) => {
        return old ? old.filter((expense) => expense.id !== variables) : [];
      });

      return { previousExpenses };
    },
    onSuccess(data, variables, onMutateResult, context) {
      toast.success('Usunięto wydatek pomyślnie!');
      console.log('Usunięto budżet o ID:', data);
    },
    onError(error, variables, onMutateResult, context) {
      console.log(`Wystąpił błąd z usuwaniem wydatku ID ${variables}:`, error);
      toast.error('Wystąpił błąd z usuwaniem wydatku!');
      if (onMutateResult?.previousExpenses) {
        queryClient.setQueryData(['expenses-query-key'], onMutateResult.previousExpenses);
      }
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
