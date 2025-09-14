import { environment } from '../config/environment';
import { authService as supabaseAuthService } from './authService';
import { cardService as supabaseCardService } from './cardService';
import { localDb } from './localDatabaseService';
import { Card, CardData } from '../types/card';

// Unified interfaces for both local and Supabase
export interface UnifiedUser {
  id: string;
  email: string;
  created_at: string | Date;
  user_metadata?: any;
}

export interface UnifiedAuthResult {
  user: UnifiedUser | null;
  error: any;
}

export interface UnifiedCardResult {
  card: Card | null;
  error: any;
}

export interface UnifiedCardsResult {
  cards: Card[];
  error: any;
}

class UnifiedDatabaseService {
  private static instance: UnifiedDatabaseService;
  private useLocal: boolean;

  private constructor() {
    this.useLocal = environment.database.useLocal;
  }

  static getInstance(): UnifiedDatabaseService {
    if (!UnifiedDatabaseService.instance) {
      UnifiedDatabaseService.instance = new UnifiedDatabaseService();
    }
    return UnifiedDatabaseService.instance;
  }

  // Test database connection
  async testConnection(): Promise<boolean> {
    if (this.useLocal) {
      return await localDb.testConnection();
    } else {
      // Test Supabase connection
      try {
        const user = await supabaseAuthService.getCurrentUser();
        return true; // If no error, connection is working
      } catch (error) {
        console.error('Supabase connection test failed:', error);
        return false;
      }
    }
  }

  // Authentication methods
  async signUp(email: string, password: string, fullName?: string): Promise<UnifiedAuthResult> {
    if (this.useLocal) {
      const { user, error } = await localDb.signUp(email, password, fullName);
      return {
        user: user ? {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          user_metadata: user.raw_user_meta_data
        } : null,
        error
      };
    } else {
      const { user, error } = await supabaseAuthService.signUp(email, password, fullName);
      return {
        user: user ? {
          id: user.id,
          email: user.email!,
          created_at: user.created_at,
          user_metadata: user.user_metadata
        } : null,
        error
      };
    }
  }

  async signIn(email: string, password: string): Promise<UnifiedAuthResult> {
    if (this.useLocal) {
      const { user, error } = await localDb.signIn(email, password);
      return {
        user: user ? {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          user_metadata: user.raw_user_meta_data
        } : null,
        error
      };
    } else {
      const { user, error } = await supabaseAuthService.signIn(email, password);
      return {
        user: user ? {
          id: user.id,
          email: user.email!,
          created_at: user.created_at,
          user_metadata: user.user_metadata
        } : null,
        error
      };
    }
  }

  async signOut(): Promise<{ error: any }> {
    if (this.useLocal) {
      // For local DB, we just clear the session (handled by auth service)
      return { error: null };
    } else {
      return await supabaseAuthService.signOut();
    }
  }

  async getCurrentUser(): Promise<UnifiedUser | null> {
    if (this.useLocal) {
      // For local DB, we'll need to implement session management
      // For now, return null (session management would be handled differently)
      return null;
    } else {
      const user = await supabaseAuthService.getCurrentUser();
      return user ? {
        id: user.id,
        email: user.email!,
        created_at: user.created_at,
        user_metadata: user.user_metadata
      } : null;
    }
  }

  // Card management methods
  async createCard(userId: string, cardData: CardData): Promise<UnifiedCardResult> {
    if (this.useLocal) {
      return await localDb.createCard(userId, cardData);
    } else {
      return await supabaseCardService.createCard(cardData);
    }
  }

  async getUserCards(userId: string, options: {
    sent?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<UnifiedCardsResult> {
    if (this.useLocal) {
      return await localDb.getUserCards(userId, options);
    } else {
      return await supabaseCardService.getUserCards(options);
    }
  }

  async getCard(userId: string, cardId: string): Promise<UnifiedCardResult> {
    if (this.useLocal) {
      return await localDb.getCard(userId, cardId);
    } else {
      return await supabaseCardService.getCard(cardId);
    }
  }

  async updateCard(userId: string, cardId: string, updates: Partial<CardData>): Promise<UnifiedCardResult> {
    if (this.useLocal) {
      return await localDb.updateCard(userId, cardId, updates);
    } else {
      return await supabaseCardService.updateCard(cardId, updates);
    }
  }

  async deleteCard(userId: string, cardId: string): Promise<{ error: any }> {
    if (this.useLocal) {
      return await localDb.deleteCard(userId, cardId);
    } else {
      return await supabaseCardService.deleteCard(cardId);
    }
  }

  async markCardAsSent(userId: string, cardId: string): Promise<UnifiedCardResult> {
    if (this.useLocal) {
      return await localDb.markCardAsSent(userId, cardId);
    } else {
      return await supabaseCardService.markCardAsSent(cardId);
    }
  }

  // Utility methods
  getDatabaseType(): 'local' | 'supabase' {
    return this.useLocal ? 'local' : 'supabase';
  }

  async close(): Promise<void> {
    if (this.useLocal) {
      await localDb.close();
    }
    // Supabase client doesn't need explicit closing
  }
}

// Export singleton instance
export const unifiedDb = UnifiedDatabaseService.getInstance();
