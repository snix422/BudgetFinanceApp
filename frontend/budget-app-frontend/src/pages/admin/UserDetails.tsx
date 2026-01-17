import BudgetCard from '@/components/BudgetCard';
import BudgetsSkeleton from '@/components/BudgetsSkeleton';
import DeleteModal from '@/components/DeleteModal';
import EditBudgetModal from '@/components/EditBudgetModal';
import ErrorState from '@/components/ErrorState';
import GenericList from '@/components/GenericList';
import useGetBudgetsByUserId from '@/hooks/useGetBudgetsByUserId';
import { useModal } from '@/hooks/useModal';
import { useSelectedItem } from '@/hooks/useSelectedItem';
import type { Budget } from '@/schemas/budgetSchema';
import { useNavigate, useParams } from 'react-router';

const UserDetails = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const { budgets, isLoading, error } = useGetBudgetsByUserId(userId);
  console.log(budgets);
  const editModal = useModal(false);
  const deleteModal = useModal(false);
  const { selectedItem, selectItem } = useSelectedItem();

  if (isLoading) return <BudgetsSkeleton lines={6} height={100} />;

  if (error) return <ErrorState message={error.message} />;

  return (
    <main className='w-full p-6 max-w-7xl mx-auto'>
      {/* NAGŁÓWEK Z PRZYCISKIEM WRÓĆ */}
      <div className='flex items-center gap-4 mb-8'>
        <button
          onClick={() => navigate(-1)}
          className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          title='Wróć'
        >
          ⬅️
        </button>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>Szczegóły użytkownika</h1>
          <p className='text-gray-500 text-sm'>ID: {userId}</p>
        </div>
      </div>

      {/* SEKJA BUDŻETÓW */}
      <section>
        <h2 className='text-xl font-semibold mb-4 text-gray-700'>Przypisane budżety</h2>

        <GenericList
          data={budgets || []}
          renderItem={(budget: Budget) => (
            <BudgetCard
              key={budget.id}
              data={budget}
              isAdmin={true}
              userId={userId}
              onEdit={() => {
                selectItem({ ...budget, type: 'budget' } as any);
                editModal.open();
              }}
              onDelete={() => {
                selectItem({ ...budget, type: 'budget' } as any);
                deleteModal.open();
              }}
            />
          )}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          emptyState={
            <div className='text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300'>
              <p className='text-gray-500'>Ten użytkownik nie posiada żadnych budżetów.</p>
            </div>
          }
        />
      </section>
      {editModal.isOpen && selectedItem && (
        <EditBudgetModal
          isOpenModal={editModal.isOpen}
          onClose={editModal.close}
          id={selectedItem.id}
          data={selectedItem as Budget}
        />
      )}
      {deleteModal.isOpen && selectedItem && (
        <DeleteModal
          isOpenModal={deleteModal.isOpen}
          onClose={deleteModal.close}
          type={selectedItem.type as any}
          id={selectedItem.id}
        />
      )}
    </main>
  );
};

export default UserDetails;
