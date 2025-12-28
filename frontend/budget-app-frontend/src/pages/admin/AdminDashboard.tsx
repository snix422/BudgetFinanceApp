import useGetBudgets from '../../hooks/useGetBudgets';
import BudgetsSkeleton from '../../components/BudgetsSkeleton';
import ErrorState from '../../components/ErrorState';
import GenericList from '../../components/GenericList';

const AdminDashboard = () => {
  const { budgets, isLoading, error } = useGetBudgets();
  if (isLoading) return <BudgetsSkeleton lines={6} height={300} />;
  if (error) return <ErrorState message={error.message} />;
  return (
    <main>
      <GenericList
        data={budgets}
        renderItem={(item, index) => <div key={index}>{item.title}</div>}
      />
    </main>
  );
};

export default AdminDashboard;
