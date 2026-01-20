import EditExpenseModal from '@/components/transactions/modals/EditExpenseModal';
import EditIncomeModal from '@/components/transactions/modals/EditIncomeModal';
import DeleteModal from '@/components/ui/DeleteModal';

type Props = {
  budgetId: number;
  selectedItem: any;
  deleteModal: any; // Twój stan modala
  editIncomeModal: any;
  editExpenseModal: any;
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
          id={selectedItem.id}
          budgetId={budgetId}
        />
      )}

      {editIncomeModal.isOpen && selectedItem && (
        <EditIncomeModal
          isOpenModal={editIncomeModal.isOpen}
          onClose={editIncomeModal.close}
          data={selectedItem}
          budgetId={budgetId}
          id={selectedItem.id}
        />
      )}
      {editExpenseModal.isOpen && selectedItem && (
        <EditExpenseModal
          isOpenModal={editExpenseModal.isOpen}
          onClose={editExpenseModal.close}
          id={selectedItem.id}
          budgetId={budgetId}
          data={selectedItem}
        />
      )}
    </>
  );
};
