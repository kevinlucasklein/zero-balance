import { useState, useEffect } from 'react';
import profileService, { Profile, ProfileStats } from '../services/profile';

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('');
  
  // Password change state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);
      try {
        const profileData = await profileService.getProfile();
        setProfile(profileData);
        setName(profileData.name);
        
        // Also fetch stats
        try {
          const statsData = await profileService.getProfileStats();
          setStats(statsData);
        } catch (err) {
          console.error('Error fetching stats:', err);
          // Don't set error for stats, just log it
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Handle profile update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const updatedProfile = await profileService.updateProfile(name);
      setProfile(updatedProfile);
      setIsEditMode(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await profileService.changePassword(currentPassword, newPassword);
      setPasswordSuccess(result.message);
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      console.error('Error changing password:', err);
      // Type guard to safely access response data
      const errorMessage = 
        typeof err === 'object' && 
        err !== null && 
        'response' in err && 
        typeof err.response === 'object' && 
        err.response !== null && 
        'data' in err.response && 
        typeof err.response.data === 'object' && 
        err.response.data !== null && 
        'error' in err.response.data && 
        typeof err.response.data.error === 'string'
          ? err.response.data.error
          : 'Failed to change password. Please try again.';
      
      setPasswordError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setIsEditMode(false);
    if (profile) {
      setName(profile.name);
    }
  };

  // Cancel password change
  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError(null);
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-100 rounded-lg">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold">My Profile</h1>
            {profile && (
              <p className="mt-2 text-blue-100">Member since {new Date(profile.created_at).toLocaleDateString()}</p>
            )}
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            
            {passwordSuccess && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
                {passwordSuccess}
              </div>
            )}

            {/* Profile Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              
              {isEditMode ? (
                <form onSubmit={handleUpdateProfile}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={profile?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                      disabled
                    />
                    <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{profile?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{profile?.email}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>

            {/* Password Change */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Password</h2>
              
              {isChangingPassword ? (
                <form onSubmit={handleChangePassword}>
                  {passwordError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                      {passwordError}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      minLength={6}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {loading ? 'Changing...' : 'Change Password'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelPasswordChange}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    For security reasons, we recommend changing your password regularly.
                  </p>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Change Password
                  </button>
                </div>
              )}
            </div>

            {/* Account Statistics */}
            {stats && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Account Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded">
                    <p className="text-sm text-blue-600">Total Debt</p>
                    <p className="text-2xl font-bold">${stats.total_debt.toFixed(2)}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded">
                    <p className="text-sm text-green-600">Total Income</p>
                    <p className="text-2xl font-bold">${stats.total_income.toFixed(2)}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded">
                    <p className="text-sm text-purple-600">Debt-to-Income Ratio</p>
                    <p className="text-2xl font-bold">{(stats.debt_to_income_ratio * 100).toFixed(1)}%</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded">
                    <p className="text-sm text-yellow-600">Active Debts</p>
                    <p className="text-2xl font-bold">{stats.debt_count}</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded">
                    <p className="text-sm text-indigo-600">Income Sources</p>
                    <p className="text-2xl font-bold">{stats.income_sources_count}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 