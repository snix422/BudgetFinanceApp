import { screen, render } from '@/test-utils';
import DeleteModal from './DeleteModal';
import { describe, expect, it, vi } from 'vitest';

describe('DeleteModal', () => {
  it('should modal render when isOpenModal is true', () => {
    render(<DeleteModal isOpenModal={true} onClose={vi.fn()} type='income' id={1} />);
    expect(screen.getByText('Usuń')).toBeInTheDocument();
  });
  it('should not render modal when isOpenModal is false', () => {
    render(<DeleteModal isOpenModal={false} onClose={vi.fn()} type='income' id={1} />);
    expect(screen.queryByText('Usuń')).not.toBeInTheDocument();
  });
  it('should undisplay modal when onClose is called', () => {
    const onCloseMock = vi.fn();
    render(<DeleteModal isOpenModal={true} onClose={onCloseMock} type='income' id={1} />);
    const cancelButton = screen.getByText('Anuluj');
    cancelButton.click();
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
