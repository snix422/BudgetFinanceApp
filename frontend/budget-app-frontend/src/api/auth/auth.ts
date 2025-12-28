import { api } from '../../lib/axiosClient';
import type { SignInFormValues } from '../../schemas/signInSchema';
import type { SignUpFormValues } from '../../schemas/signUpSchema';

export const signIn = async (dto: SignInFormValues): Promise<void> => {
  return await api.post('login', dto);
};

export const signUp = async (dto: SignUpFormValues): Promise<void> => {
  return await api.post('register', dto);
};

export const logOut = async (): Promise<void> => {
  return await api.post('logout');
};
