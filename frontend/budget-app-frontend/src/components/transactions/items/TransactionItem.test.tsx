import { describe, expect, it, vitest } from 'vitest';
import TransactionItem from './TransactionItem';
import { render, screen, userEvent } from '@/test-utils'; // Dodaj userEvent tutaj!
import { vi } from 'vitest';

describe('TransactionItem', () => {
  it('should render correctly', () => {
    const mockData = {
      id: 1,
      title: 'Test Transaction',
      amount: 100,
      date: '2024-06-15',
      type: 'income' as const,
      categoryName: 'Salary',
    };
    render(
      <TransactionItem
        data={mockData}
        onOpenDeleteModal={vitest.fn()}
        onOpenEditModal={vitest.fn()}
        selectItem={vitest.fn()}
      />,
    );
    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockData.amount.toString(), 'i'))).toBeInTheDocument();
  });
  it('should render income item', () => {
    const mockData = {
      id: 1,
      title: 'Test Transaction',
      amount: 100,
      date: '2024-06-15',
      type: 'income' as const,
      categoryName: 'Salary',
    };
    render(
      <TransactionItem
        data={mockData}
        onOpenDeleteModal={vi.fn()}
        onOpenEditModal={vi.fn()}
        selectItem={vi.fn()}
      />,
    );
    expect(screen.getByTestId('arrow-up')).toBeInTheDocument();
    expect(screen.getByText('Wpływ')).toBeInTheDocument();
    expect(screen.getByText(/\+/i)).toBeInTheDocument();
  });
  it('should render expense item', () => {
    const mockData = {
      id: 2,
      title: 'Test Expense',
      amount: 50,
      date: '2024-06-15',
      type: 'expense' as const,
      categoryName: 'Food',
    };
    render(
      <TransactionItem
        data={mockData}
        onOpenDeleteModal={vi.fn()}
        onOpenEditModal={vi.fn()}
        selectItem={vi.fn()}
      />,
    );
    expect(screen.getByTestId('arrow-down')).toBeInTheDocument();
    expect(screen.getByText('Wydatek')).toBeInTheDocument();
    expect(screen.getByText(/\-/i)).toBeInTheDocument();
  });
  it('should buttons clicked', async () => {
    const mockData = {
      id: 3,
      title: 'Test Delete',
      amount: 75,
      date: '2024-06-15',
      type: 'expense' as const,
      categoryName: 'Transport',
    };
    const onOpenEditModalMock = vitest.fn();
    const onOpenDeleteModalMock = vitest.fn();

    render(
      <TransactionItem
        data={mockData}
        onOpenDeleteModal={onOpenDeleteModalMock}
        onOpenEditModal={onOpenEditModalMock}
        selectItem={vitest.fn()}
      />,
    );
    const editButton = screen.getByRole('button', { name: /edit/i });
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    await userEvent.click(editButton); // Dodaj import
    await userEvent.click(deleteButton); // Dodaj import

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(onOpenEditModalMock).toHaveBeenCalledTimes(1);
    expect(onOpenDeleteModalMock).toHaveBeenCalledTimes(1);
  });
});
