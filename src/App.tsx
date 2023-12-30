import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import KingdomsFeed from './pages/KingdomsFeed/KingdomsFeed';
import KingdomPage from './pages/KingdomPage/KingdomPage';
import NavbarUser from './components/Navbar/Navbar';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ApplicationFeed from './pages/ApplicationsFeed/ApplicationsFeed';
import ApplicationPage from './pages/ApplicationPage/ApplicationPage';


const App: React.FC = () => {
  const { checkLogin } = useAuth();

  useEffect(() => { 
    checkLogin();
  }, []);


  return(
    <BrowserRouter basename="/">
      <NavbarUser />
      <Routes>
        <Route path="/kingdom" element={<KingdomsFeed />} />
        <Route path="/kingdom/:id" element={<KingdomPage />} />              
        <Route path="/application" element={<ApplicationFeed />} />
        <Route path="/application/:id" element={<ApplicationPage />} />              
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
