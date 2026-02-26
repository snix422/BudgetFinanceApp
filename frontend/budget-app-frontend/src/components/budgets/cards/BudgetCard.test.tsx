import { render, screen, userEvent } from '@/test-utils';
import { describe, expect, it, vi } from 'vitest';
import BudgetCard from './BudgetCard';
import type { Budget } from '@/schemas/budgetSchema';

const mockData: Budget = {
  id: 1,
  title: 'Domowy budżet',
  startDate: '2024-01-01',
  endDate: '2024-12-31',

  totalEarned: 50000,
  totalSpent: 30000,
  remainingAmount: 20000,
};

describe('BudgetCard', () => {
  it('powinien renderować podstawowe informacje i poprawny link dla użytkownika', () => {
    render(<BudgetCard data={mockData} isAdmin={false} />);

    expect(screen.getByText('Domowy budżet')).toBeInTheDocument();

    // Sprawdzamy czy link prowadzi do widoku aplikacji
    const link = screen.getByRole('link', { name: /zobacz szczegóły/i });
    expect(link).toHaveAttribute('href', `/app/budgets/${mockData.id}`);

    // Upewniamy się, że przyciski admina NIE są widoczne
    expect(screen.queryByText(/edytuj/i)).not.toBeInTheDocument();
  });

  it('powinien wyświetlać panel admina i poprawny link, gdy isAdmin jest true', () => {
    render(<BudgetCard data={mockData} isAdmin={true} userId='user-99' />);

    const link = screen.getByRole('link', { name: /zobacz szczegóły/i });
    expect(link).toHaveAttribute('href', `/admin/users/user-99/budgets/${mockData.id}`);

    expect(screen.getByText(/edytuj/i)).toBeInTheDocument();
    expect(screen.getByText(/usuń/i)).toBeInTheDocument();
  });

  it('powinien wywołać onDelete po kliknięciu przycisku usuwania', async () => {
    const user = userEvent.setup();
    const onDeleteMock = vi.fn();

    render(<BudgetCard data={mockData} isAdmin={true} onDelete={onDeleteMock} />);

    const deleteBtn = screen.getByRole('button', { name: /usuń/i });
    await user.click(deleteBtn);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
  it('powinien przekazać poprawne dane budżetu do funkcji onEdit po kliknięciu', async () => {
    const user = userEvent.setup();
    const onEditMock = vi.fn(); // Nasz szpieg

    render(<BudgetCard data={mockData} isAdmin={true} onEdit={onEditMock} />);

    const editBtn = screen.getByRole('button', { name: /edytuj/i });
    await user.click(editBtn);

    // 1. Sprawdzamy, czy w ogóle kliknięcie zadziałało
    expect(onEditMock).toHaveBeenCalledTimes(1);

    // 2. KLUCZOWY MOMENT: Sprawdzamy, CZY przekazał dokładnie nasze mockData
    expect(onEditMock).toHaveBeenCalledWith(mockData);
  });
});
