import { authApi } from './axios';

const loginRequest = async (username: string, password: string) => {
  try {
    const { data } = await authApi.post('/auth/login/', { username, password });
    return data;
  } catch (e) {
    console.log(e);
    return { error: true, msg: e };
  }
};

const registerRequest = async (username: string, password: string) => {
  try {
    const { data } = await authApi.post('/user/register/', {
      username,
      password,
    });
    return data;
  } catch (e) {
    console.log(e);
    return { error: true, msg: e };
  }
};

const profileRequest = async () => {
  const { data } = await authApi.get('/user/profile');
  return data;
};

export { loginRequest, registerRequest, profileRequest };
