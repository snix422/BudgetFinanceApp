import Button from '@/components/ui/Button';
import { DialogFooter } from '@/components/ui/dialog';
import Input from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import useGetCategories from '@/hooks/useGetCategories';
import useGetExpenses from '@/hooks/useGetExpenses';
import { CreateExpenseSchema, type CreateExpenseDto } from '@/schemas/expenseSchema';
import { CategoryRule, CategoryRuleLabels } from '@/types/enums';
import { groupCategoriesByRule } from '@/utils/budgetCalculations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type AddExpenseFormProps = {
  budgetId: number;
  onClose: () => void;
};

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ budgetId, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateExpenseDto>({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: { title: '', amount: 0, date: '', categoryId: 0 },
  });

  const { addExpense, addExpenseLoading, addExpenseError } = useGetExpenses(budgetId);
  const { categories } = useGetCategories();
  const groupedCategories = groupCategoriesByRule(categories);

  const onSubmit: SubmitHandler<CreateExpenseDto> = (dto) => {
    addExpense({ dto, budgetId });
    onClose();
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
        <Select
          id='Kategoria'
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
        <Button type='submit' disabled={addExpenseLoading}>
          {addExpenseLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Dodaj wydatek
        </Button>
        {addExpenseError && <p className='text-base text-red-500'>{addExpenseError.message}</p>}
      </DialogFooter>
    </form>
  );
};

export default AddExpenseForm;
