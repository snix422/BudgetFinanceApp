import { describe, expect, it, vi } from 'vitest';
import { render, screen, userEvent } from '@/test-utils';
import { EditBudgetForm } from './EditBudgetForm';

describe('EditBudgetForm', () => {
  it('should render form inputs and buttons', () => {
    render(
      <EditBudgetForm
        id={1}
        onClose={vi.fn()}
        values={{ title: 'Test', startDate: '2025-01-01', endDate: '2025-01-31' }}
      />,
    );
    expect(screen.getByLabelText('Nazwa budżetu')).toBeInTheDocument();
    expect(screen.getByLabelText('Data rozpoczęcia')).toBeInTheDocument();
    expect(screen.getByLabelText('Data zakończenia')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Anuluj/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Zapisz zmiany/i })).toBeInTheDocument();
  });
  it('should call onClose when Anuluj button is clicked', async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();
    render(
      <EditBudgetForm
        id={1}
        onClose={onCloseMock}
        values={{ title: 'Test', startDate: '2025-01-01', endDate: '2025-01-31' }}
      />,
    );
    await user.click(screen.getByRole('button', { name: /Anuluj/i }));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  it('should display validation errors on submit with empty fields', async () => {
    const user = userEvent.setup();
    render(
      <EditBudgetForm
        id={1}
        onClose={vi.fn()}
        values={{ title: '', startDate: '', endDate: '' }}
      />,
    );
    await user.click(screen.getByRole('button', { name: /Zapisz zmiany/i }));
    expect(await screen.findAllByText(/jest wymagany/i)).toHaveLength(1);
  });
  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    render(
      <EditBudgetForm
        id={1}
        onClose={vi.fn()}
        values={{ title: 'Test', startDate: '2025-01-01', endDate: '2025-01-31' }}
      />,
    );
    await user.clear(screen.getByLabelText('Nazwa budżetu'));
    await user.type(screen.getByLabelText('Nazwa budżetu'), 'Zaktualizowany budżet');
    await user.clear(screen.getByLabelText('Data rozpoczęcia'));
    await user.type(screen.getByLabelText('Data rozpoczęcia'), '2025-02-01');
    await user.clear(screen.getByLabelText('Data zakończenia'));
    await user.type(screen.getByLabelText('Data zakończenia'), '2025-02-28');
    await user.click(screen.getByRole('button', { name: /Zapisz zmiany/i }));
    expect(screen.queryByText(/jest wymagany/i)).not.toBeInTheDocument();
  });
  it('should form with edit data', async () => {
    render(
      <EditBudgetForm
        id={1}
        onClose={vi.fn()}
        values={{ title: 'Test', startDate: '2025-01-01', endDate: '2025-01-31' }}
      />,
    );
    expect(screen.getByLabelText('Nazwa budżetu')).toHaveValue('Test');
    expect(screen.getByLabelText('Data rozpoczęcia')).toHaveValue('2025-01-01');
    expect(screen.getByLabelText('Data zakończenia')).toHaveValue('2025-01-31');
  });
});
