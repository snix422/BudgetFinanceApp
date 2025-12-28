import { useForm, type SubmitHandler } from 'react-hook-form';
import { signUpSchema, type SignUpFormValues } from '../schemas/signUpSchema';
import useAuth from '../hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';

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
      <input {...register('email')} type='text' placeholder='E-mail' />
      <input {...register('password')} type='text' placeholder='Password' />
      <input {...register('confirmPassword')} type='text' placeholder='Confirm Password' />
      <input {...register('name')} type='text' placeholder='Name' />
      <input {...register('phone')} type='text' placeholder='Phone' />
      <button type='submit'>{registerIsLoading ? 'Rejestracja...' : 'Zarejestruj się'}</button>
      {errors.email && <span>{errors.email.message}</span>}
      {errors.password && <span>{errors.password.message}</span>}
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      {errors.name && <span>{errors.name.message}</span>}
      {errors.phone && <span>{errors.phone.message}</span>}
      {registerError && <span>{registerError.message}</span>}
    </form>
  );
};

export default SignUpForm;
