import { useParams } from 'react-router-dom';
import useGetBudgetById from '../../hooks/useGetBudgetById';
import BudgetChart from '@/components/BudgetChart';
import { ExpensesChart } from '@/components/ExpensesChart';
import GenericList from '@/components/GenericList';
import TransactionItem from '@/components/TransactionItem';
import { useState } from 'react';
import DeleteTransactionModal from '@/components/DeleteTransactiomModal';
import EditTransactionModal from '@/components/EditTransactionModal';
import useGetExpenses from '@/hooks/useGetExpenses';
import useGetIncomes from '@/hooks/useGetIncomes';
import type { Income } from '@/schemas/incomeSchema';
import type { Expense } from '@/schemas/expenseSchema';
import Button from '@/components/ui/Button';
import AddIncomeModal from '@/components/AddIncomeModal';
import AddExpenseModal from '@/components/AddExpenseModal';

const BudgetDetails = () => {
  const { id: budgetId } = useParams();
  const { budget, isLoading, error } = useGetBudgetById(Number(budgetId));
  const { expenses } = useGetExpenses(Number(budgetId));
  const { incomes } = useGetIncomes(Number(budgetId));
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenIncomeModal, setIsOpenIncomeModal] = useState(false);
  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TransactionItem | null>(null);
  console.log(budget);
  console.log(isLoading);
  console.log(error);

  const allTransactions = [
    ...(incomes || []).map((i: Income) => ({ ...i, type: 'income' as const })),
    ...(expenses || []).map((e: Expense) => ({ ...e, type: 'expense' as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  console.log(allTransactions);
  return (
    <main className='w-full h-full flex flex-col items-center gap-4 py-10 bg-white '>
      <h1 className='text-3xl font-bold underline'>Nazwa budżetu: {budget?.title}</h1>
      <div className='w-4/5 flex flex-col items-center gap-5 min-h-auto p-4'>
        <div className='w-full flex justify-center gap-6'>
          <div className='w-1/4 flex flex-col justify-center items-center rounded p-6 shadow-sm'>
            <h2 className='text-2xl text-green-500'>Wpływy</h2>
            <h3 className='text-base font-bold text-green-500'>1000 zł</h3>
          </div>
          <div className='w-1/4 flex flex-col justify-center items-center rounded p-6 shadow-sm'>
            <h2 className='text-2xl text-red-500'>Wydatki</h2>
            <h3 className='text-base font-bold text-red-500'>1000 zł</h3>
          </div>
          <div className='w-1/4 flex flex-col justify-center items-center rounded p-6 shadow-sm'>
            <h2 className='text-2xl text-blue-500'>Oszczędności</h2>
            <h3 className='text-base font-bold text-blue-500'>1000 zł</h3>
          </div>
        </div>
        {incomes && expenses && (
          <div className='w-full flex justify-between'>
            <BudgetChart />
            <ExpensesChart />
          </div>
        )}
      </div>
      {!allTransactions ? (
        <h2>Brak wpływów i wydatków</h2>
      ) : (
        <div className='w-4/5 flex items-center'>
          <GenericList
            data={allTransactions}
            renderItem={(item: any) => (
              <TransactionItem
                key={`${item.type}-${item.id}`}
                data={item}
                onOpenDeleteModal={() => setIsOpenDeleteModal(true)}
                onOpenEditModal={() => setIsOpenUpdateModal(true)}
                selectItem={(item: TransactionItem) => setSelectedItem(item)}
              />
            )}
          />
        </div>
      )}
      <div className='w-full flex justify-center items-center gap-4'>
        <Button variant='primary' size='md' onClick={() => setIsOpenIncomeModal(true)}>
          Dodaj wpływ
        </Button>
        <Button variant='primary' size='md' onClick={() => setIsOpenExpenseModal(true)}>
          Dodaj wydatek
        </Button>
      </div>
      {isOpenDeleteModal && selectedItem && (
        <DeleteTransactionModal
          isOpenModal={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
          type={selectedItem.type}
          id={selectedItem.id}
          budgetId={Number(budgetId)}
        />
      )}

      {isOpenUpdateModal && (
        <EditTransactionModal
          isOpenModal={isOpenUpdateModal}
          onClose={() => setIsOpenUpdateModal(false)}
          selectedItem={selectedItem}
          budgetId={Number(budgetId)}
        />
      )}
      {isOpenIncomeModal && (
        <AddIncomeModal
          isOpenModal={isOpenIncomeModal}
          onClose={() => setIsOpenIncomeModal(false)}
          isEditMode={false}
          budgetId={Number(budgetId)}
        />
      )}

      {isOpenExpenseModal && (
        <AddExpenseModal
          isOpenModal={isOpenExpenseModal}
          onClose={() => setIsOpenExpenseModal(false)}
          isEditMode={false}
          budgetId={Number(budgetId)}
        />
      )}

      <div className='w-4/5 flex flex-col items-center gap-5'>
        <h2>Kącik inwestycyjny (50/30/20)</h2>
        <div className='w-full flex justify-center'>
          <div className='w-1/4 rounded p-4 shadow'>
            <h2 className='text-2xl'>50 - Rachunki </h2>
            <h3 className='text-base font-bold'>1000 zł</h3>
          </div>
          <div className='w-1/4 rounded p-4 shadow'>
            <h2 className='text-2xl'>30 - Przyjemności</h2>
            <h3 className='text-base font-bold'>1000 zł</h3>
          </div>
          <div className='w-1/4 rounded p-4 shadow'>
            <h2 className='text-2xl'>20 Oszczędności</h2>
            <h3 className='text-base font-bold'>1000 zł</h3>
          </div>
        </div>
        <div className='w-full flex justify-between'>
          <BudgetChart />
          <ExpensesChart />
        </div>
        <div className='w-full flex justify-start px-4'>
          <p className='text-base'></p>
        </div>
      </div>
    </main>
  );
};

export default BudgetDetails;
