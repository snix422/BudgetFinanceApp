// src/components/admin/users/UserActionModals.tsx

import EditBudgetModal from '@/components/budgets/modals/EditBudgetModal';
import DeleteModal from '@/components/ui/DeleteModal';
import type { Budget } from '@/schemas/budgetSchema';

type Props = {
  editModal: any;
  deleteModal: any;
  selectedItem: any;
};

export const UserActionModals = ({ editModal, deleteModal, selectedItem }: Props) => {
  return (
    <>
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
          type={selectedItem.type}
          id={selectedItem.id}
        />
      )}
    </>
  );
};
