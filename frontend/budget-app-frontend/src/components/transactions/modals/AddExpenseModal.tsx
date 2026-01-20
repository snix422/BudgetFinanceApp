import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import AddExpenseForm from '../forms/AddExpenseForm';

type BudgetModalProps = {
  isOpenModal?: boolean;
  onClose: () => void;
  budgetId: number;
};

const AddExpenseModal: React.FC<BudgetModalProps> = ({ isOpenModal, onClose, budgetId }) => {
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-black'>Nowy wydatek</DialogTitle>
          <DialogDescription className='text-black'>
            Wypełnij dane, aby dodać nowy wydatek
          </DialogDescription>
        </DialogHeader>
        <AddExpenseForm budgetId={budgetId} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
