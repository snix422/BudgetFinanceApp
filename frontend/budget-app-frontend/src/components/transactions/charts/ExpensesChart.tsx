import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import React, { useMemo } from 'react';

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import type { ChartDataItem } from '@/types/charts';

/*const info = [
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
} satisfies ChartConfig;*/

type ExpensesChartProps = {
  data: ChartDataItem[];
};

export const ExpensesChart: React.FC<ExpensesChartProps> = ({ data }) => {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.value - a.value).slice(0, 15);
  }, [data]);

  const chartConfig = {
    amount: {
      label: 'Kwota',
      color: 'hsl(var(--primary))',
    },
  } satisfies ChartConfig;

  const chartWidth = data.length > 0 ? Math.max(data.length * 110, 500) : '100%';

  return (
    <div className='w-full overflow-x-auto pb-4 flex flex-col items-center'>
      <div className='text-center space-y-1'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Bilans Twoich wydatków</h2>
        <p className='text-base text-gray-500'>Podsumowanie wszystkich wydatków wg kategorii</p>
      </div>
      <div style={{ width: chartWidth, minWidth: '300px' }}>
        <ChartContainer config={chartConfig} className='max-h-[450px] w-full'>
          <BarChart
            accessibilityLayer
            data={sortedData}
            margin={{ top: 30, left: 0, right: 0, bottom: 0 }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

            <XAxis
              dataKey='name'
              tickLine={false}
              axisLine={false}
              interval={0}
              tickMargin={10}
              height={60}
              angle={-20}
              textAnchor='end'
              className='text-xs'
              tickFormatter={(value) => (value.length > 10 ? `${value.slice(0, 10)}...` : value)}
            />

            <YAxis hide padding={{ top: 20 }} />

            <Bar dataKey='value' fill='var(--color-amount)' radius={[4, 4, 0, 0]} maxBarSize={40}>
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
