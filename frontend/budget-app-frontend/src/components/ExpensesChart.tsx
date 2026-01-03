import React from 'react';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from './ui/chart';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';

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

export const ExpensesChart = () => {
  return (
    <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
      <PieChart data={info}>
        <Pie
          dataKey={'rachunki'}
          name={chartConfig.rachunki.label}
          fill='var(--color-rachunki)'
          radius={4}
        />
        <Pie
          dataKey={'kredyt'}
          name={chartConfig.kredyt.label}
          fill='var(--color-kredyt)'
          radius={4}
        />
        <Pie
          dataKey={'zakupy'}
          name={chartConfig.zakupy.label}
          fill='var(--color-zakupy)'
          radius={4}
        />
        <Pie
          dataKey={'zabawa'}
          name={chartConfig.zabawa.label}
          fill='var(--color-zabawa)'
          radius={4}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
      </PieChart>
    </ChartContainer>
  );
};
