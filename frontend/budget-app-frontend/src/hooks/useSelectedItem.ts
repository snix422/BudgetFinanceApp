import { useState } from 'react';

export type SelectedItem = {
  id: number | string;
  type: 'income' | 'expense';
  title: string;
  amount: number;
  date: string;
  categoryId?: number;
};

export const useSelectedItem = () => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  return {
    selectedItem,
    selectItem: (item: SelectedItem) => setSelectedItem(item),
    clearSelection: () => setSelectedItem(null),
  };
};
