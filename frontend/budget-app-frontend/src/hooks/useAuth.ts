import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logOut, signIn, signUp } from '../api/auth/auth';
import type { SignInFormValues } from '../schemas/signInSchema';
import type { SignUpFormValues } from '../schemas/signUpSchema';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

type BackendError = {
  message: string;
};

type ResponseLogin = {
  message: string;
};

const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user, isLoading: userIsLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: Infinity,
  });

  const loginMutation = useMutation<ResponseLogin, AxiosError<BackendError>, SignInFormValues>({
    mutationFn: (dto: SignInFormValues) => signIn(dto),
    onSuccess: async (data) => {
      toast.success('Zalogowano pomyślnie!');
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      //const user = queryClient.getQueryData<any>(['user']);

      //const isAdmin = user?.roleName?.toUpperCase() === 'ADMIN';

      /*if (isAdmin) {
        navigate('/admin/dashboard'); // Lub /admin/dashboard
      } else {
        navigate('/app/dashboard');
      }*/
      navigate('/');
      console.log(data);
    },
    onError(error) {
      toast.error(error.response?.data.message || 'Błąd logowania');
      console.error('Nie udało się zalogować:', error);
    },
  });

  const registerMutation = useMutation<ResponseLogin, AxiosError<BackendError>, SignUpFormValues>({
    mutationFn: (dto: SignUpFormValues) => signUp(dto),
    onSuccess(data) {
      toast.success('Konto utworzone! Zaloguj się');
      console.log(data);
    },
    onError(error) {
      console.error('Nie udało się zarejestrować:', error);
      toast.error(error.response?.data.message);
    },
  });

  const logOutMutation = useMutation({
    mutationFn: logOut,
    onSuccess() {
      toast.success('Wylogowano!');
      queryClient.setQueryData(['user'], null);
      navigate('/');
    },
    onError(error) {
      toast.error('Nie udało się wylogować');
      console.error('Nie udało się wylogować:', error);
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    isAuthLoading: userIsLoading,

    login: loginMutation.mutate,
    loginIsLoading: loginMutation.isPending,
    loginError: loginMutation.error,

    registerUser: registerMutation.mutate,
    registerIsLoading: registerMutation.isPending,
    registerError: registerMutation.error,

    logOut: logOutMutation.mutate,
    logOutIsLoading: logOutMutation.isPending,
  };
};

export default useAuth;
