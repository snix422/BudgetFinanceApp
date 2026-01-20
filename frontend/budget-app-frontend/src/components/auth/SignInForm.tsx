import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, type SignInFormValues } from '@/schemas/signInSchema';
import useAuth from '@/hooks/useAuth';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({ resolver: zodResolver(signInSchema) });

  const { login, loginIsLoading, loginError } = useAuth();
  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    console.log(data);
    login(data);
  };

  console.log(loginError);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <Input
        label='Adres e-mail'
        type='email'
        placeholder='jan@kowalski.pl'
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label='Hasło'
        type='password'
        placeholder='Write password...'
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type='submit' className='w-full mt-2' isLoading={loginIsLoading}>
        {loginIsLoading ? 'Logowanie...' : 'Zaloguj się'}
      </Button>
      {loginError?.response?.data.message && (
        <p className='text-red-500'>{loginError.response.data.message}</p>
      )}
    </form>
  );
};

export default SignInForm;
