import { environment } from '../config/environment';
import { cardService as supabaseCardService } from './cardService';
import { browserLocalCardService } from './browserLocalCardService';
import { unifiedAuthService } from './unifiedAuthService';
import { Card, CardData, CardType } from '../types/card';

class UnifiedCardService {
  private static instance: UnifiedCardService;
  private useLocal: boolean;

  private constructor() {
    this.useLocal = environment.database.useLocal;
  }

  static getInstance(): UnifiedCardService {
    if (!UnifiedCardService.instance) {
      UnifiedCardService.instance = new UnifiedCardService();
    }
    return UnifiedCardService.instance;
  }

  async createCard(cardData: CardData): Promise<{ card: Card | null; error: any }> {
    if (this.useLocal) {
      const user = await unifiedAuthService.getCurrentUser();
      if (!user) {
        return { card: null, error: new Error('User not authenticated') };
      }
      return await browserLocalCardService.createCard(user.id, cardData);
    } else {
      return await supabaseCardService.createCard(cardData);
    }
  }

  async getUserCards(options: {
    sent?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ cards: Card[]; error: any }> {
    if (this.useLocal) {
      const user = await unifiedAuthService.getCurrentUser();
      if (!user) {
        return { cards: [], error: new Error('User not authenticated') };
      }
      return await browserLocalCardService.getUserCards(user.id, options);
    } else {
      return await supabaseCardService.getUserCards(options);
    }
  }

  async getCard(cardId: string): Promise<{ card: Card | null; error: any }> {
    if (this.useLocal) {
      const user = await unifiedAuthService.getCurrentUser();
      if (!user) {
        return { card: null, error: new Error('User not authenticated') };
      }
      return await browserLocalCardService.getCard(user.id, cardId);
    } else {
      return await supabaseCardService.getCard(cardId);
    }
  }

  async updateCard(cardId: string, updates: Partial<CardData>): Promise<{ card: Card | null; error: any }> {
    if (this.useLocal) {
      const user = await unifiedAuthService.getCurrentUser();
      if (!user) {
        return { card: null, error: new Error('User not authenticated') };
      }
      return await browserLocalCardService.updateCard(user.id, cardId, updates);
    } else {
      return await supabaseCardService.updateCard(cardId, updates);
    }
  }

  async deleteCard(cardId: string): Promise<{ error: any }> {
    if (this.useLocal) {
      const user = await unifiedAuthService.getCurrentUser();
      if (!user) {
        return { error: new Error('User not authenticated') };
      }
      return await browserLocalCardService.deleteCard(user.id, cardId);
    } else {
      return await supabaseCardService.deleteCard(cardId);
    }
  }

  async markCardAsSent(cardId: string): Promise<{ card: Card | null; error: any }> {
    if (this.useLocal) {
      const user = await unifiedAuthService.getCurrentUser();
      if (!user) {
        return { card: null, error: new Error('User not authenticated') };
      }
      return await browserLocalCardService.markCardAsSent(user.id, cardId);
    } else {
      return await supabaseCardService.markCardAsSent(cardId);
    }
  }

  async getDraftCards(): Promise<{ cards: Card[]; error: any }> {
    return this.getUserCards({ sent: false });
  }

  async getSentCards(): Promise<{ cards: Card[]; error: any }> {
    return this.getUserCards({ sent: true });
  }

  async getCardsByType(cardType: CardType): Promise<{ cards: Card[]; error: any }> {
    if (this.useLocal) {
      const user = await unifiedAuthService.getCurrentUser();
      if (!user) {
        return { cards: [], error: new Error('User not authenticated') };
      }
      return await browserLocalCardService.getCardsByType(user.id, cardType);
    } else {
      return await supabaseCardService.getCardsByType(cardType);
    }
  }

  getDatabaseType(): 'local' | 'supabase' {
    return this.useLocal ? 'local' : 'supabase';
  }
}

// Export singleton instance
export const unifiedCardService = UnifiedCardService.getInstance();
