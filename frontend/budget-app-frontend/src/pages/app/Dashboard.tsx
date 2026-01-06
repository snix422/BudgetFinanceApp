import useGetBudgets from '../../hooks/useGetBudgets';
import GenericList from '../../components/GenericList';
import BudgetsSkeleton from '../../components/BudgetsSkeleton';
import ErrorState from '../../components/ErrorState';
import Button from '../../components/ui/Button';
import { useState } from 'react';
import BudgetModal from '@/components/AddBudgetModal';
import BudgetCard from '@/components/BudgetCard';

export const Dashboard = () => {
  const { budgets, isLoading, error } = useGetBudgets();
  const [isOpenModal, setIsOpenModal] = useState(false);
  if (isLoading) return <BudgetsSkeleton lines={6} height={300} />;
  if (error) return <ErrorState message={error.message} />;
  return (
    <main className='w-full h-full bg-red-200 flex flex-col items-center pt-20 gap-20 font-sans'>
      {budgets && budgets.length > 0 ? (
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-2xl font-bold'>Twoje budżety: </h1>
          <GenericList data={budgets} renderItem={(item, index) => <BudgetCard data={item} />} />
        </div>
      ) : (
        <h1 className='text-2xl font-bold'>Brak budżetów</h1>
      )}
      <Button variant='primary' size='md' onClick={() => setIsOpenModal(true)}>
        Dodaj budżet
      </Button>
      <BudgetModal
        isOpenModal={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        isEditMode={false}
      />
    </main>
  );
};

export default Dashboard;
