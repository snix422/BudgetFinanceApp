import BudgetSplitChart from '../BudgetSplitChart';

// components/budget/BudgetRuleSection.tsx
type Props = {
  needs: number;
  wants: number;
  savings: number;
  resultRules: any; // Tutaj daj swój typ
  hasExpenses: boolean;
};

export const BudgetRuleSection = ({ needs, wants, savings, resultRules, hasExpenses }: Props) => {
  return (
    <div className='w-4/5 flex flex-col items-center gap-10 min-h-auto p-4 mt-20'>
      <div className='flex flex-col items-center gap-4 space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Zasada 50/30/20</h2>
        <p className='text-muted-foreground max-w-2xl text-center mx-auto'>
          Twój budżet został podzielony na trzy kluczowe obszary...
        </p>
      </div>

      {/* KARTY LIMITÓW */}
      <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* ... Tutaj wklej te 3 divy z Needs, Wants, Savings ... */}
        <div className='flex flex-col justify-center items-center rounded-xl p-6 border border-red-100 bg-red-50/50'>
          <span className='text-sm font-medium text-red-600 uppercase tracking-wider mb-1'>
            Limit na Rachunki (50%)
          </span>
          <h3 className='text-3xl font-bold text-gray-900'>{needs} zł</h3>
        </div>
        {/* ... reszta kart ... */}
      </div>

      {/* WYKRESY */}
      <div className='w-full flex flex-col items-center gap-4'>
        <h3 className='text-xl font-semibold'>Bieżące wykorzystanie budżetu</h3>
        {hasExpenses ? (
          <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-8'>
            <BudgetSplitChart
              ruleAmount={resultRules.totalAmountNeeds}
              total={needs}
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
            <h2 className='text-gray-500'>Brak wydatków w tym miesiącu...</h2>
          </div>
        )}
      </div>
    </div>
  );
};
