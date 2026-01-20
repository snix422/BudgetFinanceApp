// components/budget/BudgetModals.tsx
// Tutaj musisz przekazać wszystkie stany i funkcje close/open jako propsy
// Albo użyć Contextu, jeśli masz ich dużo.
// Wersja uproszczona (Props drilling):

import AddExpenseModal from '../../transactions/modals/AddExpenseModal';
import AddIncomeModal from '../../transactions/modals/AddIncomeModal';
import EditExpenseModal from '../../transactions/modals/EditExpenseModal';
import EditIncomeModal from '../../transactions/modals/EditIncomeModal';
import DeleteModal from '../../ui/DeleteModal';

type Props = {
  budgetId: number;
  selectedItem: any;
  deleteModal: any; // Twój stan modala
  editIncomeModal: any;
  editExpenseModal: any;
  addIncomeModal: any;
  addExpenseModal: any;
};

export const BudgetModals = ({
  budgetId,
  selectedItem,
  deleteModal,
  editIncomeModal,
  editExpenseModal,
  addIncomeModal,
  addExpenseModal,
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

      {/* ... Reszta modali: EditIncome, EditExpense, AddIncome, AddExpense ... */}
      {addIncomeModal.isOpen && (
        <AddIncomeModal
          isOpenModal={addIncomeModal.isOpen}
          onClose={addIncomeModal.close}
          budgetId={budgetId}
        />
      )}
      {addExpenseModal.isOpen && (
        <AddExpenseModal
          isOpenModal={addExpenseModal.isOpen}
          onClose={addExpenseModal.close}
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
