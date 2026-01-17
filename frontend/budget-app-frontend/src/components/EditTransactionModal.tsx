/*import { zodResolver } from '@hookform/resolvers/zod';
import Button from './ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import Input from './ui/Input';
import { BudgetSchema, CreateBudgetSchema, type CreateBudgetDto } from '@/schemas/budgetSchema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import useGetBudgets from '@/hooks/useGetBudgets';
import { Loader2 } from 'lucide-react';
import useGetExpenses from '@/hooks/useGetExpenses';
import type { UpdateExpenseDto } from '@/schemas/expenseSchema';
import useGetIncomes from '@/hooks/useGetIncomes';
import { EditIncomeForm } from './EditIncomeForm';
import EditExpenseForm from './EditExpenseForm';

type EditTransactionModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
  selectedItem: any;
  budgetId: number;
  isAdmin?: boolean;
};

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  isOpenModal,
  onClose,
  selectedItem,
  budgetId,
  isAdmin = false,
}) => {
  console.log(selectedItem);
  console.log(budgetId);
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-black'>
            Edytuj {selectedItem.type == 'income' ? 'Wpływ' : 'Wydatek'}
          </DialogTitle>
          <DialogDescription className='text-black'>
            Zmień ustawienia wybranego budżetu.
          </DialogDescription>
        </DialogHeader>
        {selectedItem.type == 'income' ? (
          <EditIncomeForm
            values={selectedItem}
            id={selectedItem.id}
            onClose={onClose}
            budgetId={budgetId}
          />
        ) : (
          <EditExpenseForm
            values={selectedItem}
            id={selectedItem.id}
            onClose={onClose}
            budgetId={budgetId}
            isAdmin={isAdmin}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionModal;*/

import useGetExpenses from '@/hooks/useGetExpenses';
import useGetIncomes from '@/hooks/useGetIncomes';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useState } from 'react';

const EDIT_TYPE = {
  INCOME: 'income',
  EXPENSE: 'expense',
  BUDGET: 'budget',
} as const;

type EditType = (typeof EDIT_TYPE)[keyof typeof EDIT_TYPE];

type EditModalProps = {
  isOpenModal?: boolean;
  onClose?: () => void;
  type: EditType;
  id: number;
  budgetId?: number;
  isAdmin?: boolean;
  data?: Record<string, any>; // dane do edycji
};

const EditModal: React.FC<EditModalProps> = ({
  isOpenModal: externalIsOpen = false,
  onClose: externalOnClose,
  type,
  id,
  budgetId,
  isAdmin = false,
  data,
}) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen);
  const isOpenState = externalIsOpen !== undefined ? externalIsOpen : isOpen;
  const handleClose = () => {
    setIsOpen(false);
    externalOnClose?.();
  };
  const { updateIncome } = useGetIncomes(budgetId || 0);
  const { updateExpense } = useGetExpenses(budgetId || 0);
  // const { updateBudget } = useBudgetMutations();

  const getTitleLabel = (): string => {
    switch (type) {
      case EDIT_TYPE.INCOME:
        return 'Wpływ';
      case EDIT_TYPE.EXPENSE:
        return 'Wydatek';
      case EDIT_TYPE.BUDGET:
        return 'Budżet';
      default:
        return 'Element';
    }
  };

  const handleEdit = (formData: Record<string, any>) => {
    if (type === EDIT_TYPE.INCOME) {
      updateIncome({ id, budgetId: budgetId || 0, ...formData });
    } else if (type === EDIT_TYPE.EXPENSE) {
      updateExpense({ id, ...formData, budgetId: budgetId || 0 });
    } else if (type === EDIT_TYPE.BUDGET) {
      // updateBudget({ id, ...formData });
    }
  };

  return (
    <Dialog open={isOpenState} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[425px] bg-white flex flex-col gap-10'>
        <DialogHeader>
          <DialogTitle className='text-black text-center'>Edytuj {getTitleLabel()}</DialogTitle>
        </DialogHeader>
        {/* Tutaj dodaj formularz edycji */}
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
export { EDIT_TYPE };
export type { EditType };
