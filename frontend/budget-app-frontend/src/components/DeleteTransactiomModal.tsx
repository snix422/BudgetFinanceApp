import useGetIncomes from '@/hooks/useGetIncomes';
import Button from './ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import useGetExpenses from '@/hooks/useGetExpenses';

type DeleteTransactionModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
  type: 'income' | 'expense';
  id: number;
};

const DeleteTransactionModal: React.FC<DeleteTransactionModalProps> = ({
  isOpenModal,
  onClose,
  type,
  id,
}) => {
  const { deleteIncome } = useGetIncomes();
  const { deleteExpense } = useGetExpenses();
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-black'>{'Edytuj budżet'}</DialogTitle>
          <DialogDescription className='text-black'>
            Zmień ustawienia wybranego budżetu.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Button onClick={type == 'income' ? () => deleteIncome(id) : () => deleteExpense(id)}>
            Usuń
          </Button>
          <Button onClick={onClose}>Anuluj</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTransactionModal;
