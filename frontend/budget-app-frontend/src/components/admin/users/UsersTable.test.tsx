import { render, screen } from '../../../test-utils'; //
import UsersTable from './UsersTable';
import { describe, it, expect } from 'vitest';

describe('UsersTable', () => {
  it('renders user data correctly', () => {
    const mockUsers = [
      {
        id: '1dsf23',
        name: 'John Doe',
        email: 'john@example.com',
        roleName: 'Admin',
        createdAt: '2023-01-01',
      },
    ];
    render(<UsersTable users={mockUsers} />);
    expect(screen.getByText(mockUsers[0].id)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[0].roleName)).toBeInTheDocument();
  });
  it('displays empty state when no users are provided', () => {
    render(<UsersTable users={[]} />);
    expect(screen.getByText('Brak użytkowników do wyświetlenia.')).toBeInTheDocument();
  });
});
