import { useParams } from 'react-router-dom';
import GenericList from '@/components/ui/GenericList';
import TransactionItem from '@/components/transactions/items/TransactionItem';
import Button from '@/components/ui/Button';
import useGetCategories from '@/hooks/useGetCategories';
import { useModal } from '@/hooks/useModal';
import { useSelectedItem, type SelectedItem } from '@/hooks/useSelectedItem';
import { BudgetSummaryCards } from '@/components/budgets/BudgetSummaryCards';
import { mergeAndSortTransactions, prepareChartData } from '@/utils/budgetCalculations';
import ErrorState from '@/components/layout/ErrorState';
import BudgetChart from '@/components/budgets/charts/BudgetChart';
import { ExpensesChart } from '@/components/transactions/charts/ExpensesChart';
import BudgetsSkeleton from '@/components/BudgetsSkeleton';
import type { Transaction } from '@/types/transaction';
import useGetSharedBudget from '@/hooks/useGetSharedBudget';

const SharedBudgetDetails = () => {
  const { token } = useParams();
  const { sharedData, isLoading, error } = useGetSharedBudget(token || '');
  const expenses = sharedData?.expenses || [];
  const incomes = sharedData?.incomes || [];
  const deleteModal = useModal();

  const editIncomeModal = useModal();
  const editExpenseModal = useModal();

  const { selectItem } = useSelectedItem();

  const { categories } = useGetCategories();

  const allTransactions = mergeAndSortTransactions(incomes, expenses);

  const groupedData = prepareChartData(categories, expenses);

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
        Budżet: <span className='text-primary'>{sharedData?.title}</span>
      </h1>
      <Button variant='secondary' size='md'>
        Eksportuj Pdf
      </Button>
      <div className='w-4/5 flex flex-col items-center gap-5 min-h-auto p-4'>
        <BudgetSummaryCards
          earned={sharedData?.totalEarned ?? 0}
          spent={sharedData?.totalSpent ?? 0}
          remaining={sharedData?.remainingAmount ?? 0}
        />

        {sharedData && (
          <div className='w-full flex justify-between'>
            <BudgetChart
              income={sharedData.totalEarned}
              expenses={sharedData.totalSpent}
              savings={sharedData.remainingAmount}
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
          <GenericList<Transaction>
            data={allTransactions}
            className='w-full flex flex-col items-center pt-8 pb-8'
            renderItem={(item: Transaction) => {
              const handleSelect = () => {
                const select: SelectedItem = {
                  id: item.id,
                  type: item.type,
                  title: item.title,
                  amount: item.amount,
                  date: item.date,
                };
                selectItem(select);
              };

              return (
                <TransactionItem
                  key={`${item.type}-${item.id}`}
                  data={item}
                  isReadOnly={true}
                  onOpenDeleteModal={() => {
                    handleSelect();
                    deleteModal.open();
                  }}
                  onOpenEditModal={() => {
                    handleSelect();
                    if (item.type === 'income') {
                      editIncomeModal.open();
                    } else {
                      editExpenseModal.open();
                    }
                  }}
                  selectItem={selectItem}
                />
              );
            }}
          />
        </div>
      )}
    </main>
  );
};

export default SharedBudgetDetails;
