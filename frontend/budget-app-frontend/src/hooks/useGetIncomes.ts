import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createIncome, deleteIncome, getIncomes, updateIncome } from '../api/incomes/incomes';
import type { UpdateIncomeDto } from '../types/income';
import { toast } from 'sonner';

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
    },
    onSuccess(data, variables, onMutateResult, context) {
      console.log('ID nowego wpływu:', data);
      console.log('Dodano wpływ pomyślnie:', newBudget.title);
      toast.success('Dodano wpływ pomyślnie!');
    },
    onError(error, variables, onMutateResult, context) {
      console.log(`Błąd przy dodawaniu "${newBudget.title}":`, error);
      toast.error('Wystąpił błąd z dodawaniem wpływu!');
    },
    onSettled(data, error, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ['incomes-query-key'] });
    },
  });

  const editIncome = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateIncomeDto }) => updateIncome(id, dto),
    onMutate: async (variables: { id: number; dto: UpdateIncomeDto }, context) => {
      await queryClient.cancelQueries({ queryKey: ['incomes-query-key'] });
    },
    onSuccess(data, variables, onMutateResult, context) {
      console.log('Edytowano wpływ pomyślnie. ID:', variables.id);
      toast.success('Edytowano wpływ pomyślnie!');
    },
    onError(error, variables, onMutateResult, context) {
      console.log(`Błąd edycji wpływu ID ${variables.id}:`, error);
      toast.error('Wystąpił błąd z edycją wpływu!');
    },
    onSettled(data, error, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ['incomes-query-key'] });
    },
  });

  const removeIncome = useMutation({
    mutationFn: deleteIncome,
    onMutate: async (variables, context) => {
      await queryClient.cancelQueries({ queryKey: ['incomes-query-key'] });
    },
    onSuccess(data, variables, onMutateResult, context) {
      console.log('Usunięto wpływ o ID:', deletedId);
      toast.success('Usunięto wpływ pomyślnie!');
    },
    onError(error, variables, onMutateResult, context) {
      console.log(`Wystąpił błąd z usuwaniem wpływu ID ${deletedId}:`, error);
      toast.error('Wystąpił błąd z usuwaniem wpływu!');
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
