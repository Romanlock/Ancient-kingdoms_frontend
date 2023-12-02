import React from 'react';
import ReactDOM from 'react-dom/client';
import KingdomsFeed from './components/KingdomsFeed/KingdomsFeed';
import KingdomPage from './components/KingdomPage/KingdomPage';
import NavbarUser from './components/Navbar/NavbarUser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Breadcrumbs from './components/UI/Breadcrumbs/Breadcrumbs';
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
      <NavbarUser />
      <Breadcrumbs />
      <RouterProvider router={router} />
  </React.StrictMode>
);
