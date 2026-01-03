import { useParams } from 'react-router-dom';
import useGetBudgetById from '../../hooks/useGetBudgetById';
import BudgetChart from '@/components/BudgetChart';
import { ExpensesChart } from '@/components/ExpensesChart';
import GenericList from '@/components/GenericList';

const BudgetDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBudgetById(Number(id));
  console.log(data);
  console.log(isLoading);
  console.log(error);
  return (
    <main className='w-full h-full flex flex-col items-center gap-10 '>
      <div className='w-4/5 flex flex-col items-center gap-5'>
        <div className='w-full flex justify-center'>
          <div className='w-1/4 rounded p-4 shadow'>
            <h2 className='text-2xl'>Wpływy</h2>
            <h3 className='text-base font-bold'>1000 zł</h3>
          </div>
          <div className='w-1/4 rounded p-4 shadow'>
            <h2 className='text-2xl'>Wpływy</h2>
            <h3 className='text-base font-bold'>1000 zł</h3>
          </div>
          <div className='w-1/4 rounded p-4 shadow'>
            <h2 className='text-2xl'>Wpływy</h2>
            <h3 className='text-base font-bold'>1000 zł</h3>
          </div>
        </div>
        <div className='w-full flex justify-between'>
          <BudgetChart />
          <ExpensesChart />
        </div>
      </div>
      <div className='w-4/5 flex items-center'>
        <GenericList />
      </div>
    </main>
  );
};

export default BudgetDetails;
