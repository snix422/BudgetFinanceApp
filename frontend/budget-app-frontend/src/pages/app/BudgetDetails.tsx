import { useParams } from 'react-router-dom';
import useGetBudgetById from '../../hooks/useGetBudgetById';
import BudgetChart from '@/components/BudgetChart';
import { ExpensesChart } from '@/components/ExpensesChart';
import GenericList from '@/components/GenericList';
import TransactionItem from '@/components/TransactionItem';
import DeleteTransactionModal from '@/components/DeleteModal';
import EditTransactionModal from '@/components/EditTransactionModal';
import useGetExpenses from '@/hooks/useGetExpenses';
import useGetIncomes from '@/hooks/useGetIncomes';
import type { Income } from '@/schemas/incomeSchema';
import type { Expense } from '@/schemas/expenseSchema';
import Button from '@/components/ui/Button';
import AddIncomeModal from '@/components/AddIncomeModal';
import AddExpenseModal from '@/components/AddExpenseModal';
import useGetCategories from '@/hooks/useGetCategories';
import { calculateBudgetSplit } from '@/utils/calculateBudgetSplit';
import { CategoryRule } from '@/types/enums';
import BudgetSplitChart from '@/components/BudgetSplitChart';
import { calculateRuleSplit } from '@/utils/calculateRuleSplit';
import EditIncomeModal from '@/components/EditIncomeModal';
import EditExpenseModal from '@/components/EditExpenseModal';
import { useModal } from '@/hooks/useModal';
import { useSelectedItem } from '@/hooks/useSelectedItem';

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
  const { selectedItem, selectItem, clearSelection } = useSelectedItem();

  const { categories } = useGetCategories();
  console.log(budget, 'budget');
  console.log(isLoading);
  console.log(error);

  const allTransactions = [
    ...(incomes || []).map((i: Income) => ({ ...i, type: 'income' as const })),
    ...(expenses || []).map((e: Expense) => ({ ...e, type: 'expense' as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  console.log(allTransactions);

  const groupedData = categories?.map((category: any) => {
    const matchingExpenses =
      expenses?.filter((expense) => expense.categoryId === category.id) || [];
    const totalAmount = matchingExpenses.reduce((sum, current) => sum + current.amount, 0);
    return {
      name: category.name,
      value: totalAmount,
    };
  });

  const resultRules = calculateRuleSplit(expenses);

  const { needs, wants, savings } = calculateBudgetSplit(budget?.totalEarned);
  console.log(groupedData, 'groupedData');

  const formatMoney = (amount: number = 0) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      maximumFractionDigits: 0, // lub 2, jeśli chcesz grosze
    }).format(amount);
  };

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

      {deleteModal.isOpen && selectedItem && (
        <DeleteTransactionModal
          isOpenModal={deleteModal.isOpen}
          onClose={deleteModal.close}
          type={selectedItem.type}
          id={selectedItem.id}
          budgetId={Number(budgetId)}
        />
      )}

      {editIncomeModal.isOpen && selectedItem && selectedItem.type === 'income' && (
        <EditIncomeModal
          isOpenModal={editIncomeModal.isOpen}
          onClose={editIncomeModal.close}
          id={selectedItem.id}
          budgetId={Number(budgetId)}
          data={selectedItem as any}
          isAdmin={false}
        />
      )}

      {editExpenseModal.isOpen && selectedItem && selectedItem.type === 'expense' && (
        <EditExpenseModal
          isOpenModal={editExpenseModal.isOpen}
          onClose={editExpenseModal.close}
          id={selectedItem.id}
          budgetId={Number(budgetId)}
          data={selectedItem as any}
          isAdmin={false}
        />
      )}

      {addIncomeModal.isOpen && (
        <AddIncomeModal
          isOpenModal={addIncomeModal.isOpen}
          onClose={addIncomeModal.close}
          isEditMode={false}
          budgetId={Number(budgetId)}
        />
      )}

      {addExpenseModal.isOpen && (
        <AddExpenseModal
          isOpenModal={addExpenseModal.isOpen}
          onClose={addExpenseModal.close}
          isEditMode={false}
          budgetId={Number(budgetId)}
        />
      )}

      <div className='w-4/5 flex flex-col items-center gap-10 min-h-auto p-4 mt-20'>
        <div className='flex flex-col items-center gap-4 space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight'>Zasada 50/30/20</h2>
          <p className='text-muted-foreground max-w-2xl text-center mx-auto'>
            Twój budżet został podzielony na trzy kluczowe obszary. Górne karty pokazują{' '}
            <strong>sugerowane limity</strong> wyliczone na podstawie Twoich przychodów.
          </p>
        </div>

        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Needs */}
          <div className='flex flex-col justify-center items-center rounded-xl p-6 border border-red-100 bg-red-50/50'>
            <span className='text-sm font-medium text-red-600 uppercase tracking-wider mb-1'>
              Limit na Rachunki (50%)
            </span>
            <h3 className='text-3xl font-bold text-gray-900'>{needs} zł</h3>
            <p className='text-xs text-red-400 mt-2 text-center'>Opłaty stałe, czynsz, jedzenie</p>
          </div>

          {/* Wants */}
          <div className='flex flex-col justify-center items-center rounded-xl p-6 border border-yellow-100 bg-yellow-50/50'>
            <span className='text-sm font-medium text-yellow-600 uppercase tracking-wider mb-1'>
              Limit na Przyjemności (30%)
            </span>
            <h3 className='text-3xl font-bold text-gray-900'>{wants} zł</h3>
            <p className='text-xs text-yellow-500 mt-2 text-center'>Rozrywka, wyjścia, hobby</p>
          </div>

          {/* Savings */}
          <div className='flex flex-col justify-center items-center rounded-xl p-6 border border-blue-100 bg-blue-50/50'>
            <span className='text-sm font-medium text-blue-600 uppercase tracking-wider mb-1'>
              Cel Oszczędności (20%)
            </span>
            <h3 className='text-3xl font-bold text-gray-900'>{savings} zł</h3>
            <p className='text-xs text-blue-400 mt-2 text-center'>Poduszka finansowa, inwestycje</p>
          </div>
        </div>

        {/* 3. WYKRESY (REALIZACJA) */}
        <div className='w-full flex flex-col items-center gap-4'>
          <h3 className='text-xl font-semibold'>Bieżące wykorzystanie budżetu</h3>
          <p className='text-md text-muted-foreground mb-4'>
            Poniższe wykresy pokazują, ile już wydałeś w stosunku do powyższych limitów.
          </p>

          {expenses ? (
            <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-8'>
              {/* Pamiętaj, żeby przekazać 'spentAmount' i 'limitAmount' zgodnie z naszą poprzednią rozmową */}
              <BudgetSplitChart
                ruleAmount={resultRules.totalAmountNeeds} // Ile wydałeś faktycznie
                total={needs} // Twój limit z karty wyżej
                label='Rachunki'
                name='needs'
              />
              <BudgetSplitChart
                ruleAmount={resultRules.totalAmountWants}
                total={wants}
                label='Przyjemności'
                name='wants'
              />
              <BudgetSplitChart
                ruleAmount={resultRules.totalAmountSavings}
                total={savings}
                label='Oszczędności'
                name='savings'
              />
            </div>
          ) : (
            <div className='p-10 text-center bg-gray-50 rounded-lg w-full'>
              <h2 className='text-gray-500'>
                Brak wydatków w tym miesiącu. Dodaj pierwszy wydatek, aby zobaczyć postęp.
              </h2>
            </div>
          )}
        </div>

        <div className='w-full flex justify-start px-4'>
          <p className='text-base'></p>
        </div>
      </div>
    </main>
  );
};

export default BudgetDetails;
