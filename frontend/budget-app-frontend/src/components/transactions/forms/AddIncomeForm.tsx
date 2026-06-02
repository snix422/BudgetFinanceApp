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
    addIncome(
      { dto, budgetId },
      {
        // To jest LOKALNY onSuccess. Wykona się zaraz po tym globalnym z Twojego hooka,
        // ale TYLKO wtedy, gdy żądanie zakończy się sukcesem.
        onSuccess: () => {
          reset();
          onClose();
        },

        // Lokalnego onError tutaj w ogóle nie piszemy!
        // Twój globalny hook rzuci toast z błędem i cofnie cache,
        // a dzięki brakowi lokalnego onSuccess - modal bezpiecznie zostanie na ekranie.
      },
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-4'>
      <div className='space-y-2'>
        <Input
          id='Tytuł'
          label='Tytuł'
          error={errors.title?.message}
          placeholder='np. Jedzenie'
          {...register('title')}
        />
        <Input
          type='number'
          id='Kwota'
          label='Kwota'
          error={errors.amount?.message}
          placeholder='np.20.01.2026'
          {...register('amount')}
        />
        <Input
          type='date'
          id='Data'
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
