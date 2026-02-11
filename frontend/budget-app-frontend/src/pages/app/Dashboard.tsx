import useGetBudgets from '../../hooks/useGetBudgets';
import GenericList from '../../components/ui/GenericList';
import BudgetsSkeleton from '../../components/BudgetsSkeleton';
import ErrorState from '../../components/layout/ErrorState';
import Button from '../../components/ui/Button';
import { useState } from 'react';
import BudgetCard from '@/components/budgets/cards/BudgetCard';
import BudgetModal from '@/components/budgets/modals/AddBudgetModal';

export const Dashboard = () => {
  const { budgets, isLoading, error } = useGetBudgets();
  const [isOpenModal, setIsOpenModal] = useState(false);
  if (isLoading)
    return (
      <div className='w-full flex justify-center items-center mt-10 gap-10 flex-wrap'>
        <BudgetsSkeleton lines={6} height={300} />;
      </div>
    );
  if (error) return <ErrorState message={error.message} />;
  return (
    <main className='w-full h-full bg-red-200 flex flex-col items-center pt-20 gap-20 font-sans p-8'>
      {budgets && budgets.length > 0 ? (
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-2xl font-bold'>Twoje budżety: </h1>
          <GenericList data={budgets} renderItem={(item) => <BudgetCard data={item} />} />
        </div>
      ) : (
        <h1 className='text-2xl font-bold'>Brak budżetów</h1>
      )}
      <Button variant='primary' size='md' onClick={() => setIsOpenModal(true)}>
        Dodaj budżet
      </Button>
      <BudgetModal isOpenModal={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </main>
  );
};

export default Dashboard;
