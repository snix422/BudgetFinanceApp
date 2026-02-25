import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { EditIncomeForm } from '../forms/EditIncomeForm';
import type { SelectedItem } from '@/hooks/useSelectedItem';

type EditIncomeModalProps = {
  isOpenModal?: boolean;
  onClose: () => void;
  id: number;
  budgetId: number;
  data: SelectedItem;
  isAdmin?: boolean;
};

const EditIncomeModal: React.FC<EditIncomeModalProps> = ({
  isOpenModal,
  onClose,
  id,
  budgetId,
  data,
  isAdmin = false,
}) => {
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-white flex flex-col gap-10'>
        <DialogHeader>
          <DialogTitle className='text-black text-center'>Edytuj Wpływ</DialogTitle>
        </DialogHeader>
        <EditIncomeForm
          values={data}
          id={id}
          onClose={onClose}
          budgetId={budgetId}
          isAdmin={isAdmin}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditIncomeModal;
