import { UpdateIncomeSchema, type UpdateIncomeDto } from '@/schemas/incomeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Input from './ui/Input';
import { DialogFooter } from './ui/dialog';
import Button from './ui/Button';
import { Loader2 } from 'lucide-react';
import useGetExpenses from '@/hooks/useGetExpenses';
import type { UpdateExpenseDto } from '@/schemas/expenseSchema';
import { Select } from './ui/Select';
import { CategoryRule, CategoryRuleLabels } from '@/types/enums';
import useGetCategories from '@/hooks/useGetCategories';
import type { Category } from '@/schemas/categorySchema';

type EditExpenseFormProps = {
  values: UpdateIncomeDto;
  id: number;
  onClose: () => void;
  budgetId: number;
};

const EditExpenseForm: React.FC<EditExpenseFormProps> = ({ values, id, onClose, budgetId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateExpenseDto>({
    resolver: zodResolver(UpdateIncomeSchema),
    defaultValues: {
      title: values.title,
      amount: values.amount,
      date: values.date,
    },
  });
  console.log(errors);

  const { updateExpense, updateExpenseLoading, updateExpenseError } = useGetExpenses(budgetId);
  const { categories } = useGetCategories();
  const groupedCategories = {
    needs: categories && categories.filter((c: Category) => c.rule === CategoryRule.Needs), // 1 to Needs
    wants: categories && categories.filter((c: Category) => c.rule === CategoryRule.Wants), // 2 to Wants
    savings: categories && categories.filter((c: Category) => c.rule === CategoryRule.Savings), // 3 to Savings
  };
  const onSubmit: SubmitHandler<UpdateExpenseDto> = (data) => {
    console.log('test');
    console.log(data);

    updateExpense({ id, dto: data, budgetId });
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
        <Select
          id='categoryId'
          label='Kategoria'
          error={errors.categoryId?.message}
          {...register('categoryId', { valueAsNumber: true })}
          defaultValue={0}
        >
          <option value='' disabled>
            -- Wybierz kategorię --
          </option>
          <optgroup label={CategoryRuleLabels[CategoryRule.Needs]}>
            {groupedCategories.needs &&
              groupedCategories.needs.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </optgroup>
          <optgroup label={CategoryRuleLabels[CategoryRule.Wants]}>
            {groupedCategories.wants &&
              groupedCategories.wants.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </optgroup>
          <optgroup label={CategoryRuleLabels[CategoryRule.Wants]}>
            {groupedCategories.savings &&
              groupedCategories.savings.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </optgroup>
        </Select>
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
        <Button type='submit' disabled={updateExpenseLoading}>
          {updateExpenseLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {'Zapisz zmiany'}
        </Button>
        {updateExpenseError && (
          <p className='text-base text-red-500'>{updateExpenseError.message}</p>
        )}
      </DialogFooter>
    </form>
  );
};

export default EditExpenseForm;
