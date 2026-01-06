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
import { Loader2 } from 'lucide-react';
import useGetExpenses from '@/hooks/useGetExpenses';
import type { CreateIncomeDto } from '@/schemas/incomeSchema';
import { CreateExpenseSchema, type CreateExpenseDto } from '@/schemas/expenseSchema';
import useGetCategories from '@/hooks/useGetCategories';
import { Select } from './ui/Select';
import type { Category } from '@/schemas/categorySchema';
import { CategoryRule, CategoryRuleLabels } from '@/types/enums';

type BudgetModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
  isEditMode: boolean;
  budgetId: number;
};

const AddExpenseModal: React.FC<BudgetModalProps> = ({
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
  } = useForm<CreateExpenseDto>({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: { title: '', amount: 0, date: '', categoryId: 0 },
  });
  console.log(errors);

  const { addExpense, addExpenseLoading, addExpenseError } = useGetExpenses(budgetId);
  const { categories } = useGetCategories();
  console.log(categories);

  const groupedCategories = {
    needs: categories && categories.filter((c: Category) => c.rule === CategoryRule.Needs), // 1 to Needs
    wants: categories && categories.filter((c: Category) => c.rule === CategoryRule.Wants), // 2 to Wants
    savings: categories && categories.filter((c: Category) => c.rule === CategoryRule.Savings), // 3 to Savings
  };

  const onSubmit: SubmitHandler<CreateExpenseDto> = (dto) => {
    console.log('test');
    console.log(dto);
    addExpense({ dto, budgetId });
    onClose;
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-black'>Nowy wydatek</DialogTitle>
          <DialogDescription className='text-black'>
            Wypełnij dane, aby dodać nowy wydatek
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
              id='date'
              label='Amount'
              error={errors.amount?.message}
              placeholder='np.20.01.2026'
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
              {isEditMode ? 'Zapisz zmiany' : 'Utwórz'}
            </Button>
            {addExpenseError && <p className='text-base text-red-500'>{addExpenseError.message}</p>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
