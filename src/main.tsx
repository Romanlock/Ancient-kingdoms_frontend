import React from 'react';
import ReactDOM from 'react-dom/client';
import KingdomsFeed from './components/KingdomsFeed/KingdomsFeed';
import KingdomPage from './components/KingdomPage/KingdomPage';
import NavbarUser from './components/Navbar/NavbarUser';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <NavbarUser />
      <Routes>
        <Route path="/kingdom" element={<KingdomsFeed />} />
        <Route path="/kingdom/:id" element={<KingdomPage />} />              
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
 );
 