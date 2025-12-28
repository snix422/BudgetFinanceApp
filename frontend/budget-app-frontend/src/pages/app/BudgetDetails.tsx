import { useParams } from 'react-router-dom';
import useGetBudgetById from '../../hooks/useGetBudgetById';

const BudgetDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBudgetById(Number(id));
  console.log(data);
  console.log(isLoading);
  console.log(error);
};

export default BudgetDetails;
