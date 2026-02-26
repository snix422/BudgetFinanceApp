import GenericList from '@/components/ui/GenericList';
import TransactionItem from '@/components/transactions/items/TransactionItem';
import useGetBudgetsByUserIdAndBudgetId from '@/hooks/useGetBudgetsByUserIdAndBudgetId';
import useGetExpenses from '@/hooks/useGetExpenses';
import useGetIncomes from '@/hooks/useGetIncomes';
import { useModal } from '@/hooks/useModal';
import { useSelectedItem, type SelectedItem } from '@/hooks/useSelectedItem';
import type { Expense } from '@/schemas/expenseSchema';
import type { Income } from '@/schemas/incomeSchema';
import { useParams } from 'react-router';
import { BudgetSummaryCards } from '@/components/budgets/BudgetSummaryCards';
import { BudgetModals } from '@/components/admin/modals/BudgetModals';
import { mergeAndSortTransactions } from '@/utils/budgetCalculations';
import type { Transaction } from '@/types/transaction';

const AdminBudgetDetails = () => {
  const { id: budgetId, userId } = useParams();
  const { data: budget } = useGetBudgetsByUserIdAndBudgetId(userId, Number(budgetId));
  const { expenses } = useGetExpenses(Number(budgetId));
  const { incomes } = useGetIncomes(Number(budgetId));

  const deleteModal = useModal(false);
  const editIncomeModal = useModal();
  const editExpenseModal = useModal();

  const { selectedItem, selectItem } = useSelectedItem();

  const allTransactions = mergeAndSortTransactions(incomes as Income[], expenses as Expense[]);

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
      </div>
      {!allTransactions ? (
        <h2>Brak wpływów i wydatków</h2>
      ) : (
        <div className='flex justify-center items-center mt-10'>
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

      {selectedItem && (
        <BudgetModals
          budgetId={Number(budgetId)}
          deleteModal={deleteModal}
          editIncomeModal={editIncomeModal}
          editExpenseModal={editExpenseModal}
          selectedItem={selectedItem}
        />
      )}
    </main>
  );
};

export default AdminBudgetDetails;
