# Authentication System Documentation

## Overview

This document provides an overview of the authentication system implemented for the budget application. The system uses Supabase Auth for authentication and includes role-based access control.

## File Structure

```
src/
├── lib/
│   └── supabaseClient.ts       # Supabase client initialization
├── services/
│   ├── authService.ts          # Authentication service methods
│   └── authService.test.ts     # Tests for authentication service
├── contexts/
│   └── AuthProvider.tsx         # React context for authentication state
├── components/
│   ├── AuthForm.tsx            # Reusable form for login and registration
│   └── ProtectedRoute.tsx      # Component to protect routes based on auth status
├── pages/
│   ├── Login.tsx               # Login page
│   ├── Register.tsx            # Registration page
│   ├── Dashboard.tsx           # Protected dashboard page
│   └── Unauthorized.tsx        # Page for unauthorized access attempts
```

## Components

### 1. supabaseClient.ts

Initializes the Supabase client using environment variables:

- `VITE_SUPABASE_URL`: The URL of your Supabase project
- `VITE_SUPABASE_ANON_KEY`: The anonymous key for your Supabase project

### 2. authService.ts

Provides methods for authentication:

- `register(email, password)`: Registers a new user and assigns the 'user' role
- `login(email, password)`: Logs in a user
- `getCurrentUser()`: Gets the current logged-in user
- `logout()`: Logs out the current user

### 3. AuthProvider.tsx

Provides authentication state and methods to the application:

- `user`: The current user object (id, email, role)
- `loading`: Boolean indicating if authentication is being checked
- `error`: Error message if authentication fails
- `login`: Method to log in a user
- `register`: Method to register a new user
- `logout`: Method to log out a user
- `clearError`: Method to clear error messages

### 4. AuthForm.tsx

Reusable form component for login and registration:

- Validates email using RFC-compatible regex
- Validates password (min 8 chars, at least one letter and one number)
- Shows appropriate error messages
- Handles form submission

### 5. ProtectedRoute.tsx

Component to protect routes based on authentication status and user roles:

- Redirects to login if user is not authenticated
- Redirects to unauthorized page if user doesn't have required role
- Shows loading state while checking authentication

## Pages

### 1. Login.tsx

Login page that uses the AuthForm component:

- Redirects to the page user was trying to access after successful login
- Shows error messages if login fails

### 2. Register.tsx

Registration page that uses the AuthForm component:

- Redirects to dashboard after successful registration
- Shows error messages if registration fails

### 3. Dashboard.tsx

Protected dashboard page that shows user information:

- Shows different UI elements based on user role
- Provides logout functionality

### 4. Unauthorized.tsx

Page shown when a user tries to access a page they don't have permission for.

## Role-Based Access Control

The system supports three roles:

1. `user`: Default role assigned to new users
2. `editor`: Can access editor tools
3. `admin`: Can access admin panel and editor tools

Routes can be protected based on roles:

```tsx
<ProtectedRoute requiredRoles={['admin']}>
  <AdminPage />
</ProtectedRoute>
```

UI elements can be conditionally rendered based on user role:

```tsx
{user?.role === 'admin' && (
  <AdminPanel />
)}
```

## Testing

The authentication service is thoroughly tested with Jest:

- Positive tests for successful authentication
- Negative tests for failed authentication
- Edge cases for unexpected responses

## Environment Variables

The following environment variables must be set:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Usage

1. Wrap your application with the AuthProvider:

```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

2. Use the useAuth hook to access authentication state and methods:

```tsx
const { user, login, logout } = useAuth();
```

3. Protect routes with the ProtectedRoute component:

```tsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

4. Conditionally render UI elements based on user role:

```tsx
{user?.role === 'admin' && (
  <AdminPanel />
)}
```
