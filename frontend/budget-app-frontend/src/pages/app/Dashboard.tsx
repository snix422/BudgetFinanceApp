import useGetBudgets from '../../hooks/useGetBudgets';
import GenericList from '../../components/GenericList';
import BudgetsSkeleton from '../../components/BudgetsSkeleton';
import ErrorState from '../../components/ErrorState';

export const Dashboard = () => {
  const { budgets, isLoading, error } = useGetBudgets();

  if (isLoading) return <BudgetsSkeleton lines={6} height={300} />;
  if (error) return <ErrorState message={error.message} />;
  return (
    <main>
      <GenericList data={budgets} renderItem={(item, index) => <div key={index}>{item}</div>} />
    </main>
  );
};

export default Dashboard;
