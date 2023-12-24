import React from 'react';
import ReactDOM from 'react-dom/client';
import KingdomsFeed from './pages/KingdomsFeed/KingdomsFeed';
import KingdomPage from './pages/KingdomPage/KingdomPage';
import NavbarUser from './components/Navbar/NavbarUser';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import store from './stores/store';
import { Provider } from "react-redux";
 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <NavbarUser />
        <Routes>
          <Route path="/kingdom" element={<KingdomsFeed />} />
          <Route path="/kingdom/:id" element={<KingdomPage />} />              
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
 );
 