// Define user-related types
export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

// Define auth response types
export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

// Define login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Define signup credentials
export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
} 