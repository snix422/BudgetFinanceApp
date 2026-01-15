import { zodResolver } from '@hookform/resolvers/zod';
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

export default EditTransactionModal;
