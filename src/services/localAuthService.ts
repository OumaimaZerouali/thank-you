import { localDb } from './localDatabaseService';
import { environment } from '../config/environment';

// Local user interface that mimics Supabase User
export interface LocalUser {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  user_metadata?: any;
}

export interface LocalSession {
  user: LocalUser;
  access_token: string;
  expires_at: number;
}

export interface LocalAuthState {
  user: LocalUser | null;
  session: LocalSession | null;
  loading: boolean;
}

class LocalAuthService {
  private static instance: LocalAuthService;
  private currentUser: LocalUser | null = null;
  private currentSession: LocalSession | null = null;
  private authStateListeners: ((state: LocalAuthState) => void)[] = [];
  private sessionKey = 'thankyou_local_session';

  private constructor() {
    this.loadSessionFromStorage();
  }

  static getInstance(): LocalAuthService {
    if (!LocalAuthService.instance) {
      LocalAuthService.instance = new LocalAuthService();
    }
    return LocalAuthService.instance;
  }

  // Load session from localStorage on initialization
  private loadSessionFromStorage(): void {
    try {
      const storedSession = localStorage.getItem(this.sessionKey);
      if (storedSession) {
        const session: LocalSession = JSON.parse(storedSession);

        // Check if session is still valid (not expired)
        if (session.expires_at > Date.now()) {
          this.currentSession = session;
          this.currentUser = session.user;
          this.notifyListeners();
        } else {
          // Session expired, clear it
          this.clearSession();
        }
      }
    } catch (error) {
      console.error('Error loading session from storage:', error);
      this.clearSession();
    }
  }

  // Save session to localStorage
  private saveSessionToStorage(session: LocalSession): void {
    try {
      localStorage.setItem(this.sessionKey, JSON.stringify(session));
    } catch (error) {
      console.error('Error saving session to storage:', error);
    }
  }

  // Clear session from localStorage
  private clearSession(): void {
    localStorage.removeItem(this.sessionKey);
    this.currentUser = null;
    this.currentSession = null;
  }

  // Generate a simple session token
  private generateSessionToken(): string {
    return btoa(Math.random().toString(36) + Date.now().toString(36));
  }

  // Create a session for a user
  private createSession(user: LocalUser): LocalSession {
    const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 days
    return {
      user,
      access_token: this.generateSessionToken(),
      expires_at: expiresAt,
    };
  }

  // Add auth state listener
  addAuthStateListener(listener: (state: LocalAuthState) => void): () => void {
    this.authStateListeners.push(listener);

    // Immediately call with current state
    listener({
      user: this.currentUser,
      session: this.currentSession,
      loading: false,
    });

    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(listener);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners of auth state changes
  private notifyListeners(): void {
    const state: LocalAuthState = {
      user: this.currentUser,
      session: this.currentSession,
      loading: false,
    };

    this.authStateListeners.forEach(listener => listener(state));
  }

  // Sign up a new user
  async signUp(email: string, password: string, fullName?: string): Promise<{ user: LocalUser | null; error: any }> {
    try {
      const { user: dbUser, error } = await localDb.signUp(email, password, fullName);

      if (error) {
        return { user: null, error };
      }

      if (dbUser) {
        const localUser: LocalUser = {
          id: dbUser.id,
          email: dbUser.email,
          created_at: dbUser.created_at.toISOString(),
          updated_at: dbUser.updated_at.toISOString(),
          user_metadata: dbUser.raw_user_meta_data,
        };

        // Create and save session
        const session = this.createSession(localUser);
        this.currentUser = localUser;
        this.currentSession = session;
        this.saveSessionToStorage(session);
        this.notifyListeners();

        return { user: localUser, error: null };
      }

      return { user: null, error: new Error('Failed to create user') };
    } catch (error) {
      return { user: null, error };
    }
  }

  // Sign in an existing user
  async signIn(email: string, password: string): Promise<{ user: LocalUser | null; error: any }> {
    try {
      const { user: dbUser, error } = await localDb.signIn(email, password);

      if (error) {
        return { user: null, error };
      }

      if (dbUser) {
        const localUser: LocalUser = {
          id: dbUser.id,
          email: dbUser.email,
          created_at: dbUser.created_at.toISOString(),
          updated_at: dbUser.updated_at.toISOString(),
          user_metadata: dbUser.raw_user_meta_data,
        };

        // Create and save session
        const session = this.createSession(localUser);
        this.currentUser = localUser;
        this.currentSession = session;
        this.saveSessionToStorage(session);
        this.notifyListeners();

        return { user: localUser, error: null };
      }

      return { user: null, error: new Error('Failed to sign in') };
    } catch (error) {
      return { user: null, error };
    }
  }

  // Sign out the current user
  async signOut(): Promise<{ error: any }> {
    try {
      this.clearSession();
      this.notifyListeners();
      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  // Get current user
  getCurrentUser(): LocalUser | null {
    return this.currentUser;
  }

  // Get current session
  getCurrentSession(): LocalSession | null {
    return this.currentSession;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null && this.currentSession !== null;
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<any> {
    try {
      const { profile, error } = await localDb.getUserProfile(userId);
      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // Update user profile
  async updateUserProfile(userId: string, updates: any): Promise<{ error: any }> {
    try {
      return await localDb.updateUserProfile(userId, updates);
    } catch (error) {
      return { error };
    }
  }
}

// Export singleton instance
export const localAuthService = LocalAuthService.getInstance();
