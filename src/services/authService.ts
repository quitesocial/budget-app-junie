import supabaseClient from '../lib/supabaseClient';
import { User as SupabaseUser } from '@supabase/supabase-js';

// Define a User type with role
export interface User {
  id: string;
  email: string;
  role: string;
}

// Error class for authentication errors
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Converts a Supabase user to our application User type
 */
const mapUser = async (user: SupabaseUser): Promise<User> => {
  // Get user metadata from Supabase
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching user role:', error);
  }

  return {
    id: user.id,
    email: user.email || '',
    // Default to 'user' role if not found in profiles
    role: data?.role || 'user',
  };
};

/**
 * Register a new user with email and password
 */
export const register = async (email: string, password: string): Promise<User> => {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new AuthError(error.message);
  }

  if (!data.user) {
    throw new AuthError('Registration failed');
  }

  // Create a profile entry with the default role 'user'
  await supabaseClient.from('profiles').insert({
    id: data.user.id,
    email: data.user.email,
    role: 'user',
  });

  return mapUser(data.user);
};

/**
 * Log in a user with email and password
 */
export const login = async (email: string, password: string): Promise<User> => {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new AuthError(error.message);
  }

  if (!data.user) {
    throw new AuthError('Login failed');
  }

  return mapUser(data.user);
};

/**
 * Get the current logged-in user
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const { data } = await supabaseClient.auth.getUser();

  if (!data.user) {
    return null;
  }

  return mapUser(data.user);
};

/**
 * Logout the current user
 */
export const logout = async (): Promise<void> => {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    throw new AuthError(error.message);
  }
};

// Export the Supabase client for direct access if needed
export { supabaseClient };
