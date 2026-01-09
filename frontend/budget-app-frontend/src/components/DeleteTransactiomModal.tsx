import useGetIncomes from '@/hooks/useGetIncomes';
import Button from './ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import useGetExpenses from '@/hooks/useGetExpenses';

type DeleteTransactionModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
  type: string;
  id: number;
  budgetId: number;
};

const DeleteTransactionModal: React.FC<DeleteTransactionModalProps> = ({
  isOpenModal,
  onClose,
  type,
  id,
  budgetId,
}) => {
  const { deleteIncome } = useGetIncomes(budgetId);
  const { deleteExpense } = useGetExpenses(budgetId);
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-white flex flex-col gap-10'>
        <DialogHeader>
          <DialogTitle className='text-black text-center'>Usuń budżet</DialogTitle>
        </DialogHeader>
        <div className='w-full flex justify-center items-center gap-4'>
          <Button
            onClick={
              type == 'income'
                ? () => deleteIncome({ id, budgetId })
                : () => deleteExpense({ id, budgetId })
            }
          >
            Usuń
          </Button>
          <Button onClick={onClose}>Anuluj</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTransactionModal;
