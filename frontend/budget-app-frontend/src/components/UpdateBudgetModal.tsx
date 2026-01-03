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
import {
  BudgetSchema,
  type Budget,
  type CreateBudgetDto,
  type UpdateBudgetDto,
} from '@/schemas/budgetSchema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import useGetBudgets from '@/hooks/useGetBudgets';
import { Loader2 } from 'lucide-react';

type UpdateBudgetModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
  data: Budget;
};

const UpdateBudgetModal: React.FC<UpdateBudgetModalProps> = ({ isOpenModal, onClose, data }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateBudgetDto>({
    resolver: zodResolver(BudgetSchema),
    defaultValues: { title: data.title, amount: data.amount, date: data.date },
  });

  const {
    addBudget,
    addBudgetLoading,
    addBudgetError,
    updateBudget,
    updateBudgetLoading,
    updateBudgetError,
  } = useGetBudgets();

  const onSubmit: SubmitHandler<UpdateBudgetDto> = (dto) => {
    updateBudget({ id: data.id, dto: dto });
    console.log(data);
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
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
              id='amount'
              label='Amount'
              error={errors.amount?.message}
              placeholder='np. 1000'
              {...register('amount')}
            />
            <Input
              type='date'
              id='date'
              label='data'
              error={errors.date?.message}
              placeholder='np.20.01.2026'
              {...register('date')}
            />
          </div>

          <DialogFooter>
            <Button type='button' variant='primary' onClick={onClose}>
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
