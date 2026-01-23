import { describe, expect, it, vi } from 'vitest';
import AddBudgetForm from './AddBudgetForm';
import { render, screen, userEvent } from '@/test-utils';

describe('AddBudgetForm', () => {
  it('should render form inputs and buttons', () => {
    render(<AddBudgetForm onClose={vi.fn()} />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Start date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Anuluj/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Utwórz/i })).toBeInTheDocument();
  });
  it('should call onClose when Anuluj button is clicked', async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();
    render(<AddBudgetForm onClose={onCloseMock} />);
    const cancelButton = screen.getByRole('button', { name: /Anuluj/i });
    await user.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  it('should display validation errors on submit with empty fields', async () => {
    const user = userEvent.setup();
    render(<AddBudgetForm onClose={vi.fn()} />);
    const submitButton = screen.getByRole('button', { name: /Utwórz/i });
    await user.click(submitButton);
    expect(await screen.findAllByText(/jest wymagany/i)).toHaveLength(1);
  });
  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    render(<AddBudgetForm onClose={vi.fn()} />);
    await user.type(screen.getByLabelText('Title'), 'Mój budżet');
    await user.type(screen.getByLabelText('Start date'), '2024-01-01');
    await user.type(screen.getByLabelText('End Date'), '2024-12-31');
    const submitButton = screen.getByRole('button', { name: /Utwórz/i });
    await user.click(submitButton);
    expect(screen.queryByText(/jest wymagany/i)).not.toBeInTheDocument();
  });
});
