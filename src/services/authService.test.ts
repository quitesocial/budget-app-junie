import { vi, describe, it, expect, beforeEach, afterEach, Mock } from 'vitest';
import { register, login, getCurrentUser, logout, AuthError } from './authService';

// Mock the supabase client
vi.mock('../lib/supabaseClient', () => {
  return {
    default: {
      auth: {
        signUp: vi.fn(),
        signInWithPassword: vi.fn(),
        getUser: vi.fn(),
        signOut: vi.fn(),
      },
      from: vi.fn(() => ({
        insert: vi.fn(() => ({
          select: vi.fn(),
        })),
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(),
          })),
        })),
      })),
    },
  };
});

// Import the mocked client
import supabaseClient from '../lib/supabaseClient';

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      // Mock successful registration
      const mockUser = { id: 'user123', email: 'test@example.com' };
      (supabaseClient.auth.signUp as unknown as Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      (supabaseClient.from as Mock).mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
      });

      // Mock profile fetch after registration
      (supabaseClient.from as Mock).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: { role: 'user' }, error: null }),
          }),
        }),
      });

      const result = await register('test@example.com', 'Password123');

      expect(supabaseClient.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123',
      });

      expect(result).toEqual({
        id: 'user123',
        email: 'test@example.com',
        role: 'user',
      });
    });

    it('should throw an error if registration fails', async () => {
      // Mock failed registration
      (supabaseClient.auth.signUp as unknown as Mock).mockResolvedValue({
        data: { user: null },
        error: { message: 'Email already registered' },
      });

      await expect(register('test@example.com', 'Password123')).rejects.toThrow(
        new AuthError('Email already registered')
      );
    });

    it('should throw an error if user is null after successful registration', async () => {
      // Mock registration with no user returned
      (supabaseClient.auth.signUp as unknown as Mock).mockResolvedValue({
        data: { user: null },
        error: null,
      });

      await expect(register('test@example.com', 'Password123')).rejects.toThrow(
        new AuthError('Registration failed')
      );
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      // Mock successful login
      const mockUser = { id: 'user123', email: 'test@example.com' };
      (supabaseClient.auth.signInWithPassword as unknown as Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      // Mock profile fetch after login
      (supabaseClient.from as Mock).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: { role: 'user' }, error: null }),
          }),
        }),
      });

      const result = await login('test@example.com', 'Password123');

      expect(supabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123',
      });

      expect(result).toEqual({
        id: 'user123',
        email: 'test@example.com',
        role: 'user',
      });
    });

    it('should throw an error if login fails', async () => {
      // Mock failed login
      (supabaseClient.auth.signInWithPassword as unknown as Mock).mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid login credentials' },
      });

      await expect(login('test@example.com', 'WrongPassword')).rejects.toThrow(
        new AuthError('Invalid login credentials')
      );
    });

    it('should throw an error if user is null after successful login', async () => {
      // Mock login with no user returned
      (supabaseClient.auth.signInWithPassword as unknown as Mock).mockResolvedValue({
        data: { user: null },
        error: null,
      });

      await expect(login('test@example.com', 'Password123')).rejects.toThrow(
        new AuthError('Login failed')
      );
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user if logged in', async () => {
      // Mock user is logged in
      const mockUser = { id: 'user123', email: 'test@example.com' };
      (supabaseClient.auth.getUser as unknown as Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      // Mock profile fetch
      (supabaseClient.from as Mock).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: { role: 'admin' }, error: null }),
          }),
        }),
      });

      const result = await getCurrentUser();

      expect(supabaseClient.auth.getUser).toHaveBeenCalled();

      expect(result).toEqual({
        id: 'user123',
        email: 'test@example.com',
        role: 'admin',
      });
    });

    it('should return null if no user is logged in', async () => {
      // Mock no user is logged in
      (supabaseClient.auth.getUser as unknown as Mock).mockResolvedValue({
        data: { user: null },
        error: null,
      });

      const result = await getCurrentUser();

      expect(supabaseClient.auth.getUser).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('logout', () => {
    it('should logout the user successfully', async () => {
      // Mock successful logout
      (supabaseClient.auth.signOut as unknown as Mock).mockResolvedValue({
        error: null,
      });

      await logout();

      expect(supabaseClient.auth.signOut).toHaveBeenCalled();
    });

    it('should throw an error if logout fails', async () => {
      // Mock failed logout
      (supabaseClient.auth.signOut as unknown as Mock).mockResolvedValue({
        error: { message: 'Logout failed' },
      });

      await expect(logout()).rejects.toThrow(
        new AuthError('Logout failed')
      );
    });
  });
});
