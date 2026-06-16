import { useParams } from 'react-router-dom';
import useGetBudgetById from '../../hooks/useGetBudgetById';
import GenericList from '@/components/ui/GenericList';
import TransactionItem from '@/components/transactions/items/TransactionItem';
import useGetExpenses from '@/hooks/useGetExpenses';
import useGetIncomes from '@/hooks/useGetIncomes';
import Button from '@/components/ui/Button';
import useGetCategories from '@/hooks/useGetCategories';
import { useModal } from '@/hooks/useModal';
import { useSelectedItem, type SelectedItem } from '@/hooks/useSelectedItem';
import { BudgetModals } from '@/components/budgets/modals/BudgetModals';
import { BudgetRuleSection } from '@/components/budgets/BudgetRuleSection';
import { BudgetSummaryCards } from '@/components/budgets/BudgetSummaryCards';
import {
  calculateBudgetSplit,
  calculateRuleSplit,
  mergeAndSortTransactions,
  prepareChartData,
} from '@/utils/budgetCalculations';
import { useMemo, useState } from 'react';
import ErrorState from '@/components/layout/ErrorState';
import BudgetChart from '@/components/budgets/charts/BudgetChart';
import { ExpensesChart } from '@/components/transactions/charts/ExpensesChart';
import BudgetsSkeleton from '@/components/BudgetsSkeleton';
import type { Transaction } from '@/types/transaction';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';
import { useGenerateShareLink } from '@/hooks/useGenerateShareLink';
import useExportToPdf from '@/hooks/useExportToPdf';

const BudgetDetails = () => {
  const { id: budgetId } = useParams();
  const { budget, isLoading, error } = useGetBudgetById(Number(budgetId));
  const { expenses } = useGetExpenses(Number(budgetId));
  const { incomes } = useGetIncomes(Number(budgetId));
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { mutateAsync: generateShareLink, isPending: isGeneratingLink } = useGenerateShareLink();
  const { exportToPdf, isPending } = useExportToPdf();
  const deleteModal = useModal();
  const addIncomeModal = useModal();
  const addExpenseModal = useModal();
  const editIncomeModal = useModal();
  const editExpenseModal = useModal();

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

  const handleCopyLink = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true); // Zmieniamy ikonkę na "ptaszka"
      toast.success('Skopiowano link do schowka!');

      // Po 2 sekundach wracamy do zwykłej ikony kopiowania
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message); // Tutaj TS już wie na 100%, że to Error
      }
      toast.error('Nie udało się skopiować linku.');
    }
  };

  const handleGenerateLink = async () => {
    try {
      // 1. Uderzamy do Twojego kodu w C#
      const data = await generateShareLink(Number(budgetId));

      // 2. Sklejamy URL dynamicznie na frontendzie (bezpieczniejsze niż branie z backendu)
      // data.token to właściwość z Twojego `Ok(new { Token = shareToken... })`
      const shareableUrl = `${window.location.origin}/shared/${data.data.token}`;

      // 3. Zapisujemy do stanu, żeby wyświetlił się nasz ładny szary pasek z linkiem
      setShareUrl(shareableUrl);

      // (Opcjonalnie) Możemy od razu wrzucić to użytkownikowi do schowka
      await navigator.clipboard.writeText(shareableUrl);
      setIsCopied(true);
      toast.success('Link wygenerowany i skopiowany do schowka!');

      setTimeout(() => setIsCopied(false), 2000);
    } catch (err: unknown) {
      // Błędy są już obsługiwane w naszym hooku przez toast.error
      if (err instanceof Error) {
        console.log(err.message); // Tutaj TS już wie na 100%, że to Error
      }
      toast.error('Wystąpił błąd podczas generowania linku do udostępnienia!');
    }
  };

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
      {budgetId && (
        <Button
          variant='secondary'
          size='md'
          onClick={() => exportToPdf(Number(budgetId))}
          disabled={isPending}
        >
          Eksportuj Pdf
        </Button>
      )}

      <Button
        variant='secondary'
        size='md'
        onClick={handleGenerateLink}
        disabled={isGeneratingLink} // <--- Blokada
      >
        {isGeneratingLink ? 'Generowanie...' : 'Udostępnij link'}
      </Button>
      {shareUrl && (
        <div className='w-4/5 mt-4 flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm'>
          <span className='text-gray-600 text-sm truncate pr-4 select-all'>{shareUrl}</span>

          <button
            onClick={handleCopyLink}
            className='p-2 hover:bg-gray-200 rounded-md transition-colors duration-200'
            title='Skopiuj link'
          >
            {isCopied ? (
              <Check size={20} className='text-green-600' />
            ) : (
              <Copy size={20} className='text-gray-500' />
            )}
          </button>
        </div>
      )}
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
