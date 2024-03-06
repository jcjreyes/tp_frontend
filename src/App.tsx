import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/userStore';
import LoginPage from './pages/LoginPage'; // Import the LoginPage component

function App() {
  const { isAuth } = useAuthStore((state) => state);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} /> {/* Route for Login Page */}
        {console.log(isAuth)}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
