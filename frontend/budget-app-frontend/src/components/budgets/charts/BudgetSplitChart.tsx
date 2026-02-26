import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Pie, PieChart } from 'recharts';

type BudgetSplitChartProps = {
  ruleAmount: number;
  total: number;
  label: string;
  name: string;
};

const BudgetSplitChart: React.FC<BudgetSplitChartProps> = ({ ruleAmount, total, label, name }) => {
  const categoryColors: Record<string, string> = {
    needs: '#ef4444',
    wants: '#eab308',
    savings: '#3b82f6',
  };
  const activeColor = categoryColors[name] || '#22c55e';
  const chartConfig = {
    [name]: {
      label: label,
      color: activeColor, // green-500
    },
    total: {
      label: ' Do wydania',
      color: '#e5e7eb', // red-500
    },
  } satisfies ChartConfig;

  const chartData = [
    { category: name, amount: ruleAmount, fill: `var(--color-${name})` },
    { category: 'total', amount: total - ruleAmount, fill: 'var(--color-total)' },
  ];

  return (
    <div className='w-full flex flex-col items-center'>
      <h2 className='text-2xl font-bold tracking-tight mb-1' style={{ color: activeColor }}>
        {label}
      </h2>

      {/* 2. PODTYTUŁ Z KWOTAMI */}
      {/* Ważne: szary kolor (muted-foreground) i mała czcionka */}
      <span className='text-sm font-medium text-muted-foreground mb-4'>
        {ruleAmount} zł / {total} zł
      </span>
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

export default BudgetSplitChart;
