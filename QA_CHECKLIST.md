# QA Checklist

This checklist is designed to verify that the project environment is correctly set up and functioning.

## Environment Setup

- [ ] Node.js 18+ and npm 8+ are installed
  ```bash
  node -v
  npm -v
  ```

- [ ] All dependencies install successfully
  ```bash
  npm ci
  ```

- [ ] Environment variables are properly configured
  ```bash
  # Check that .env file exists with required variables
  cat .env
  ```

## Build and Development

- [ ] Project builds without errors
  ```bash
  npm run build
  ```

- [ ] Development server starts successfully
  ```bash
  npm run dev
  ```

- [ ] Application loads in browser at http://localhost:3000

## Supabase

- [ ] Supabase local development environment starts successfully
  ```bash
  npx supabase start
  ```

- [ ] Can connect to Supabase from the application
  ```bash
  # Check browser console for connection errors
  # Try to sign up or log in through the UI
  ```

- [ ] User registration creates a new record in the `users` table
  ```bash
  # After registering, check the database:
  npx supabase db query 'SELECT * FROM public.users ORDER BY created_at DESC LIMIT 1'
  ```

## Frontend Features

- [ ] Material UI components render correctly
  ```bash
  # Visual inspection of UI elements
  ```

- [ ] Responsive design works on different screen sizes
  ```bash
  # Test in browser dev tools with different device sizes
  ```

- [ ] Navigation between pages works correctly
  ```bash
  # Test all navigation links
  ```

## Testing and Linting

- [ ] All tests pass
  ```bash
  npm test
  ```

- [ ] Linting passes without errors
  ```bash
  npm run lint
  ```

## CI/CD

- [ ] GitHub Actions workflow runs successfully on push
  ```bash
  # Check the Actions tab in the GitHub repository after pushing changes
  ```

## Notes

Add any additional observations or issues encountered during testing here:

- 
- 
- 

## Tester Information

- **Name:** 
- **Date:** 
- **Environment:** (e.g., OS, Browser version)
