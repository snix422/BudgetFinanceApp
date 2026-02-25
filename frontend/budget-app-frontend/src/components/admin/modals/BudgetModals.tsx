import EditExpenseModal from '@/components/transactions/modals/EditExpenseModal';
import EditIncomeModal from '@/components/transactions/modals/EditIncomeModal';
import DeleteModal from '@/components/ui/DeleteModal';
import type { SelectedItem } from '@/hooks/useSelectedItem';
import type { ModalType } from '@/hooks/useModal';

type Props = {
  budgetId: number;
  selectedItem: SelectedItem;
  deleteModal: ModalType; // Twój stan modala
  editIncomeModal: ModalType;
  editExpenseModal: ModalType;
};

export const BudgetModals = ({
  budgetId,
  selectedItem,
  deleteModal,
  editIncomeModal,
  editExpenseModal,
}: Props) => {
  return (
    <>
      {deleteModal.isOpen && selectedItem && (
        <DeleteModal
          isOpenModal={deleteModal.isOpen}
          onClose={deleteModal.close}
          type={selectedItem.type}
          id={Number(selectedItem.id)}
          budgetId={budgetId}
        />
      )}

      {editIncomeModal.isOpen && selectedItem && (
        <EditIncomeModal
          isOpenModal={editIncomeModal.isOpen}
          onClose={editIncomeModal.close}
          data={selectedItem}
          budgetId={budgetId}
          id={Number(selectedItem.id)}
        />
      )}
      {editExpenseModal.isOpen && selectedItem && (
        <EditExpenseModal
          isOpenModal={editExpenseModal.isOpen}
          onClose={editExpenseModal.close}
          id={Number(selectedItem.id)}
          budgetId={budgetId}
          data={{
            ...selectedItem,
            categoryId: selectedItem.categoryId ?? 0, // Jeśli undefined, daj 0 lub id kategorii "Inne"
          }}
        />
      )}
    </>
  );
};
