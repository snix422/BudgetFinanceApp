import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpFormValues } from '@/schemas/signUpSchema';
import useAuth from '@/hooks/useAuth';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });
  const { registerUser, registerIsLoading, registerError } = useAuth();

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    console.log(data);
    registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label='E-mail' type='email' error={errors.email?.message} {...register('email')} />
      <Input
        label='Password'
        type='password'
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        label='Confirm Password'
        type='password'
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Input
        label='Name'
        type='text'
        error={errors.firstName?.message}
        {...register('firstName')}
      />
      <Input
        label='LastName'
        type='text'
        error={errors.lastName?.message}
        {...register('lastName')}
      />
      <Input label='Phone' type='text' error={errors.phone?.message} {...register('phone')} />
      <Button type='submit' className='w-full mt-2' isLoading={registerIsLoading}>
        {registerIsLoading ? 'Rejestracja...' : 'Zaloguj się'}
      </Button>
      {registerError?.response?.data.message && (
        <p className='text-red-500'>{registerError.response.data.message}</p>
      )}
    </form>
  );
};

export default SignUpForm;
