// src/components/admin/users/UserBudgetsSection.tsx

import BudgetCard from '@/components/budgets/cards/BudgetCard'; // Twoja ścieżka
import GenericList from '@/components/ui/GenericList';
import type { Budget } from '@/schemas/budgetSchema';

type Props = {
  budgets: Budget[] | undefined;
  userId: string | undefined;
  onEditClick: () => void; // Przekazujemy funkcję "co zrobić po kliknięciu"
  onDeleteClick: () => void;
};

export const UserBudgetsSection = ({ budgets, userId, onEditClick, onDeleteClick }: Props) => {
  return (
    <section>
      <h2 className='text-xl font-semibold mb-4 text-gray-700'>Przypisane budżety</h2>
      <GenericList
        data={budgets || []}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        emptyState={
          <div className='text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300'>
            <p className='text-gray-500'>Ten użytkownik nie posiada żadnych budżetów.</p>
          </div>
        }
        renderItem={(budget: Budget) => (
          <BudgetCard
            key={budget.id}
            data={budget}
            isAdmin={true}
            userId={userId} // Ważne dla routingu admina
            onEdit={() => onEditClick()}
            onDelete={() => onDeleteClick()}
          />
        )}
      />
    </section>
  );
};
