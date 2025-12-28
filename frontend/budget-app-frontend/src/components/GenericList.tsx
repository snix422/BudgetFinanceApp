import type { ReactNode } from 'react';

type GenericListProps<T> = {
  data: T[] | null | undefined;
  renderItem: (item: T, index: number) => ReactNode;
  emptyMessage?: string;
};

const GenericList = <T,>({
  data,
  renderItem,
  emptyMessage = 'Brak danych',
}: GenericListProps<T>) => {
  if (!data?.length || !data) return <p>{emptyMessage}</p>;

  return <div>{data.map((item, index) => renderItem(item, index))}</div>;
};

export default GenericList;
