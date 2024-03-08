import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/userStore';
import LoginPage from './pages/LoginPage'; // Import the LoginPage component
import Home from './pages/Home';
import BuildingsList from './pages/BuildingsList';

function App() {
  const { isAuth } = useAuthStore((state) => state);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route for Login Page */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} /> {console.log(isAuth)}
        <Route path='/buildings/list' element={<BuildingsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
