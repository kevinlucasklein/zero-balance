import api from './api';
import { User, AuthResponse, LoginCredentials, SignupCredentials } from '../types/auth';

// Store token in localStorage
const setToken = (token: string) => {
  localStorage.setItem('token', token);
  // Update axios headers for future requests
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};

// Check if user is logged in
const isLoggedIn = (): boolean => {
  return localStorage.getItem('token') !== null;
};

// Register a new user
export const signup = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const credentials: SignupCredentials = { name, email, password };
  const response = await api.post<AuthResponse>('/api/auth/signup', credentials);
  
  // Store token and update headers
  setToken(response.data.token);
  
  return response.data;
};

// Login user
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const credentials: LoginCredentials = { email, password };
  const response = await api.post<AuthResponse>('/api/auth/login', credentials);
  
  // Store token and update headers
  setToken(response.data.token);
  
  return response.data;
};

// Logout user
export const logout = (): void => {
  removeToken();
};

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  try {
    // Check if token exists
    if (!isLoggedIn()) {
      throw new Error('No authentication token found');
    }
    
    const response = await api.get<{ user: User }>('/api/auth/me');
    return response.data.user;
  } catch (error) {
    // If there's an error (like token expired), logout
    removeToken();
    throw error;
  }
};

// Initialize auth state from localStorage
export const initializeAuth = (): void => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export default {
  signup,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
  initializeAuth,
}; 