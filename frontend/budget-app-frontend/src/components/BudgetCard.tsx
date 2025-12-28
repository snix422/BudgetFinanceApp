import { Link } from 'react-router-dom';
import type { Budget } from '../schemas/budgetSchema';

type BudgetCardProps = {
  data: Budget;
};

const BudgetCard: React.FC<BudgetCardProps> = ({ data }) => {
  return (
    <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center gap-4 transition-all hover:shadow-md hover:border-blue-200'>
      <div className='w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z'
          />
        </svg>
      </div>

      <h3 className='text-xl font-bold text-gray-800'>{data.title}</h3>

      <Link
        to={`/budgets/${data.id}`}
        className='px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors w-full sm:w-auto'
      >
        Zobacz szczegóły
      </Link>
    </div>
  );
};

export default BudgetCard;
