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
import { CreateBudgetSchema, type CreateBudgetDto } from '@/schemas/budgetSchema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import useGetBudgets from '@/hooks/useGetBudgets';
import { Loader2 } from 'lucide-react';
import useGetIncomes from '@/hooks/useGetIncomes';
import { CreateIncomeSchema, type CreateIncomeDto } from '@/schemas/incomeSchema';

type BudgetModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
  isEditMode: boolean;
  budgetId: number;
};

const AddIncomeModal: React.FC<BudgetModalProps> = ({
  isOpenModal,
  isEditMode,
  onClose,
  budgetId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateIncomeDto>({
    resolver: zodResolver(CreateIncomeSchema),
    defaultValues: { title: '', amount: 0, date: '' },
  });
  console.log(errors);

  const { addIncome, addIncomeLoading, addIncomeError } = useGetIncomes(budgetId);

  const onSubmit: SubmitHandler<CreateIncomeDto> = (dto) => {
    console.log('test');
    addIncome({ dto, budgetId });
    onClose();
    console.log(dto);
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-black'>Nowy wpływ</DialogTitle>
          <DialogDescription className='text-black'>
            Wypełnij dane, aby utworzyć nowy wpływ
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
              error={errors.amount?.message}
              placeholder='np.20.01.2026'
              {...register('amount')}
            />
            <Input
              type='date'
              id='date'
              label='Data'
              error={errors.date?.message}
              {...register('date')}
            />
          </div>

          <DialogFooter>
            <Button type='button' variant='primary' onClick={onClose}>
              Anuluj
            </Button>
            <Button type='submit' disabled={addIncomeLoading}>
              {addIncomeLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {isEditMode ? 'Zapisz zmiany' : 'Utwórz'}
            </Button>
            {addIncomeError && <p className='text-base text-red-500'>{addIncomeError.message}</p>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddIncomeModal;
