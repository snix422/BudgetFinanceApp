import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logOut, signIn, signUp } from '../api/auth/auth';
import type { SignInFormValues } from '../schemas/signInSchema';
import type { SignUpFormValues } from '../schemas/signUpSchema';
import { toast } from 'sonner';

const useAuth = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (dto: SignInFormValues) => signIn(dto),
    onSuccess(data, variables, onMutateResult, context) {
      toast.success('Zalogowano pomyślnie!');
      navigate('/');
    },
    onError(error, variables, onMutateResult, context) {
      toast.error(error.message || 'Błąd logowania');
      console.error('Nie udało się zalogować:', error);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (dto: SignUpFormValues) => signUp(dto),
    onSuccess(data, variables, onMutateResult, context) {
      toast.success('Konto utworzone! Zaloguj się');
      navigate('/login');
    },
    onError(error, variables, onMutateResult, context) {
      console.error('Nie udało się zarejestrować:', error);
    },
  });

  const logOutMutation = useMutation({
    mutationFn: logOut,
    onSuccess(data, variables, onMutateResult, context) {
      toast.success('Wylogowano!');
      navigate('/');
    },
    onError(error, variables, onMutateResult, context) {
      toast.error('Nie udało się wylogować');
      console.error('Nie udało się wylogować:', error);
    },
  });

  return {
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
