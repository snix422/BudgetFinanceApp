import { api } from '../../lib/axiosClient';
import type { SignInFormValues } from '../../schemas/signInSchema';
import type { SignUpFormValues } from '../../schemas/signUpSchema';
import type { User } from '../../schemas/userSchema';
import type { ResponseLogin } from '../../types/auth';

export const getCurrentUser = async (): Promise<User> => {
  return await api.get('/auth/me');
};

export const getAllUsers = async (): Promise<void> => {
  return await api.get('/auth/users');
};

export const signIn = async (dto: SignInFormValues): Promise<ResponseLogin> => {
  return await api.post('auth/login', dto);
};

export const signUp = async (dto: SignUpFormValues): Promise<ResponseLogin> => {
  return await api.post('auth/register', dto);
};

export const logOut = async (): Promise<void> => {
  return await api.post('auth/logout');
};
