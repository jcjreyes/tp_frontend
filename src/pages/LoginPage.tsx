import { loginRequest, profileRequest } from '../api/auth';
import { useAuthStore } from '../store/userStore';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { setToken, setAdmin, setProfile } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
      const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

      const restLogin = await loginRequest(username, password);
      setToken(restLogin.access);
      const profile = await profileRequest();

      console.log(profile);
      if (profile.is_staff) {
        setAdmin();
      }

      setProfile(profile);
      navigate('/profile');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <div className='login-container'>
        <span>Log in to TaePare</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor='user'>Username</label>
          <input type='username' placeholder='username' name='user' />
          <label htmlFor='pass'>Password</label>
          <input type='password' placeholder='*******' name='pass' />

          <button type='submit'>Log In</button>
          <Link to='/register'>Create Account</Link>
        </form>
        {/*<form onSubmit={handleLogout}>
          <button type='submit'>Logout</button>
        </form>*/}
      </div>
    </>
  );
}
