import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Login: React.FC = () => {
  const { login, error, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  // Get the redirect path from the location state or default to dashboard
  const from = (location.state as LocationState)?.from?.pathname || '/dashboard';

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // Redirect to the page the user was trying to access or dashboard
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by the AuthContext
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <AuthForm
        mode="login"
        onSubmit={handleLogin}
        error={error}
        loading={loading}
      />

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2">
          Don&#39;t have an account?{' '}
          <Link component={RouterLink} to="/register">
            Create one
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
