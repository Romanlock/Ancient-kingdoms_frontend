import React from 'react'
import ReactDOM from 'react-dom/client'
import KingdomsFeed from './components/KingdomsFeed/KingdomsFeed'
import KingdomPage from './components/KingdomPage/KingdomPage'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <KingdomsFeed />,
  },
  {
    path: '/kingdom',
    element: <KingdomPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
