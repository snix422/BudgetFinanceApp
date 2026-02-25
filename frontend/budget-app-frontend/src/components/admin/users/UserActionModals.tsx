// src/components/admin/users/UserActionModals.tsx

import EditBudgetModal from '@/components/budgets/modals/EditBudgetModal';
import DeleteModal from '@/components/ui/DeleteModal';
import type { SelectedItem } from '@/hooks/useSelectedItem';
import type { Budget } from '@/schemas/budgetSchema';
import type { ModalType } from '@/hooks/useModal';

type Props = {
  editModal: ModalType;
  deleteModal: ModalType;
  selectedItem: SelectedItem;
};

export const UserActionModals = ({ editModal, deleteModal, selectedItem }: Props) => {
  return (
    <>
      {editModal.isOpen && selectedItem && (
        <EditBudgetModal
          isOpenModal={editModal.isOpen}
          onClose={editModal.close}
          id={Number(selectedItem.id)}
          data={selectedItem as unknown as Budget}
        />
      )}

      {deleteModal.isOpen && selectedItem && (
        <DeleteModal
          isOpenModal={deleteModal.isOpen}
          onClose={deleteModal.close}
          type={selectedItem.type}
          id={Number(selectedItem.id)}
        />
      )}
    </>
  );
};
