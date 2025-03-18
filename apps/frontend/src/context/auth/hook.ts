import { useContext } from 'react';
import { AuthContext } from './types';

/**
 * Custom hook to access the auth context
 * @returns The auth context value
 */
export const useAuth = () => useContext(AuthContext); 