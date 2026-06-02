import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import Button from '../../ui/Button';
import type { DeleteType } from '@/components/ui/DeleteModal';
import type { Transaction } from '@/types/transaction';
import type { SelectedItem } from '@/hooks/useSelectedItem';

type TransactionItem = {
  id: number | string;
  title: string;
  amount: number;
  date: string;
  type: DeleteType;
  categoryName?: string;
};

interface TransactionItemProps {
  data: Transaction;
  onOpenDeleteModal: () => void;
  onOpenEditModal: () => void;
  selectItem: (item: SelectedItem) => void;
  isReadOnly?: boolean;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  data,
  onOpenDeleteModal,
  onOpenEditModal,
  selectItem,
  isReadOnly = false,
}) => {
  const formattedDate = new Date(data.date).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const isExpense = data.type === 'expense';

  const handleClickDelete = () => {
    selectItem(data);
    onOpenDeleteModal();
  };

  const handleClickUpdate = () => {
    selectItem(data);
    onOpenEditModal();
  };

  return (
    <div className='w-4/5 group flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200'>
      <div className='flex items-center gap-4 mb-3 sm:mb-0'>
        <div
          className={`p-3 rounded-full ${isExpense ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}
        >
          {isExpense ? (
            <ArrowDownCircle data-testid='arrow-down' size={24} />
          ) : (
            <ArrowUpCircle data-testid='arrow-up' size={24} />
          )}
        </div>

        <div className='flex flex-col'>
          <span className='font-semibold text-gray-800 text-base'>{data.title}</span>
          <span className='text-xs text-gray-400'>{formattedDate}</span>
        </div>
      </div>

      <div className='hidden md:flex flex-1 justify-center'>
        {isExpense && data.categoryName && (
          <div className='flex gap-4'>
            <span className='bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-200'>
              Wydatek
            </span>
            <span className='bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-200'>
              {data.categoryName}
            </span>
          </div>
        )}
        {!isExpense && (
          <span className='bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium border border-green-100'>
            Wpływ
          </span>
        )}
      </div>

      <div className='flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto'>
        <span className={`text-lg font-bold ${isExpense ? 'text-red-600' : 'text-green-600'}`}>
          {isExpense ? '-' : '+'}
          {data.amount.toFixed(2)} zł
        </span>

        {isReadOnly ? null : (
          <div className='flex items-center gap-1'>
            <Button variant='edit' size='md' onClick={handleClickUpdate} className='h-8 w-8  px-10'>
              Edit
            </Button>

            <Button
              variant='delete'
              size='md'
              onClick={handleClickDelete}
              className='h-8 w-8 px-10'
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
