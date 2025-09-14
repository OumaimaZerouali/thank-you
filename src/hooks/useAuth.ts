import { useState, useEffect } from 'react';
import { unifiedAuthService, UnifiedAuthState } from '../services/unifiedAuthService';

export const useAuth = () => {
  const [authState, setAuthState] = useState<UnifiedAuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    // Subscribe to unified auth state changes
    const unsubscribe = unifiedAuthService.addAuthStateListener(setAuthState);

    // Get initial auth state
    const initializeAuth = async () => {
      const currentState = await unifiedAuthService.getCurrentState();
      setAuthState(currentState);
    };

    initializeAuth();
    return unsubscribe;
  }, []);

  return authState;
};

export const useUserProfile = (userId?: string) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const userProfile = await unifiedAuthService.getUserProfile(userId);
        setProfile(userProfile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const updateProfile = async (updates: any) => {
    if (!userId) return { error: 'No user ID provided' };

    try {
      setLoading(true);
      const { error } = await unifiedAuthService.updateUserProfile(userId, updates);

      if (!error) {
        // Refresh profile data
        const updatedProfile = await unifiedAuthService.getUserProfile(userId);
        setProfile(updatedProfile);
      }

      return { error };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to update profile';
      setError(error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
};
