import { authApi } from './axios';

const loginRequest = async (username: string, password: string) => {
  try {
    const { data } = await authApi.post('/auth/login/', { username, password });
    return data;
  } catch (e) {
    console.log(e);
  }
};

const profileRequest = async () => {
  const { data } = await authApi.get('/auth/profile');
  return data;
};

export { loginRequest, profileRequest };
