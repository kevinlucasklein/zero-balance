import { useState, useEffect, ReactNode } from 'react';
import authService from '../../services/auth';
import { User } from '../../types/auth';
import { AuthContext, AuthContextType } from './types';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider component for authentication state
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on component mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        // Initialize auth headers from localStorage
        authService.initializeAuth();
        
        // If user is logged in, fetch current user data
        if (authService.isLoggedIn()) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch {
        // If there's an error, clear the token
        authService.logout();
        setError('Session expired. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : typeof err === 'object' && err !== null && 'response' in err && typeof err.response === 'object' && err.response !== null && 'data' in err.response && typeof err.response.data === 'object' && err.response.data !== null && 'error' in err.response.data && typeof err.response.data.error === 'string'
          ? err.response.data.error
          : 'Failed to login. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.signup(name, email, password);
      setUser(response.user);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : typeof err === 'object' && err !== null && 'response' in err && typeof err.response === 'object' && err.response !== null && 'data' in err.response && typeof err.response.data === 'object' && err.response.data !== null && 'error' in err.response.data && typeof err.response.data.error === 'string'
          ? err.response.data.error
          : 'Failed to sign up. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Context value
  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 