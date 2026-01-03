import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBudget, deleteBudget, getBudgets, updateBudget } from '../api/budgets/budgets';
import { toast } from 'sonner';
import type { Budget, CreateBudgetDto, UpdateBudgetDto } from '../schemas/budgetSchema';

const useGetBudgets = () => {
  const queryClient = useQueryClient();
  const {
    data: budgets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['budgets-query-key'],
    queryFn: getBudgets,
  });

  const addBudget = useMutation({
    mutationFn: createBudget,
    onMutate: async (variables: CreateBudgetDto) => {
      await queryClient.cancelQueries({ queryKey: ['budgets-query-key'] });
      const previousBudget = queryClient.getQueryData(['budgets-query-key']);
      await queryClient.setQueryData(['budgets-query-key'], (old: Budget[] = []) => {
        const newBudget = {
          id: Math.floor(Math.random() * 100000),
          ...variables,
        };

        return [...old, newBudget];
      });
      return { previousBudget };
    },

    onSuccess: (data, newBudget, context) => {
      console.log('ID nowego budżetu:', data);
      console.log('Dodano budżet pomyślnie:', newBudget.title);
      toast.success('Dodano nowy budżet!');
    },

    onError: (data, newBudget, context) => {
      console.log(`Błąd przy dodawaniu "${newBudget.title}":`, error);
      toast.error('Wystąpił błąd z dodaniem budżetu!');
      queryClient.setQueryData(['budgets-query-key'], newBudget);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets-query-key'] });
    },
  });

  const editBudget = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateBudgetDto }) => updateBudget(id, dto),
    onMutate: async ({ id, dto }: { id: number; dto: UpdateBudgetDto }) => {
      await queryClient.cancelQueries({ queryKey: ['budgets-query-key'] });
      const previousBudget = await queryClient.getQueryData(['budgets-query-key']);
      queryClient.setQueryData(['budgets-query-key'], (old: Budget[] = []) => {
        return old.map((budget) => {
          if (budget.id == id) {
            return { ...budget, ...dto };
          }
          return budget;
        });
      });
      return { previousBudget };
    },

    onSuccess: (data, variables, onMutateResult, context) => {
      console.log('Edytowano budżet pomyślnie. ID:', variables.id);
      toast.success('Edytowano budżet pomyślnie!');
    },

    onError: (error, variables, onMutateResult, context) => {
      toast.error('Wystąpił błąd z edycją budżetu');
      console.log(`Błąd edycji budżetu ID ${variables.id}:`, error);
      if (onMutateResult?.previousBudget) {
        queryClient.setQueryData(['budgets-query-key'], onMutateResult.previousBudget);
      }
    },

    onSettled: (data, error, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ['budgets-query-key'] });
    },
  });

  const removeBudget = useMutation({
    mutationFn: deleteBudget,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['budgets-query-key'] });
      const previousBudget = await queryClient.getQueryData(['budgets-query-key']);
      queryClient.setQueryData(['budgets-query-key'], (old: Budget[] = []) => {
        return old ? old.filter((budget) => budget.id !== id) : [];
      });
      return { previousBudget };
    },

    onSuccess: (data, deletedId, context) => {
      toast.success('Usunięto budżet pomyślnie');
      console.log('Usunięto budżet o ID:', deletedId);
    },

    onError: (error, deletedId, context) => {
      toast.error('Wystąpił błąd z usuwaniem budżetu');
      console.log(`Wystąpił błąd z usuwaniem budżetu ID ${deletedId}:`, error);
      if (context?.previousBudget) {
        queryClient.setQueryData(['budgetd-query-key'], context.previousBudget);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets-query-key'] });
    },
  });

  return {
    budgets,
    isLoading,
    error,

    addBudget: addBudget.mutate,
    addBudgetLoading: addBudget.isPending,
    addBudgetError: addBudget.error,

    updateBudget: editBudget.mutate,
    updateBudgetLoading: editBudget.isPending,
    updateBudgetError: editBudget.error,

    deleteBudget: removeBudget.mutate,
    deleteBudgetLoading: removeBudget.isPending,
    deleteBudgetError: removeBudget.error,
  };
};

export default useGetBudgets;
