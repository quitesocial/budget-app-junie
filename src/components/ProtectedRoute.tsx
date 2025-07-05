import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

/**
 * A wrapper component that protects routes by checking authentication status
 * and optionally checking user roles
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = []
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not authenticated, redirect to log in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if the user has a required role
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    // Redirect to an unauthorized page or dashboard
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has a required role, render children
  return <>{children}</>;
};

export default ProtectedRoute;
