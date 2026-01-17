/*import useGetIncomes from '@/hooks/useGetIncomes';
import Button from './ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import useGetExpenses from '@/hooks/useGetExpenses';
import { useAdminTransactionMutations } from '@/hooks/useAdminTransactionMutations';

type DeleteTransactionModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
  type: string;
  id: number;
  budgetId: number;
  isAdmin?: boolean;
};

const DeleteTransactionModal: React.FC<DeleteTransactionModalProps> = ({
  isOpenModal,
  onClose,
  type,
  id,
  budgetId,
  isAdmin = false,
}) => {
  const { deleteIncome } = useGetIncomes(budgetId);
  const { deleteExpense } = useGetExpenses(budgetId);
  const { deleteExpense: deleteExpenseAdmin, deleteIncome: deleteIncomeAdmin } =
    useAdminTransactionMutations(budgetId);
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-white flex flex-col gap-10'>
        <DialogHeader>
          <DialogTitle className='text-black text-center'>
            Usuń {type == 'income' ? 'Wpływ' : 'Wydatek'}
          </DialogTitle>
        </DialogHeader>
        <div className='w-full flex justify-center items-center gap-4'>
          {isAdmin ? (
            <Button
              onClick={
                type == 'income' ? () => deleteIncomeAdmin(id) : () => deleteExpenseAdmin(id)
              }
            >
              Usuń
            </Button>
          ) : (
            <Button
              onClick={
                type == 'income'
                  ? () => deleteIncome({ id, budgetId })
                  : () => deleteExpense({ id, budgetId })
              }
            >
              Usuń
            </Button>
          )}

          <Button onClick={onClose}>Anuluj</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTransactionModal;*/

import useGetIncomes from '@/hooks/useGetIncomes';
import Button from './ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import useGetExpenses from '@/hooks/useGetExpenses';
import { useAdminTransactionMutations } from '@/hooks/useAdminTransactionMutations';
import { useState } from 'react';
import useGetBudgets from '@/hooks/useGetBudgets';

const DELETE_TYPE = {
  INCOME: 'income',
  EXPENSE: 'expense',
  BUDGET: 'budget',
} as const;

type DeleteType = (typeof DELETE_TYPE)[keyof typeof DELETE_TYPE];

type DeleteModalProps = {
  isOpenModal?: boolean;
  onClose?: () => void;
  type: DeleteType;
  id: number;
  budgetId?: number;
  isAdmin?: boolean;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpenModal,
  onClose,
  type,
  id,
  budgetId,
  isAdmin = false,
}) => {
  const { deleteIncome } = useGetIncomes(budgetId || 0);
  const { deleteExpense } = useGetExpenses(budgetId || 0);
  const { deleteExpense: deleteExpenseAdmin, deleteIncome: deleteIncomeAdmin } =
    useAdminTransactionMutations(budgetId || 0);
  const { deleteBudget } = useGetBudgets();

  const getTitleLabel = (): string => {
    switch (type) {
      case DELETE_TYPE.INCOME:
        return 'Wpływ';
      case DELETE_TYPE.EXPENSE:
        return 'Wydatek';
      case DELETE_TYPE.BUDGET:
        return 'Budżet';
      default:
        return 'Element';
    }
  };

  const handleDelete = () => {
    if (type === DELETE_TYPE.INCOME) {
      if (isAdmin) {
        deleteIncomeAdmin(id);
      } else {
        deleteIncome({ id, budgetId: budgetId || 0 });
      }
    } else if (type === DELETE_TYPE.EXPENSE) {
      if (isAdmin) {
        deleteExpenseAdmin(id);
      } else {
        deleteExpense({ id, budgetId: budgetId || 0 });
      }
    } else if (type === DELETE_TYPE.BUDGET) {
      deleteBudget(id);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-white flex flex-col gap-10'>
        <DialogHeader>
          <DialogTitle className='text-black text-center'>Usuń {getTitleLabel()}</DialogTitle>
        </DialogHeader>
        <div className='w-full flex justify-center items-center gap-4'>
          <Button onClick={handleDelete}>Usuń</Button>
          <Button onClick={onClose}>Anuluj</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
export { DELETE_TYPE };
export type { DeleteType };
