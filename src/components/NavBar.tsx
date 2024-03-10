import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/userStore';

export default function NavBar({ isAuth }) {
  const { logout } = useAuthStore((state) => state);
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <div className='nav wrapper'>
        <div className='nav nav-logo'>
          <Link to='/'>Logo</Link>
        </div>
        <div className='nav nav-links'>
          {isAuth ? (
            <form onSubmit={handleLogout}>
              <button type='submit'>Logout</button>
            </form>
          ) : (
            <Link to='/login'>Login</Link>
          )}
          <Link to='/buildings/map'>Map</Link>
          <Link to='/buildings/list'>List</Link>
        </div>
      </div>
    </>
  );
}
