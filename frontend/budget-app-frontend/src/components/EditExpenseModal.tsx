import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

import type { UpdateExpenseDto } from '@/schemas/expenseSchema';
import EditExpenseForm from './EditExpenseForm';

type EditExpenseModalProps = {
  isOpenModal?: boolean;
  onClose?: () => void;
  id: number;
  budgetId: number;
  data: UpdateExpenseDto;
  isAdmin?: boolean;
};

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({
  isOpenModal: externalIsOpen = false,
  onClose: externalOnClose,
  id,
  budgetId,
  data,
  isAdmin = false,
}) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen);
  const isOpenState = externalIsOpen !== undefined ? externalIsOpen : isOpen;
  const handleClose = () => {
    setIsOpen(false);
    externalOnClose?.();
  };
  return (
    <Dialog open={isOpenState} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[425px] bg-white flex flex-col gap-10'>
        <DialogHeader>
          <DialogTitle className='text-black text-center'>Edytuj Wydatek</DialogTitle>
        </DialogHeader>
        <EditExpenseForm
          values={data}
          id={id}
          onClose={handleClose}
          budgetId={budgetId}
          isAdmin={isAdmin}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditExpenseModal;
