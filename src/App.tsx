import { RouteObject } from 'react-router-dom'

// Import pages
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Unauthorized from './pages/Unauthorized'
import ProtectedRoute from './components/ProtectedRoute'
import AppProvider from './components/AppProvider'

// Export routes for use with createBrowserRouter
export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AppProvider>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </AppProvider>
    )
  },
  {
    path: "/about",
    element: (
      <AppProvider>
        <About />
      </AppProvider>
    )
  },
  {
    path: "/login",
    element: (
      <AppProvider>
        <Login />
      </AppProvider>
    )
  },
  {
    path: "/register",
    element: (
      <AppProvider>
        <Register />
      </AppProvider>
    )
  },
  {
    path: "/dashboard",
    element: (
      <AppProvider>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProvider>
    )
  },
  {
    path: "/admin",
    element: (
      <AppProvider>
        <ProtectedRoute requiredRoles={['admin']}>
          <Dashboard />
        </ProtectedRoute>
      </AppProvider>
    )
  },
  {
    path: "/editor",
    element: (
      <AppProvider>
        <ProtectedRoute requiredRoles={['admin', 'editor']}>
          <Dashboard />
        </ProtectedRoute>
      </AppProvider>
    )
  },
  {
    path: "/unauthorized",
    element: (
      <AppProvider>
        <Unauthorized />
      </AppProvider>
    )
  },
  {
    path: "*",
    element: (
      <AppProvider>
        <NotFound />
      </AppProvider>
    )
  }
];
