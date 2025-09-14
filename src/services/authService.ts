import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export class AuthService {
  private static instance: AuthService;
  private authStateListeners: ((state: AuthState) => void)[] = [];

  private constructor() {
    if (supabase) {
      this.initAuthListener();
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private initAuthListener(): void {
    if (!supabase) return;

    supabase.auth.onAuthStateChange((event, session) => {
      const authState: AuthState = {
        user: session?.user || null,
        session,
        loading: false,
      };

      this.notifyListeners(authState);
    });
  }

  addAuthStateListener(listener: (state: AuthState) => void): () => void {
    this.authStateListeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(listener);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(state: AuthState): void {
    this.authStateListeners.forEach(listener => listener(state));
  }

  async signUp(email: string, password: string, fullName?: string): Promise<{ user: User | null; error: AuthError | null }> {
    if (!supabase) {
      return { user: null, error: { message: 'Supabase not available - using local database' } as AuthError };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (data.user && !error) {
        // Create user profile
        await this.createUserProfile(data.user.id, email, fullName);
      }

      return { user: data.user, error };
    } catch (error) {
      return { user: null, error: error as AuthError };
    }
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
    if (!supabase) {
      return { user: null, error: { message: 'Supabase not available - using local database' } as AuthError };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { user: data.user, error };
    } catch (error) {
      return { user: null, error: error as AuthError };
    }
  }

  async signOut(): Promise<{ error: AuthError | null }> {
    if (!supabase) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (!supabase) {
      return null;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async getCurrentSession(): Promise<Session | null> {
    if (!supabase) {
      return null;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error('Error getting current session:', error);
      return null;
    }
  }

  private async createUserProfile(userId: string, email: string, fullName?: string): Promise<void> {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email,
          full_name: fullName || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error creating user profile:', error);
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    if (!supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  async updateUserProfile(userId: string, updates: Partial<Omit<UserProfile, 'id' | 'created_at'>>): Promise<{ error: any }> {
    if (!supabase) {
      return { error: 'Supabase not available' };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      return { error };
    } catch (error) {
      return { error };
    }
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();
