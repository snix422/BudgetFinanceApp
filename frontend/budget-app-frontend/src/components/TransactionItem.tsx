import { ArrowDownCircle, ArrowUpCircle, Pencil, Trash2 } from 'lucide-react';
import Button from './ui/Button';
// Zakładam, że Button masz zainstalowany

type TransactionItem = {
  id: number;
  title: string;
  amount: number;
  date: string;
  type: string;
  categoryName: string;
};

interface TransactionItemProps {
  data: TransactionItem;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ data, onDelete, onEdit }) => {
  // Formatowanie daty na polski format (np. 12.05.2024)
  const formattedDate = new Date(data.date).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const isExpense = data.type === 'expense';

  return (
    <div className='group flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200'>
      {/* --- LEWA STRONA: IKONA I OPIS --- */}
      <div className='flex items-center gap-4 mb-3 sm:mb-0'>
        {/* Ikona: Czerwona dla wydatku, Zielona dla wpływu */}
        <div
          className={`p-3 rounded-full ${isExpense ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}
        >
          {isExpense ? <ArrowDownCircle size={24} /> : <ArrowUpCircle size={24} />}
        </div>

        <div className='flex flex-col'>
          <span className='font-semibold text-gray-800 text-base'>{data.title}</span>
          <span className='text-xs text-gray-400'>{formattedDate}</span>
        </div>
      </div>

      {/* --- ŚRODEK: KATEGORIA (TYLKO DLA WYDATKÓW) --- */}
      {/* Ukrywamy na bardzo małych ekranach, pokazujemy od md w górę */}
      <div className='hidden md:flex flex-1 justify-center'>
        {isExpense && data.categoryName && (
          <div>
            <span className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-200'>
              Wydatek
            </span>
            <span className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-200'>
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

      {/* --- PRAWA STRONA: KWOTA I PRZYCISKI --- */}
      <div className='flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto'>
        <span className={`text-lg font-bold ${isExpense ? 'text-red-600' : 'text-green-600'}`}>
          {isExpense ? '-' : '+'}
          {data.amount.toFixed(2)} zł
        </span>

        <div className='flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200'>
          <Button
            variant='primary'
            size='md'
            onClick={() => onEdit(data.id)}
            className='h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full'
          >
            <Pencil size={16} />
          </Button>

          <Button
            variant='primary'
            size='md'
            onClick={() => onDelete(data.id)}
            className='h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full'
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
