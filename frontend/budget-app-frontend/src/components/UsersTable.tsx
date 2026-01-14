import { Link } from 'react-router-dom';

type User = {
  id: string;
  email: string;
  roleName: string; // lub 'role'
  createdAt?: string; // Opcjonalnie: data rejestracji
};

type UsersTableProps = {
  users: User[];
};

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  if (!users || users.length === 0) {
    return <div className='p-4 text-center text-gray-500'>Brak użytkowników do wyświetlenia.</div>;
  }

  return (
    <div className='w-4/5 relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200'>
      <table className='w-full text-sm text-left text-gray-500'>
        {/* NAGŁÓWEK TABELI */}
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 border-b'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              ID
            </th>
            <th scope='col' className='px-6 py-3'>
              Email
            </th>
            <th scope='col' className='px-6 py-3'>
              Rola
            </th>
            <th scope='col' className='px-6 py-3 text-right'>
              Akcje
            </th>
          </tr>
        </thead>

        {/* CIAŁO TABELI */}
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className='bg-white border-b hover:bg-gray-50 transition-colors'>
              {/* ID */}
              <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{user.id}</td>

              {/* Email */}
              <td className='px-6 py-4'>{user.email}</td>

              {/* Rola (z kolorowym badge'em) */}
              <td className='px-6 py-4'>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.roleName.toUpperCase() === 'ADMIN'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {user.roleName}
                </span>
              </td>

              {/* Przycisk Akcji */}
              <td className='px-6 py-4 text-right'>
                <Link
                  to={`/admin/users/${user.id}`} // <-- To przeniesie do szczegółów
                  className='font-medium text-blue-600 hover:underline'
                >
                  Podgląd budżetów
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
