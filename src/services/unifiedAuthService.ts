import { environment } from '../config/environment';
import { authService as supabaseAuthService } from './authService';
import { browserLocalAuthService, LocalUser, LocalSession } from './browserLocalAuthService';
import { User, Session, AuthError } from '@supabase/supabase-js';

// Unified interfaces that work with both local and Supabase
export interface UnifiedUser {
  id: string;
  email: string;
  created_at: string;
  updated_at?: string;
  user_metadata?: any;
}

export interface UnifiedSession {
  user: UnifiedUser;
  access_token?: string;
  expires_at?: number;
}

export interface UnifiedAuthState {
  user: UnifiedUser | null;
  session: UnifiedSession | null;
  loading: boolean;
}

class UnifiedAuthService {
  private static instance: UnifiedAuthService;
  private useLocal: boolean;
  private authStateListeners: ((state: UnifiedAuthState) => void)[] = [];

  private constructor() {
    this.useLocal = environment.database.useLocal;
    this.initializeAuthListeners();
  }

  static getInstance(): UnifiedAuthService {
    if (!UnifiedAuthService.instance) {
      UnifiedAuthService.instance = new UnifiedAuthService();
    }
    return UnifiedAuthService.instance;
  }

  private initializeAuthListeners(): void {
    if (this.useLocal) {
      // Listen to browser local auth state changes
      browserLocalAuthService.addAuthStateListener((localState) => {
        const unifiedState: UnifiedAuthState = {
          user: localState.user ? this.localUserToUnified(localState.user) : null,
          session: localState.session ? this.localSessionToUnified(localState.session) : null,
          loading: localState.loading,
        };
        this.notifyListeners(unifiedState);
      });
    } else {
      // Listen to Supabase auth state changes
      supabaseAuthService.addAuthStateListener((supabaseState) => {
        const unifiedState: UnifiedAuthState = {
          user: supabaseState.user ? this.supabaseUserToUnified(supabaseState.user) : null,
          session: supabaseState.session ? this.supabaseSessionToUnified(supabaseState.session) : null,
          loading: supabaseState.loading,
        };
        this.notifyListeners(unifiedState);
      });
    }
  }

  // Convert local user to unified format
  private localUserToUnified(localUser: LocalUser): UnifiedUser {
    return {
      id: localUser.id,
      email: localUser.email,
      created_at: localUser.created_at,
      updated_at: localUser.updated_at,
      user_metadata: localUser.user_metadata,
    };
  }

  // Convert local session to unified format
  private localSessionToUnified(localSession: LocalSession): UnifiedSession {
    return {
      user: this.localUserToUnified(localSession.user),
      access_token: localSession.access_token,
      expires_at: localSession.expires_at,
    };
  }

  // Convert Supabase user to unified format
  private supabaseUserToUnified(supabaseUser: User): UnifiedUser {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email!,
      created_at: supabaseUser.created_at,
      updated_at: supabaseUser.updated_at,
      user_metadata: supabaseUser.user_metadata,
    };
  }

  // Convert Supabase session to unified format
  private supabaseSessionToUnified(supabaseSession: Session): UnifiedSession {
    return {
      user: this.supabaseUserToUnified(supabaseSession.user),
      access_token: supabaseSession.access_token,
      expires_at: supabaseSession.expires_at,
    };
  }

  // Add auth state listener
  addAuthStateListener(listener: (state: UnifiedAuthState) => void): () => void {
    this.authStateListeners.push(listener);

    // Get current state and notify immediately
    this.getCurrentState().then(state => listener(state));

    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(listener);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners
  private notifyListeners(state: UnifiedAuthState): void {
    this.authStateListeners.forEach(listener => listener(state));
  }

  // Get current auth state
  async getCurrentState(): Promise<UnifiedAuthState> {
    if (this.useLocal) {
      const user = browserLocalAuthService.getCurrentUser();
      const session = browserLocalAuthService.getCurrentSession();
      return {
        user: user ? this.localUserToUnified(user) : null,
        session: session ? this.localSessionToUnified(session) : null,
        loading: false,
      };
    } else {
      const user = await supabaseAuthService.getCurrentUser();
      const session = await supabaseAuthService.getCurrentSession();
      return {
        user: user ? this.supabaseUserToUnified(user) : null,
        session: session ? this.supabaseSessionToUnified(session) : null,
        loading: false,
      };
    }
  }

  // Sign up
  async signUp(email: string, password: string, fullName?: string): Promise<{ user: UnifiedUser | null; error: any }> {
    if (this.useLocal) {
      const { user, error } = await browserLocalAuthService.signUp(email, password, fullName);
      return {
        user: user ? this.localUserToUnified(user) : null,
        error,
      };
    } else {
      const { user, error } = await supabaseAuthService.signUp(email, password, fullName);
      return {
        user: user ? this.supabaseUserToUnified(user) : null,
        error,
      };
    }
  }

  // Sign in
  async signIn(email: string, password: string): Promise<{ user: UnifiedUser | null; error: any }> {
    if (this.useLocal) {
      const { user, error } = await browserLocalAuthService.signIn(email, password);
      return {
        user: user ? this.localUserToUnified(user) : null,
        error,
      };
    } else {
      const { user, error } = await supabaseAuthService.signIn(email, password);
      return {
        user: user ? this.supabaseUserToUnified(user) : null,
        error,
      };
    }
  }

  // Sign out
  async signOut(): Promise<{ error: any }> {
    if (this.useLocal) {
      return await browserLocalAuthService.signOut();
    } else {
      return await supabaseAuthService.signOut();
    }
  }

  // Get current user
  async getCurrentUser(): Promise<UnifiedUser | null> {
    if (this.useLocal) {
      const user = browserLocalAuthService.getCurrentUser();
      return user ? this.localUserToUnified(user) : null;
    } else {
      const user = await supabaseAuthService.getCurrentUser();
      return user ? this.supabaseUserToUnified(user) : null;
    }
  }

  // Get current session
  async getCurrentSession(): Promise<UnifiedSession | null> {
    if (this.useLocal) {
      const session = browserLocalAuthService.getCurrentSession();
      return session ? this.localSessionToUnified(session) : null;
    } else {
      const session = await supabaseAuthService.getCurrentSession();
      return session ? this.supabaseSessionToUnified(session) : null;
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    if (this.useLocal) {
      return browserLocalAuthService.isAuthenticated();
    } else {
      const user = await supabaseAuthService.getCurrentUser();
      return user !== null;
    }
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<any> {
    if (this.useLocal) {
      return await browserLocalAuthService.getUserProfile(userId);
    } else {
      return await supabaseAuthService.getUserProfile(userId);
    }
  }

  // Update user profile
  async updateUserProfile(userId: string, updates: any): Promise<{ error: any }> {
    if (this.useLocal) {
      return await browserLocalAuthService.updateUserProfile(userId, updates);
    } else {
      return await supabaseAuthService.updateUserProfile(userId, updates);
    }
  }

  // Reset password (only available for Supabase)
  async resetPassword(email: string): Promise<{ error: any }> {
    if (this.useLocal) {
      return { error: new Error('Password reset not available for local authentication') };
    } else {
      return await supabaseAuthService.resetPassword(email);
    }
  }

  // Get authentication type
  getAuthType(): 'local' | 'supabase' {
    return this.useLocal ? 'local' : 'supabase';
  }
}

// Export singleton instance
export const unifiedAuthService = UnifiedAuthService.getInstance();
