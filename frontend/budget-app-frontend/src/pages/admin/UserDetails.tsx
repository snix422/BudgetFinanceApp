import { UserActionModals } from '@/components/admin/users/UserActionModals';
import { UserBudgetsSection } from '@/components/admin/users/UserBudgetsSection';
import { UserDetailsHeader } from '@/components/admin/users/UserDetailsHeader';
import BudgetsSkeleton from '@/components/BudgetsSkeleton';
import ErrorState from '@/components/layout/ErrorState';
import useGetBudgetsByUserId from '@/hooks/useGetBudgetsByUserId';
import { useModal } from '@/hooks/useModal';
import { useSelectedItem } from '@/hooks/useSelectedItem';

import { useNavigate, useParams } from 'react-router';

const UserDetails = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const { budgets, isLoading, error } = useGetBudgetsByUserId(userId);
  console.log(budgets);
  const editModal = useModal(false);
  const deleteModal = useModal(false);
  const { selectedItem } = useSelectedItem();

  if (isLoading) return <BudgetsSkeleton lines={6} height={100} />;

  if (error) return <ErrorState message={error.message} />;

  return (
    <main className='w-full p-6 max-w-7xl mx-auto'>
      <UserDetailsHeader userId={userId} navigate={navigate} />

      <UserBudgetsSection
        budgets={budgets}
        userId={userId}
        onDeleteClick={deleteModal.open}
        onEditClick={editModal.open}
      />

      {selectedItem && (
        <UserActionModals
          editModal={editModal}
          deleteModal={deleteModal}
          selectedItem={selectedItem}
        />
      )}
    </main>
  );
};

export default UserDetails;
