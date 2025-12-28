import { useForm, type SubmitHandler } from 'react-hook-form';
import { signInSchema, type SignInFormValues } from '../schemas/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from '../hooks/useAuth';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({ resolver: zodResolver(signInSchema) });

  const { login, loginIsLoading, loginError } = useAuth();

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    console.log(data);
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type='text' placeholder='E-mail' />
      <input {...register('password')} type='text' placeholder='Password' />
      <button type='submit'>{loginIsLoading ? 'Logowanie...' : 'Zaloguj się'}</button>
      {errors.email && <span>{errors.email.message}</span>}
      {errors.password && <span>{errors.password.message}</span>}
      {loginError && <span>{loginError.message}</span>}
    </form>
  );
};

export default SignInForm;
