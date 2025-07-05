import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';

const Unauthorized: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Access Denied
        </Typography>

        <Typography variant="body1" paragraph>
          You don&#39;t have permission to access this page. This area requires additional privileges.
        </Typography>

        <Button
          component={RouterLink}
          to="/dashboard"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Go to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default Unauthorized;
