import React, { startTransition } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './App'
import './index.css'

// Create a router with all available future flags to fix the warning
// Using the startTransition function from React
const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
  },
});

// Use startTransition to wrap the RouterProvider
const root = ReactDOM.createRoot(document.getElementById('root')!);
startTransition(() => {
  root.render(
    <React.StrictMode>
      <RouterProvider future={{ v7_startTransition: true }} router={router} />
    </React.StrictMode>
  );
});
