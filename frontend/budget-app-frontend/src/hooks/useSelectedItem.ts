import { useState } from 'react';

export type SelectedItem = Record<string, any>;

export const useSelectedItem = () => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  return {
    selectedItem,
    selectItem: (item: SelectedItem) => setSelectedItem(item),
    clearSelection: () => setSelectedItem(null),
  };
};
