import { render, screen } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import AddIncomeModal from './AddIncomeModal';

describe('AddIncomeModal', () => {
  it('should modal renders when isOpen is true', () => {
    render(<AddIncomeModal isOpenModal={true} onClose={() => {}} budgetId={1} />);
    expect(screen.getByText('Nowy wpływ')).toBeInTheDocument();
  });
  it('should not render modal when isOpen is false', () => {
    render(<AddIncomeModal isOpenModal={false} onClose={() => {}} budgetId={1} />);
    expect(screen.queryByText('Nowy wpływ')).not.toBeInTheDocument();
  });
});
