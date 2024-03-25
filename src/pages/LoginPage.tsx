import { loginRequest, profileRequest } from '../api/auth';
import { useAuthStore } from '../store/userStore';
// import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { setToken, setAdmin, logout } = useAuthStore((state) => state);
  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

    const restLogin = await loginRequest(username, password);
    setToken(restLogin.access);
    const profile = await profileRequest();

    if (profile.is_staff) {
      setAdmin();
    }

    // const resProfile = await profileRequest();
    // setProfile(resProfile);
    //
    // navigate('/profile');
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='username' placeholder='username' />
        <input type='password' placeholder='*******' />

        <button type='submit'>Login</button>
      </form>
      <form onSubmit={handleLogout}>
        <button type='submit'>Logout</button>
      </form>
    </>
  );
}
