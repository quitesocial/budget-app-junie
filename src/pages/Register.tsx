import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

const Register: React.FC = () => {
  const { register, error, loading, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleRegister = async (email: string, password: string) => {
    try {
      await register(email, password);
      // Redirect to dashboard after successful registration
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the AuthContext
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <AuthForm
        mode="register"
        onSubmit={handleRegister}
        error={error}
        loading={loading}
      />

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} to="/login">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
