import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/userStore';
import '../styles/NavBar.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ isAuth, isAdmin }) {
  const { logout } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
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
          <Link to='/aboutus'>About Us</Link>
          {isAuth ? (
            <Link to='/profile'>Profile</Link>
          ) : (
            <Link to='/login'>Login</Link>
          )}
          <Link to='/buildings/map'>Map</Link>
          {isAdmin && <Link to='/buildings/list'>List</Link>}
          {isAuth && (
            <form onSubmit={handleLogout}>
              <button type='submit'>Logout</button>
            </form>
          )}
        </div>
      </nav>
    </>
  );
}
