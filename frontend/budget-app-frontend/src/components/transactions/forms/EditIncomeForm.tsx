import useGetIncomes from '@/hooks/useGetIncomes';
import { UpdateIncomeSchema, type UpdateIncomeDto } from '@/schemas/incomeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { useAdminTransactionMutations } from '@/hooks/useAdminTransactionMutations';
import Input from '@/components/ui/Input';
import { DialogFooter } from '@/components/ui/dialog';
import Button from '@/components/ui/Button';

type EditIncomeFormProps = {
  values: UpdateIncomeDto;
  id: number;
  onClose: () => void;
  budgetId: number;
  isAdmin?: boolean;
};

export const EditIncomeForm: React.FC<EditIncomeFormProps> = ({
  values,
  id,
  onClose,
  budgetId,
  isAdmin = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateIncomeDto>({
    resolver: zodResolver(UpdateIncomeSchema),
    defaultValues: {
      title: values.title,
      amount: values.amount,
      date: values.date,
    },
  });

  const { updateIncome, updateIncomeLoading, updateIncomeError } = useGetIncomes(budgetId);
  const { updateIncome: updateIncomeAdmin, updateIncomeLoading: updateIncomeAdminLoading } = isAdmin
    ? useAdminTransactionMutations(budgetId)
    : { updateIncome: null, updateIncomeLoading: false };

  const onSubmit: SubmitHandler<UpdateIncomeDto> = (data) => {
    if (isAdmin && updateIncomeAdmin) {
      console.log('admin update');
      updateIncomeAdmin({ id, data, budgetId });
    } else {
      console.log('normal update');
      updateIncome({ id, dto: data, budgetId });
    }
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
        <Button type='submit' disabled={isAdmin ? updateIncomeAdminLoading : updateIncomeLoading}>
          {(isAdmin ? updateIncomeAdminLoading : updateIncomeLoading) && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          )}
          {'Zapisz zmiany'}
        </Button>
        {updateIncomeError && <p className='text-base text-red-500'>{updateIncomeError.message}</p>}
      </DialogFooter>
    </form>
  );
};
