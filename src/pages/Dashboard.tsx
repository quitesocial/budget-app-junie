import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect is handled by the ProtectedRoute component
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to your dashboard! You are logged in as <strong>{user?.email}</strong>.
        </Typography>

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>
            User Information
          </Typography>

          <Typography variant="body1">
            ID: {user?.id}
          </Typography>

          <Typography variant="body1">
            Email: {user?.email}
          </Typography>

          <Typography variant="body1">
            Role: {user?.role}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Admin-only section */}
        {user?.role === 'admin' && (
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Admin Panel
            </Typography>

            <Typography variant="body1" paragraph>
              This section is only visible to administrators.
            </Typography>

            <Button variant="outlined" color="primary">
              Manage Users
            </Button>
          </Box>
        )}

        {/* Editor-only section */}
        {(user?.role === 'editor' || user?.role === 'admin') && (
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Editor Tools
            </Typography>

            <Typography variant="body1" paragraph>
              This section is only visible to editors and administrators.
            </Typography>

            <Button variant="outlined" color="primary">
              Edit Content
            </Button>
          </Box>
        )}

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
