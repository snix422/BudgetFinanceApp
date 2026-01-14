import type { ReactNode } from 'react';

type GenericListProps<T> = {
  data: T[] | null | undefined;
  renderItem: (item: T, index: number) => ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
};

const GenericList = <T,>({
  data,
  renderItem,
  emptyState = 'Brak danych',
  className,
}: GenericListProps<T>) => {
  //if (!data?.length || !data) return <h2 className='text-white text-2xl'>{emptyMessage}</h2>;
  if (!data || data.length === 0) {
    return <>{emptyState || <p className='text-center text-gray-500'>Brak danych.</p>}</>;
  }
  return (
    <div className={className}>{data && data.map((item, index) => renderItem(item, index))}</div>
  );
};

export default GenericList;
