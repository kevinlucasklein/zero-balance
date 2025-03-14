import api from './api';

// Types
export interface Profile {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface ProfileStats {
  total_debt: number;
  total_income: number;
  debt_count: number;
  income_sources_count: number;
  debt_to_income_ratio: number;
}

// Get user profile
export const getProfile = async (): Promise<Profile> => {
  const response = await api.get<{ profile: Profile }>('/api/profile');
  return response.data.profile;
};

// Update user profile
export const updateProfile = async (name: string): Promise<Profile> => {
  const response = await api.put<{ profile: Profile, message: string }>('/api/profile', { name });
  return response.data.profile;
};

// Change password
export const changePassword = async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
  const response = await api.put<{ message: string }>('/api/profile/password', {
    current_password: currentPassword,
    new_password: newPassword,
  });
  return response.data;
};

// Get user statistics
export const getProfileStats = async (): Promise<ProfileStats> => {
  const response = await api.get<{ stats: ProfileStats }>('/api/profile/stats');
  return response.data.stats;
};

export default {
  getProfile,
  updateProfile,
  changePassword,
  getProfileStats,
}; 