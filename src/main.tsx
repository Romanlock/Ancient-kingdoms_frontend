import React from 'react';
import ReactDOM from 'react-dom/client';
import KingdomsFeed from './components/KingdomsFeed/KingdomsFeed';
import KingdomPage from './components/KingdomPage/KingdomPage';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/SidebarUser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/authorizationContext';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/kingdom',
    element: <KingdomsFeed />,
  },
  {
    path: '/kingdom/:id',
    element: <KingdomPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Header />
      <Sidebar />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
