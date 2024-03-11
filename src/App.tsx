import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/userStore';
import LoginPage from './pages/LoginPage'; // Import the LoginPage component
import Home from './pages/Home';
import './App.css'
import BuildingsList from './pages/BuildingsList';
import { QueryClient, QueryClientProvider } from 'react-query';
import NavBar from './components/NavBar';
import Buildings from './pages/Buildings';

function App() {
  const { isAuth } = useAuthStore((state) => state);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavBar isAuth={isAuth} />
        <Routes>
          {/* Route for Login Page */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} /> {console.log(isAuth)}
          <Route path='/buildings/list' element={<BuildingsList />} />
          <Route path='/buildings/map' element={<Buildings />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
