import useGetBudgets from '../../hooks/useGetBudgets';
import BudgetsSkeleton from '../../components/BudgetsSkeleton';
import ErrorState from '../../components/ErrorState';
import GenericList from '../../components/GenericList';
import useGetAllUsers from '@/hooks/useGetAllUsers';
import UsersTable from '@/components/UsersTable';

const AdminDashboard = () => {
  const { users, isLoading, error } = useGetAllUsers();
  if (!users) return <div></div>;
  console.log('admin dashboard');
  console.log(users);
  return (
    <main className='w-full flex flex-col items-center p-10 gap-6'>
      <h1>Panel Admina</h1>
      <UsersTable users={users} />
    </main>
  );
};

export default AdminDashboard;
