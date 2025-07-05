import React, { useEffect, useState } from 'react';
import { User, login as authLogin, register as authRegister, logout as authLogout, getCurrentUser } from '../services/authService';
import { AuthContext } from './authContext';

// Provider component that wraps the app and makes an auth object available to any child component that calls useAuth()
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Clear any error messages
  const clearError = () => setError(null);

  // Check if there is a current user on an initial load
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Error checking authentication status:', err);
        setError('Failed to check authentication status');
      } finally {
        setLoading(false);
      }
    };

    void checkUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    clearError();
    try {
      const user = await authLogin(email, password);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string) => {
    setLoading(true);
    clearError();
    try {
      const user = await authRegister(email, password);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during registration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    clearError();
    try {
      await authLogout();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during logout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // The value that will be provided to consumers of this context
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
