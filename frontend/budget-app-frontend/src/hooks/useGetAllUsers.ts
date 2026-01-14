import { getAllUsers } from '@/api/auth/auth';
import { useQuery } from '@tanstack/react-query';

const useGetAllUsers = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users-query-key'],
    queryFn: getAllUsers,
  });

  return {
    users,
    isLoading,
    error,
  };
};

export default useGetAllUsers;
