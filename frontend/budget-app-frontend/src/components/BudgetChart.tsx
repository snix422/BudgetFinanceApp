import { Bar, BarChart, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from './ui/chart';

const info = [
  {
    incomes: 5000,
    expenses: 2500,
    savings: 2500,
  },
];

const chartConfig = {
  incomes: {
    label: 'Przychody',
    color: '#22c55e', // green-500
  },
  expenses: {
    label: 'Wydatki',
    color: '#ef4444', // red-500
  },
  savings: {
    label: 'Oszczędności',
    color: '#3b82f6', // blue-500
  },
} satisfies ChartConfig;

const BudgetChart = () => {
  return (
    <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
      <PieChart data={info}>
        <Pie
          dataKey={'incomes'}
          name={chartConfig.incomes.label}
          fill='var(--color-incomes)'
          radius={4}
        />
        <Pie
          dataKey={'expenses'}
          name={chartConfig.expenses.label}
          fill='var(--color-expenses)'
          radius={4}
        />
        <Pie
          dataKey={'savings'}
          name={chartConfig.savings.label}
          fill='var(--color-savings)'
          radius={4}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
      </PieChart>
    </ChartContainer>
  );
};

export default BudgetChart;
