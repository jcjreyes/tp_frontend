import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/userStore';
import '../styles/NavBar.css';

export default function NavBar({ isAuth }) {
  const { logout } = useAuthStore((state) => state);
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  };
  {
    /*<form onSubmit={handleLogout}>
              <button type='submit'>Logout</button>
            </form>*/
  }

  return (
    <>
      <nav className='navbar'>
        <div className='nav-logo'>
          <Link to='/'>
            <img className='logo-hero' src="./src/assets/logo.png" />
          </Link>
        </div>
        <div className='nav-links'>
          {isAuth ? (
            <Link to='/profile'>Profile</Link>
          ) : (
            <Link to='/login'>Login</Link>
          )}
          <Link to='/buildings/map'>Map</Link>
          <Link to='/buildings/list'>List</Link>
        </div>
      </nav>
    </>
  );
}
