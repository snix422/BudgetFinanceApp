import { useParams } from 'react-router-dom';
import useGetBudgetById from '../../hooks/useGetBudgetById';
import GenericList from '@/components/ui/GenericList';
import TransactionItem from '@/components/transactions/items/TransactionItem';
import useGetExpenses from '@/hooks/useGetExpenses';
import useGetIncomes from '@/hooks/useGetIncomes';
import Button from '@/components/ui/Button';
import useGetCategories from '@/hooks/useGetCategories';
import { useModal } from '@/hooks/useModal';
import { useSelectedItem } from '@/hooks/useSelectedItem';
import { BudgetModals } from '@/components/budgets/modals/BudgetModals';
import { BudgetRuleSection } from '@/components/budgets/BudgetRuleSection';
import { BudgetSummaryCards } from '@/components/budgets/BudgetSummaryCards';
import {
  calculateBudgetSplit,
  calculateRuleSplit,
  mergeAndSortTransactions,
  prepareChartData,
} from '@/utils/budgetCalculations';
import { useMemo } from 'react';
import ErrorState from '@/components/layout/ErrorState';
import BudgetChart from '@/components/budgets/charts/BudgetChart';
import { ExpensesChart } from '@/components/transactions/charts/ExpensesChart';
import BudgetsSkeleton from '@/components/BudgetsSkeleton';
import type { Budget } from '@/schemas/budgetSchema';

const BudgetDetails = () => {
  const { id: budgetId } = useParams();
  const { budget, isLoading, error } = useGetBudgetById(Number(budgetId));
  const { expenses } = useGetExpenses(Number(budgetId));
  const { incomes } = useGetIncomes(Number(budgetId));

  // Modale
  const deleteModal = useModal();
  const addIncomeModal = useModal();
  const addExpenseModal = useModal();
  const editIncomeModal = useModal();
  const editExpenseModal = useModal();

  // Wybrany element
  const { selectedItem, selectItem } = useSelectedItem();

  const { categories } = useGetCategories();

  const allTransactions = mergeAndSortTransactions(incomes, expenses);

  const groupedData = prepareChartData(categories, expenses);

  const { needs, wants, savings } = useMemo(
    () => calculateBudgetSplit(budget?.totalEarned),
    [budget?.totalEarned],
  );

  const resultRules = useMemo(() => calculateRuleSplit(expenses), [expenses]);

  const hasExpenses = !!expenses?.length;

  if (isLoading) {
    return (
      <div className='w-full flex justify-center items-center mt-10 gap-10 flex-wrap'>
        <BudgetsSkeleton lines={3} height={300} />;
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return (
    <main className='w-full h-full flex flex-col items-center gap-4 py-10 bg-white '>
      <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
        Budżet: <span className='text-primary'>{budget?.title}</span>
      </h1>
      <div className='w-4/5 flex flex-col items-center gap-5 min-h-auto p-4'>
        <BudgetSummaryCards
          earned={budget?.totalEarned ?? 0}
          spent={budget?.totalSpent ?? 0}
          remaining={budget?.remainingAmount ?? 0}
        />

        {budget && (
          <div className='w-full flex justify-between'>
            <BudgetChart
              income={budget?.totalEarned}
              expenses={budget.totalSpent}
              savings={budget.remainingAmount}
            />
          </div>
        )}
        {groupedData && (
          <div className='w-full flex justify-between'>
            <ExpensesChart data={groupedData} />
          </div>
        )}
      </div>
      {!allTransactions ? (
        <h2>Brak wpływów i wydatków</h2>
      ) : (
        <div className='w-4/5 flex items-center'>
          <GenericList
            data={allTransactions}
            className='w-full flex flex-col items-center pt-8 pb-8'
            renderItem={(item: any) => (
              <TransactionItem
                key={`${item.type}-${item.id}`}
                data={item}
                onOpenDeleteModal={() => {
                  selectItem(item);
                  deleteModal.open();
                }}
                onOpenEditModal={() => {
                  selectItem(item);
                  if (item.type === 'income') {
                    editIncomeModal.open();
                  } else {
                    editExpenseModal.open();
                  }
                }}
                selectItem={selectItem}
              />
            )}
          />
        </div>
      )}
      <div className='w-full flex justify-center items-center gap-4'>
        <Button variant='primary' size='md' onClick={addIncomeModal.open}>
          Dodaj wpływ
        </Button>
        <Button variant='primary' size='md' onClick={addExpenseModal.open}>
          Dodaj wydatek
        </Button>
      </div>

      <BudgetModals
        budgetId={Number(budgetId)}
        selectedItem={selectedItem}
        deleteModal={deleteModal}
        editIncomeModal={editIncomeModal}
        editExpenseModal={editExpenseModal}
        addIncomeModal={addIncomeModal}
        addExpenseModal={addExpenseModal}
      />

      <BudgetRuleSection
        needs={needs}
        wants={wants}
        savings={savings}
        resultRules={resultRules}
        hasExpenses={hasExpenses}
      />
    </main>
  );
};

export default BudgetDetails;
