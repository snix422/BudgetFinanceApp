import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import React, { useMemo } from 'react';

import { Bar, BarChart, LabelList, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';

const info = [
  {
    rachunki: 700,
    kredyt: 1500,
    zakupy: 500,
    zabawa: 500,
  },
];

const chartConfig = {
  rachunki: {
    label: 'Rachunki',
    color: '#22c55e', // green-500
  },
  kredyt: {
    label: 'Kredyt',
    color: '#ef4444', // red-500
  },
  zakupy: {
    label: 'Zakupy',
    color: '#3b82f6', // blue-500
  },
  zabawa: {
    label: 'Zabawa',
    color: '#ef9999',
  },
} satisfies ChartConfig;

type ExpensesChart = {
  data: any[];
};

export const ExpensesChart: React.FC<ExpensesChart> = ({ data }) => {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.value - a.value).slice(0, 15);
  }, [data]);
  console.log(data);
  const chartConfig = {
    amount: {
      label: 'Kwota',
      color: 'hsl(var(--primary))',
    },
  } satisfies ChartConfig;
  const chartWidth = data.length > 0 ? Math.max(data.length * 110, 500) : '100%';
  return (
    <div className='w-full overflow-x-auto pb-4 flex flex-col items-center'>
      {/* Jeśli chartWidth jest undefined, div zajmie 100%, jeśli ustawiony - rozszerzy się */}
      <div className='text-center space-y-1'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Bilans Twoich wydatków</h2>
        <p className='text-base text-gray-500'>Podsumowanie wszystkich wydatków wg kategorii</p>
      </div>
      <div style={{ width: chartWidth, minWidth: '300px' }}>
        <ChartContainer config={chartConfig} className='max-h-[450px] w-full'>
          <BarChart
            accessibilityLayer
            data={sortedData}
            margin={{ top: 30, left: 0, right: 0, bottom: 0 }} // Marginesy
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

            <XAxis
              dataKey='name'
              tickLine={false}
              axisLine={false}
              interval={0} // Wymusza pokazanie wszystkich etykiet (nie pomija co drugiej)
              tickMargin={10} // Odstęp od słupka
              height={60} // 2. ZWIĘKSZONA WYSOKOŚĆ na napisy
              angle={-20} // 2. OBRÓT napisów
              textAnchor='end' // Zakotwiczenie tekstu (żeby środek nie był pod słupkiem)
              className='text-xs' // Mniejsza czcionka
              // Opcjonalnie: skracanie bardzo długich nazw
              tickFormatter={(value) => (value.length > 10 ? `${value.slice(0, 10)}...` : value)}
            />

            <YAxis hide padding={{ top: 20 }} />

            <Bar
              dataKey='value'
              fill='var(--color-amount)'
              radius={[4, 4, 0, 0]}
              maxBarSize={40} // 3. LIMIT GRUBOŚCI (Naprawia problem 1 kolumny)
            >
              <LabelList
                dataKey='value'
                position='top'
                className='fill-foreground text-xs font-bold'
                formatter={(value: number) => `${value} zł`}
                offset={10}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
