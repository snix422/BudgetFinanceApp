import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createIncome, deleteIncome, getIncomes, updateIncome } from '../api/incomes/incomes';
import { toast } from 'sonner';
import type { Income, UpdateIncomeDto } from '../schemas/incomeSchema';

const useGetIncomes = () => {
  const queryClient = useQueryClient();

  const {
    data: incomes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['incomes-query-key'],
    queryFn: getIncomes,
  });

  const addIncome = useMutation({
    mutationFn: createIncome,
    onMutate: async (variables, context) => {
      await queryClient.cancelQueries({ queryKey: ['incomes-query-key'] });
      const previousIncomes = queryClient.getQueryData(['incomes-query-key']);
      queryClient.setQueryData(['incomes-query-key'], (old: Income[] = []) => {
        const optimisticIncome = {
          id: Math.floor(Math.random() * 100000),
          ...variables,
        };
        return [...old, optimisticIncome];
      });
      return { previousIncomes };
    },
    onSuccess(data, variables, onMutateResult, context) {
      console.log('ID nowego wpływu:', data);
      console.log('Dodano wpływ pomyślnie:', variables.title);
      toast.success('Dodano wpływ pomyślnie!');
    },
    onError(error, variables, onMutateResult, context) {
      console.log(`Błąd przy dodawaniu "${variables.title}":`, error);
      toast.error('Wystąpił błąd z dodawaniem wpływu!');
      if (onMutateResult?.previousIncomes) {
        queryClient.setQueryData(['incomes-query-key'], onMutateResult.previousIncomes);
      }
    },
    onSettled(data, error, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ['incomes-query-key'] });
    },
  });

  const editIncome = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateIncomeDto }) => updateIncome(id, dto),
    onMutate: async (variables: { id: number; dto: UpdateIncomeDto }, context) => {
      await queryClient.cancelQueries({ queryKey: ['incomes-query-key'] });
      const previousIncomes = queryClient.getQueryData(['incomes-query-key']);
      queryClient.setQueryData(['incomes-query-key'], (old: Income[] = []) => {
        return old.map((income) => {
          if (income.id == variables.id) {
            return { ...income, ...variables };
          }
          return income;
        });
      });
      return { previousIncomes };
    },
    onSuccess(data, variables, onMutateResult, context) {
      console.log('Edytowano wpływ pomyślnie. ID:', variables.id);
      toast.success('Edytowano wpływ pomyślnie!');
    },
    onError(error, variables, onMutateResult, context) {
      console.log(`Błąd edycji wpływu ID ${variables.id}:`, error);
      toast.error('Wystąpił błąd z edycją wpływu!');
      if (onMutateResult?.previousIncomes) {
        queryClient.setQueryData(['incomes-query-key'], onMutateResult.previousIncomes);
      }
    },
    onSettled(data, error, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ['incomes-query-key'] });
    },
  });

  const removeIncome = useMutation({
    mutationFn: deleteIncome,
    onMutate: async (variables, context) => {
      await queryClient.cancelQueries({ queryKey: ['incomes-query-key'] });
      const previousIncomes = queryClient.getQueryData(['incomes-query-key']);
      queryClient.setQueryData(['incomes-query-key'], (old: Income[]) => {
        return old ? old.filter((income) => income.id !== variables) : [];
      });
      return { previousIncomes };
    },
    onSuccess(data, variables, onMutateResult, context) {
      console.log('Usunięto wpływ o ID:', variables);
      toast.success('Usunięto wpływ pomyślnie!');
    },
    onError(error, variables, onMutateResult, context) {
      console.log(`Wystąpił błąd z usuwaniem wpływu ID ${variables}:`, error);
      toast.error('Wystąpił błąd z usuwaniem wpływu!');
      if (onMutateResult?.previousIncomes) {
        queryClient.setQueryData(['incomes-query-key'], onMutateResult.previousIncomes);
      }
    },
    onSettled(data, error, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ['incomes-query-key'] });
    },
  });

  return {
    incomes,
    isLoading,
    error,
    addIncome: addIncome.mutate,
    updateIncome: editIncome.mutate,
    deleteIncome: removeIncome.mutate,
  };
};

export default useGetIncomes;
