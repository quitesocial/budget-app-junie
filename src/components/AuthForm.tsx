import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';

// Email validation using RFC-compatible regex
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

// Password validation: at least 8 characters, one letter, one number
const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
};

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (email: string, password: string) => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, error, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Validate form fields
  const validateForm = (): boolean => {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 8 characters with at least one letter and one number');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Validate confirm password for registration
    if (mode === 'register') {
      if (!confirmPassword) {
        setConfirmPasswordError('Please confirm your password');
        isValid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        isValid = false;
      } else {
        setConfirmPasswordError('');
      }
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(email, password);
    } catch (err) {
      // Error is handled by the parent component
      console.error('Form submission error:', err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
        disabled={loading}
        required
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
        disabled={loading}
        required
      />

      {mode === 'register' && (
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          disabled={loading}
          required
        />
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          mode === 'login' ? 'Sign In' : 'Create Account'
        )}
      </Button>
    </Box>
  );
};

export default AuthForm;
