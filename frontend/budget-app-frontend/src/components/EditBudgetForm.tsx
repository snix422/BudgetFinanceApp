import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from './ui/Button';
import { DialogFooter } from './ui/dialog';
import type { CreateBudgetDto, UpdateBudgetDto } from '@/schemas/budgetSchema';
import { UpdateBudgetSchema } from '@/schemas/budgetSchema';
import Input from './ui/Input';
// import { useBudgetMutations } from '@/hooks/useBudgetMutations';

type EditBudgetFormProps = {
  values: UpdateBudgetDto;
  id: number;
  onClose: () => void;
};

export const EditBudgetForm: React.FC<EditBudgetFormProps> = ({ values, id, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBudgetDto>({
    resolver: zodResolver(UpdateBudgetSchema),
    defaultValues: {
      title: values.title,
      startDate: values.startDate,
      endDate: values.endDate,
    },
  });

  // const { updateBudget, updateBudgetLoading, updateBudgetError } = useBudgetMutations();

  const onSubmit: SubmitHandler<UpdateBudgetDto> = (data) => {
    console.log(data);
    // updateBudget({ id, dto: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-4'>
      <div className='space-y-2'>
        <Input
          id='title'
          label='Nazwa budżetu'
          error={errors.title?.message}
          placeholder='np. Miesięczny budżet'
          {...register('title')}
        />
        <Input
          id='startDate'
          label='Data rozpoczęcia'
          error={errors.startDate?.message}
          placeholder='np. Data rozpoczęcia'
          {...register('startDate')}
          type='date'
        />
        <Input
          type='date'
          id='endDate'
          label='Data zakończenia'
          error={errors.endDate?.message}
          placeholder='np. Data zakończenia'
          {...register('endDate')}
        />
      </div>
      <DialogFooter>
        <Button type='button' variant='primary' onClick={onClose}>
          Anuluj
        </Button>
        <Button type='submit'>
          {/* {updateBudgetLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} */}
          Zapisz zmiany
        </Button>
        {/* {updateBudgetError && <p className='text-base text-red-500'>{updateBudgetError.message}</p>} */}
      </DialogFooter>
    </form>
  );
};
