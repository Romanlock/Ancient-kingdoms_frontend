import React from 'react';
import ReactDOM from 'react-dom/client';
import KingdomsFeed from './components/KingdomsFeed/KingdomsFeed';
import KingdomPage from './components/KingdomPage/KingdomPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

ReactDOM.createRoot(document.getElementById('main')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
