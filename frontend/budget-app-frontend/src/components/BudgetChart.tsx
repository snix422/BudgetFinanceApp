import { Bar, BarChart, Legend, Pie, PieChart, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from './ui/chart';

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

type BudgetChartProps = {
  income: number;
  expenses: number;
  savings: number;
};

const BudgetChart: React.FC<BudgetChartProps> = ({ income, expenses, savings }) => {
  const chartData = [
    { category: 'incomes', amount: income, fill: 'var(--color-incomes)' },
    { category: 'expenses', amount: expenses, fill: 'var(--color-expenses)' },
    { category: 'savings', amount: savings, fill: 'var(--color-savings)' },
  ];

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='text-center space-y-1'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Bilans Twojego budżetu</h2>
        <p className='text-base text-gray-500'>Podsumowanie wszystkich kategorii w tym miesiącu</p>
      </div>
      <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData} // Tutaj wchodzi cała tablica
            dataKey='amount' // To decyduje o wielkości kawałka (liczba)
            nameKey='category' // To decyduje o nazwie i przypisaniu koloru (klucz)
            innerRadius={30} // Opcjonalne: robi dziurkę w środku (Donut chart)
            strokeWidth={5}
          />
          <ChartLegend content={<ChartLegendContent nameKey='category' />} />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default BudgetChart;
