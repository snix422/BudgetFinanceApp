import { zodResolver } from '@hookform/resolvers/zod';
import { BudgetSchema, type Budget, type UpdateBudgetDto } from '@/schemas/budgetSchema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import useGetBudgets from '@/hooks/useGetBudgets';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

type UpdateBudgetModalProps = {
  isOpenModal?: boolean;
  onClose?: () => void;
  data: Budget;
};

const UpdateBudgetModal: React.FC<UpdateBudgetModalProps> = ({
  isOpenModal: externalIsOpen = false,
  onClose: externalOnClose,
  data,
}) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen);
  const isOpenState = externalIsOpen !== undefined ? externalIsOpen : isOpen;
  const handleClose = () => {
    setIsOpen(false);
    externalOnClose?.();
  };
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<UpdateBudgetDto>({
    resolver: zodResolver(BudgetSchema),
    defaultValues: { title: data.title, startDate: data.startDate, endDate: data.endDate },
  });

  const { updateBudget, updateBudgetLoading, updateBudgetError } = useGetBudgets();

  const onSubmit: SubmitHandler<UpdateBudgetDto> = (dto) => {
    updateBudget({ id: data.id, dto: dto });
    console.log(data);
  };

  return (
    <Dialog open={isOpenState} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-black'>Edytuj budżet</DialogTitle>
          <DialogDescription className='text-black'>
            Zmień ustawienia wybranego budżetu
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Input
              id='title'
              label='Title'
              error={errors.title?.message}
              placeholder='np. Jedzenie'
              {...register('title')}
            />
            <Input
              id='startDate'
              label='startDate'
              type='date'
              error={errors.startDate?.message}
              placeholder='np. 1000'
              {...register('startDate')}
            />
            <Input
              id='endDate'
              label='endDate'
              type='date'
              error={errors.endDate?.message}
              placeholder='np.20.01.2026'
              {...register('endDate')}
            />
          </div>

          <DialogFooter>
            <Button type='button' variant='primary' onClick={handleClose}>
              Anuluj
            </Button>
            <Button type='submit' disabled={updateBudgetLoading}>
              {updateBudgetLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Zapisz zmiany
            </Button>
            {updateBudgetError && (
              <p className='text-base text-red-500'>{updateBudgetError.message}</p>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBudgetModal;
