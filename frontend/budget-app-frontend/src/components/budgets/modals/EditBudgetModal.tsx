import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import type { Budget, UpdateBudgetDto } from '@/schemas/budgetSchema';
import { EditBudgetForm } from '../forms/EditBudgetForm';

type EditBudgetModalProps = {
  isOpenModal?: boolean;
  onClose?: () => void;
  id: number;
  data: Budget;
};

const EditBudgetModal: React.FC<EditBudgetModalProps> = ({
  isOpenModal: externalIsOpen = false,
  onClose: externalOnClose,
  id,
  data,
}) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen);
  const isOpenState = externalIsOpen !== undefined ? externalIsOpen : isOpen;
  const handleClose = () => {
    setIsOpen(false);
    externalOnClose?.();
  };
  if (!data) {
    return null; // Nie renderuj modal jeśli brak danych
  }
  return (
    <Dialog open={isOpenState} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[425px] bg-white flex flex-col gap-10'>
        <DialogHeader>
          <DialogTitle className='text-black text-center'>Edytuj Budżet</DialogTitle>
        </DialogHeader>
        <EditBudgetForm values={data} id={id} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default EditBudgetModal;
