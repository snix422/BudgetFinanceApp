import DeleteTransactionModal from '@/components/DeleteModal';
import EditBudgetModal from '@/components/EditBudgetModal';
import EditIncomeModal from '@/components/EditIncomeModal';
import EditExpenseModal from '@/components/EditExpenseModal';
import GenericList from '@/components/GenericList';
import TransactionItem from '@/components/TransactionItem';
import useGetBudgetsByUserIdAndBudgetId from '@/hooks/useGetBudgetsByUserIdAndBudgetId';
import useGetExpenses from '@/hooks/useGetExpenses';
import useGetIncomes from '@/hooks/useGetIncomes';
import { useModal } from '@/hooks/useModal';
import { useSelectedItem } from '@/hooks/useSelectedItem';
import type { Expense } from '@/schemas/expenseSchema';
import type { Income } from '@/schemas/incomeSchema';
import { useParams } from 'react-router';

const AdminBudgetDetails = () => {
  const { id: budgetId, userId } = useParams();
  const {
    data: budget,
    isLoading,
    error,
  } = useGetBudgetsByUserIdAndBudgetId(userId, Number(budgetId));
  const { expenses } = useGetExpenses(Number(budgetId));
  const { incomes } = useGetIncomes(Number(budgetId));

  // Modale
  const editModal = useModal(false);
  const deleteModal = useModal(false);
  const editIncomeModal = useModal();
  const editExpenseModal = useModal();

  // Wybrany element
  const { selectedItem, selectItem } = useSelectedItem();

  const allTransactions = [
    ...(incomes || []).map((i: Income) => ({ ...i, type: 'income' as const })),
    ...(expenses || []).map((e: Expense) => ({ ...e, type: 'expense' as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className='w-full h-full flex flex-col items-center gap-4 py-10 bg-white '>
      <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
        Budżet: <span className='text-primary'>{budget?.title}</span>
      </h1>
      <div className='w-4/5 flex flex-col items-center gap-5 min-h-auto p-4'>
        <div className='w-full flex justify-center gap-6'>
          {/* KARTA: WPŁYWY */}
          <div className='w-1/4 flex flex-col justify-center items-center rounded-xl p-6 border border-green-200 bg-green-50/50'>
            <h2 className='text-xs font-bold uppercase tracking-wider text-green-600 mb-1'>
              Wpływy
            </h2>
            <h3 className='text-3xl font-black tracking-tight text-gray-900'>
              {budget?.totalEarned} zł
            </h3>
          </div>
          {/* KARTA: WYDATKI */}
          <div className='w-1/4 flex flex-col justify-center items-center rounded-xl p-6 border border-red-200 bg-red-50/50'>
            <h2 className='text-xs font-bold uppercase tracking-wider text-red-600 mb-1'>
              Wydatki
            </h2>
            <h3 className='text-3xl font-black tracking-tight text-gray-900'>
              {budget?.totalSpent} zł
            </h3>
          </div>
          {/* KARTA: OSZCZĘDNOŚCI (Remaining) */}
          <div className='w-1/4 flex flex-col justify-center items-center rounded-xl p-6 border border-blue-200 bg-blue-50/50'>
            <h2 className='text-xs font-bold uppercase tracking-wider text-blue-600 mb-1'>
              Pozostało
            </h2>
            <h3 className='text-3xl font-black tracking-tight text-gray-900'>
              {budget?.remainingAmount} zł
            </h3>
          </div>
        </div>
        {!allTransactions ? (
          <h2>Brak wpływów i wydatków</h2>
        ) : (
          <div className='flex justify-center items-center mt-10'>
            <GenericList
              data={allTransactions}
              className='flex flex-col items-center'
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

        {editIncomeModal.isOpen && selectedItem && selectedItem.type === 'income' && (
          <EditIncomeModal
            isOpenModal={editIncomeModal.isOpen}
            onClose={editIncomeModal.close}
            id={selectedItem.id}
            budgetId={Number(budgetId)}
            data={selectedItem as any}
            isAdmin={true}
          />
        )}

        {editExpenseModal.isOpen && selectedItem && selectedItem.type === 'expense' && (
          <EditExpenseModal
            isOpenModal={editExpenseModal.isOpen}
            onClose={editExpenseModal.close}
            id={selectedItem.id}
            budgetId={Number(budgetId)}
            data={selectedItem as any}
            isAdmin={true}
          />
        )}

        {deleteModal.isOpen && selectedItem && (
          <DeleteTransactionModal
            isOpenModal={deleteModal.isOpen}
            onClose={deleteModal.close}
            type={selectedItem.type}
            id={selectedItem.id}
            budgetId={Number(budgetId)}
          />
        )}
      </div>
    </main>
  );
};

export default AdminBudgetDetails;
