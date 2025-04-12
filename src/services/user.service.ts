import api from '@/lib/api';
import { IUser } from '@/types/user';

export const loginUser = async (data: { email?: string; username?: string; password: string }) => {
  const res = await api.post('/users/login', data);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get('/users/me');
  return res.data;
};

export const registerUser = async (data: Omit<IUser, 'id'>) => {
  const res = await api.post('/users/register', data);
  return res.data;
};
export const updateUser = async (data: Partial<IUser>) => {
  const res = await api.put('/users/update', data);
  return res.data;
};
