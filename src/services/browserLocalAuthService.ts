import { v4 as uuidv4 } from 'uuid';

// Browser-compatible local user interface
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

// Simple in-memory user storage for demo purposes
// In a real app, this would be handled by your backend API
class BrowserLocalAuthService {
  private static instance: BrowserLocalAuthService;
  private currentUser: LocalUser | null = null;
  private currentSession: LocalSession | null = null;
  private authStateListeners: ((state: LocalAuthState) => void)[] = [];
  private sessionKey = 'thankyou_local_session';
  private usersKey = 'thankyou_local_users';

  private constructor() {
    this.loadSessionFromStorage();
  }

  static getInstance(): BrowserLocalAuthService {
    if (!BrowserLocalAuthService.instance) {
      BrowserLocalAuthService.instance = new BrowserLocalAuthService();
    }
    return BrowserLocalAuthService.instance;
  }

  // Load session from localStorage
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

  // Get stored users from localStorage
  private getStoredUsers(): Record<string, { password: string; user: LocalUser }> {
    try {
      const stored = localStorage.getItem(this.usersKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      return {};
    }
  }

  // Save users to localStorage
  private saveStoredUsers(users: Record<string, { password: string; user: LocalUser }>): void {
    try {
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  // Simple password hashing (for demo only - in production use proper server-side hashing)
  private simpleHash(password: string): string {
    return btoa(password + 'salt');
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
      const users = this.getStoredUsers();

      // Check if user already exists
      if (users[email]) {
        return { user: null, error: new Error('User already exists') };
      }

      const userId = uuidv4();
      const now = new Date().toISOString();

      const newUser: LocalUser = {
        id: userId,
        email,
        created_at: now,
        updated_at: now,
        user_metadata: { full_name: fullName },
      };

      // Store user
      users[email] = {
        password: this.simpleHash(password),
        user: newUser,
      };
      this.saveStoredUsers(users);

      // Create and save session
      const session = this.createSession(newUser);
      this.currentUser = newUser;
      this.currentSession = session;
      this.saveSessionToStorage(session);
      this.notifyListeners();

      return { user: newUser, error: null };
    } catch (error) {
      return { user: null, error };
    }
  }

  // Sign in an existing user
  async signIn(email: string, password: string): Promise<{ user: LocalUser | null; error: any }> {
    try {
      const users = this.getStoredUsers();
      const userRecord = users[email];

      if (!userRecord) {
        return { user: null, error: new Error('User not found') };
      }

      const hashedPassword = this.simpleHash(password);
      if (userRecord.password !== hashedPassword) {
        return { user: null, error: new Error('Invalid password') };
      }

      // Create and save session
      const session = this.createSession(userRecord.user);
      this.currentUser = userRecord.user;
      this.currentSession = session;
      this.saveSessionToStorage(session);
      this.notifyListeners();

      return { user: userRecord.user, error: null };
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

  // Get user profile (for now, same as user data)
  async getUserProfile(userId: string): Promise<any> {
    if (this.currentUser && this.currentUser.id === userId) {
      return {
        id: this.currentUser.id,
        email: this.currentUser.email,
        full_name: this.currentUser.user_metadata?.full_name,
        created_at: this.currentUser.created_at,
        updated_at: this.currentUser.updated_at,
      };
    }
    return null;
  }

  // Update user profile
  async updateUserProfile(userId: string, updates: any): Promise<{ error: any }> {
    try {
      if (!this.currentUser || this.currentUser.id !== userId) {
        return { error: new Error('Not authorized') };
      }

      const users = this.getStoredUsers();
      const userRecord = users[this.currentUser.email];

      if (userRecord) {
        // Update user metadata
        userRecord.user.user_metadata = {
          ...userRecord.user.user_metadata,
          ...updates,
        };
        userRecord.user.updated_at = new Date().toISOString();

        this.saveStoredUsers(users);
        this.currentUser = userRecord.user;

        // Update session
        if (this.currentSession) {
          this.currentSession.user = userRecord.user;
          this.saveSessionToStorage(this.currentSession);
        }

        this.notifyListeners();
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  }
}

// Export singleton instance
export const browserLocalAuthService = BrowserLocalAuthService.getInstance();
