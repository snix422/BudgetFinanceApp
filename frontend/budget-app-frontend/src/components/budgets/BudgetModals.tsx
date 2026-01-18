// components/budget/BudgetModals.tsx
// Tutaj musisz przekazać wszystkie stany i funkcje close/open jako propsy
// Albo użyć Contextu, jeśli masz ich dużo.
// Wersja uproszczona (Props drilling):

import AddIncomeModal from '../AddIncomeModal';
import DeleteModal from '../DeleteModal';

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
          isEditMode={false}
          budgetId={budgetId}
        />
      )}
      {/* itd... */}
    </>
  );
};
