import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import AddBudgetForm from '../forms/AddBudgetForm';

type BudgetModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
};

const BudgetModal: React.FC<BudgetModalProps> = ({ isOpenModal, onClose }) => {
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-black'>Nowy budżet</DialogTitle>
          <DialogDescription className='text-black'>
            Wypełnij dane, aby utworzyć nową kategorię wydatków
          </DialogDescription>
        </DialogHeader>

        <AddBudgetForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default BudgetModal;
