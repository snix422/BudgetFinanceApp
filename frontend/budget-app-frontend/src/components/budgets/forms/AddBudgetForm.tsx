import Button from '@/components/ui/Button';
import { DialogFooter } from '@/components/ui/dialog';
import Input from '@/components/ui/Input';
import useGetBudgets from '@/hooks/useGetBudgets';
import { CreateBudgetSchema, type CreateBudgetDto } from '@/schemas/budgetSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type AddBudgetFormProps = {
  onClose: () => void;
};

const AddBudgetForm: React.FC<AddBudgetFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBudgetDto>({
    resolver: zodResolver(CreateBudgetSchema),
    defaultValues: { title: '', startDate: '', endDate: '' },
  });
  console.log(errors);
  const { addBudget, addBudgetLoading, addBudgetError } = useGetBudgets();
  const onSubmit: SubmitHandler<CreateBudgetDto> = (data) => {
    console.log('test');
    addBudget(data);
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-4'>
      <div className='space-y-2'>
        <Input
          id='Title'
          label='Nazwa budżetu'
          error={errors.title?.message}
          placeholder='np. Jedzenie'
          {...register('title')}
        />
        <Input
          type='date'
          id='date'
          label='Data rozpoczęcia'
          error={errors.startDate?.message}
          placeholder='np.20.01.2026'
          {...register('startDate')}
        />
        <Input
          type='date'
          id='date'
          label='Data zakończenia'
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
          Utwórz
        </Button>
        {addBudgetError && <p className='text-base text-red-500'>{addBudgetError.message}</p>}
      </DialogFooter>
    </form>
  );
};

export default AddBudgetForm;
