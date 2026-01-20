import Button from '@/components/ui/Button';
import { DialogFooter } from '@/components/ui/dialog';
import Input from '@/components/ui/Input';
import useGetIncomes from '@/hooks/useGetIncomes';
import { CreateIncomeSchema, type CreateIncomeDto } from '@/schemas/incomeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type AddIncomeFormProps = {
  budgetId: number;
  onClose: () => void;
};

const AddIncomeForm: React.FC<AddIncomeFormProps> = ({ budgetId, onClose }) => {
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
    addIncome({ dto, budgetId });
    onClose();
    reset();
  };
  return (
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
          Dodaj wpływ
        </Button>
        {addIncomeError && <p className='text-base text-red-500'>{addIncomeError.message}</p>}
      </DialogFooter>
    </form>
  );
};

export default AddIncomeForm;
