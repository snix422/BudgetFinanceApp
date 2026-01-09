import useGetIncomes from '@/hooks/useGetIncomes';
import { UpdateIncomeSchema, type UpdateIncomeDto } from '@/schemas/incomeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Input from './ui/Input';
import { DialogFooter } from './ui/dialog';
import Button from './ui/Button';
import { Loader2 } from 'lucide-react';

type EditIncomeFormProps = {
  values: UpdateIncomeDto;
  id: number;
  onClose: () => void;
  budgetId: number;
};

export const EditIncomeForm: React.FC<EditIncomeFormProps> = ({
  values,
  id,
  onClose,
  budgetId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateIncomeDto>({
    resolver: zodResolver(UpdateIncomeSchema),
    defaultValues: {
      title: values.title,
      amount: values.amount,
      date: values.date,
    },
  });
  console.log(errors);

  const { updateIncome, updateIncomeLoading, updateIncomeError } = useGetIncomes(budgetId);
  console.log(id, 'id');
  const onSubmit: SubmitHandler<UpdateIncomeDto> = (data) => {
    console.log('test');
    console.log(data);
    updateIncome({ id, dto: data, budgetId: budgetId });
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
        <Button type='submit' disabled={updateIncomeLoading}>
          {updateIncomeLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {'Zapisz zmiany'}
        </Button>
        {updateIncomeError && <p className='text-base text-red-500'>{updateIncomeError.message}</p>}
      </DialogFooter>
    </form>
  );
};
