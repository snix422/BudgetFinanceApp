import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createIncome, deleteIncome, getIncomes, updateIncome } from '../api/incomes/incomes';
import { toast } from 'sonner';
import type { CreateIncomeDto, Income, UpdateIncomeDto } from '../schemas/incomeSchema';

const useGetIncomes = (budgetId: number) => {
  const queryClient = useQueryClient();

  const {
    data: incomes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['incomes-query-key'],
    queryFn: () => getIncomes(budgetId),
  });

  const addIncome = useMutation({
    mutationFn: ({ dto, budgetId }: { dto: CreateIncomeDto; budgetId: number }) =>
      createIncome(dto, budgetId),
    onMutate: async (variables, context) => {
      await queryClient.cancelQueries({ queryKey: ['incomes-query-key'] });
      const previousIncomes = queryClient.getQueryData(['incomes-query-key']);
      queryClient.setQueryData(['incomes-query-key'], (old: Income[] = []) => {
        const optimisticIncome = {
          id: Math.floor(Math.random() * 100000),
          title: variables.dto.title,
          amount: variables.dto.amount,
          date: variables.dto.date,
        };
        return [...old, optimisticIncome];
      });
      return { previousIncomes };
    },
    onSuccess(data, variables, onMutateResult, context) {
      console.log('ID nowego wpływu:', data);
      console.log('Dodano wpływ pomyślnie:', variables.dto.title);
      toast.success('Dodano wpływ pomyślnie!');
    },
    onError(error, variables, onMutateResult, context) {
      console.log(`Błąd przy dodawaniu "${variables.dto.title}":`, error);
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
    mutationFn: ({ id, dto, budgetId }: { id: number; dto: UpdateIncomeDto; budgetId: number }) =>
      updateIncome(id, dto, budgetId),
    onMutate: async (
      variables: { id: number; dto: UpdateIncomeDto; budgetId: number },
      context,
    ) => {
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
    mutationFn: ({ id, budgetId }: { id: number; budgetId: number }) => deleteIncome(id, budgetId),
    onMutate: async (variables, context) => {
      await queryClient.cancelQueries({ queryKey: ['incomes-query-key'] });
      const previousIncomes = queryClient.getQueryData(['incomes-query-key']);
      queryClient.setQueryData(['incomes-query-key'], (old: Income[]) => {
        return old ? old.filter((income) => income.id !== variables.id) : [];
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
    addIncomeLoading: addIncome.isPending,
    addIncomeError: addIncome.error,
    updateIncome: editIncome.mutate,
    updateIncomeLoading: editIncome.isPending,
    updateIncomeError: editIncome.error,
    deleteIncome: removeIncome.mutate,
  };
};

export default useGetIncomes;
