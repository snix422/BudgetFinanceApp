import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';

import AddIncomeForm from '../forms/AddIncomeForm';

type BudgetModalProps = {
  isOpenModal?: boolean;
  onClose: () => void;
  budgetId: number;
};

const AddIncomeModal: React.FC<BudgetModalProps> = ({ isOpenModal, onClose, budgetId }) => {
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-black'>Nowy wpływ</DialogTitle>
          <DialogDescription className='text-black'>
            Wypełnij dane, aby utworzyć nowy wpływ
          </DialogDescription>
        </DialogHeader>
        <AddIncomeForm budgetId={budgetId} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddIncomeModal;
