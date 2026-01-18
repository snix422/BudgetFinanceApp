// components/budget/BudgetSummaryCards.tsx
type Props = {
  earned: number;
  spent: number;
  remaining: number;
};

export const BudgetSummaryCards = ({ earned, spent, remaining }: Props) => {
  return (
    <div className='w-full flex justify-center gap-6'>
      {/* Wpływy */}
      <div className='w-1/4 flex flex-col justify-center items-center rounded-xl p-6 border border-green-200 bg-green-50/50'>
        <h2 className='text-xs font-bold uppercase tracking-wider text-green-600 mb-1'>Wpływy</h2>
        <h3 className='text-3xl font-black tracking-tight text-gray-900'>{earned} zł</h3>
      </div>
      {/* Wydatki */}
      <div className='w-1/4 flex flex-col justify-center items-center rounded-xl p-6 border border-red-200 bg-red-50/50'>
        <h2 className='text-xs font-bold uppercase tracking-wider text-red-600 mb-1'>Wydatki</h2>
        <h3 className='text-3xl font-black tracking-tight text-gray-900'>{spent} zł</h3>
      </div>
      {/* Pozostało */}
      <div className='w-1/4 flex flex-col justify-center items-center rounded-xl p-6 border border-blue-200 bg-blue-50/50'>
        <h2 className='text-xs font-bold uppercase tracking-wider text-blue-600 mb-1'>Pozostało</h2>
        <h3 className='text-3xl font-black tracking-tight text-gray-900'>{remaining} zł</h3>
      </div>
    </div>
  );
};
