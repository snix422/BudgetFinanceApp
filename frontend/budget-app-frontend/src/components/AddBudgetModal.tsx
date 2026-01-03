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

type BudgetModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
  isEditMode: boolean;
};

const BudgetModal: React.FC<BudgetModalProps> = ({ isOpenModal, isEditMode, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBudgetDto>({
    resolver: zodResolver(CreateBudgetSchema),
    defaultValues: { title: '', totalAmount: 0, startDate: '', endDate: '' },
  });
  console.log(errors);
  const {
    addBudget,
    addBudgetLoading,
    addBudgetError,
    updateBudget,
    updateBudgetLoading,
    updateBudgetError,
  } = useGetBudgets();

  const onSubmit: SubmitHandler<CreateBudgetDto> = (data) => {
    console.log('test');
    addBudget(data);
    console.log(data);
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-black'>
            {isEditMode ? 'Edytuj budżet' : 'Nowy budżet'}
          </DialogTitle>
          <DialogDescription className='text-black'>
            {isEditMode
              ? 'Zmień ustawienia wybranego budżetu.'
              : 'Wypełnij dane, aby utworzyć nową kategorię wydatków.'}
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
              type='number'
              id='amount'
              label='Amount'
              error={errors.totalAmount?.message}
              placeholder='np. 1000'
              {...register('totalAmount')}
            />
            <Input
              type='date'
              id='date'
              label='data'
              error={errors.startDate?.message}
              placeholder='np.20.01.2026'
              {...register('startDate')}
            />
            <Input
              type='date'
              id='date'
              label='End Date'
              error={errors.endDate?.message}
              {...register('endDate')}
            />
          </div>

          <DialogFooter>
            <Button type='button' variant='primary' onClick={onClose}>
              Anuluj
            </Button>
            <Button type='submit' disabled={addBudgetLoading}>
              {addBudgetLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {isEditMode ? 'Zapisz zmiany' : 'Utwórz'}
            </Button>
            {addBudgetError && <p className='text-base text-red-500'>{addBudgetError.message}</p>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetModal;
