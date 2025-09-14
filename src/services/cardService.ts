import { supabase, Database } from '../config/supabase';
import { Card, CardData, CardType, PatternType } from '../types/card';
import { authService } from './authService';

type DbCard = Database['public']['Tables']['cards']['Row'];
type DbCardInsert = Database['public']['Tables']['cards']['Insert'];
type DbCardUpdate = Database['public']['Tables']['cards']['Update'];

export class CardService {
  private static instance: CardService;

  private constructor() {}

  static getInstance(): CardService {
    if (!CardService.instance) {
      CardService.instance = new CardService();
    }
    return CardService.instance;
  }

  // Convert database card to app card format
  private dbCardToCard(dbCard: DbCard): Card {
    return {
      id: dbCard.id,
      cardType: dbCard.card_type as CardType,
      recipientName: dbCard.recipient_name,
      recipientEmail: dbCard.recipient_email,
      senderName: dbCard.sender_name,
      message: dbCard.message,
      backgroundColor: dbCard.background_color,
      textColor: dbCard.text_color,
      borderColor: dbCard.border_color,
      fontFamily: dbCard.font_family,
      fontSize: dbCard.font_size,
      pattern: dbCard.pattern as PatternType,
      imageUrl: dbCard.image_url || undefined,
      createdAt: new Date(dbCard.created_at),
      updatedAt: new Date(dbCard.updated_at),
      isSent: dbCard.is_sent,
    };
  }

  // Convert app card to database format
  private cardToDbCard(card: CardData, userId: string): DbCardInsert {
    return {
      user_id: userId,
      card_type: card.cardType,
      recipient_name: card.recipientName,
      recipient_email: card.recipientEmail,
      sender_name: card.senderName,
      message: card.message,
      background_color: card.backgroundColor,
      text_color: card.textColor,
      border_color: card.borderColor,
      font_family: card.fontFamily,
      font_size: card.fontSize,
      pattern: card.pattern,
      image_url: card.imageUrl || null,
      is_sent: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  async createCard(cardData: CardData): Promise<{ card: Card | null; error: any }> {
    if (!supabase) {
      return { card: null, error: new Error('Supabase not available - using local database') };
    }

    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        return { card: null, error: new Error('User not authenticated') };
      }

      const dbCard = this.cardToDbCard(cardData, user.id);

      const { data, error } = await supabase
        .from('cards')
        .insert(dbCard)
        .select()
        .single();

      if (error) {
        return { card: null, error };
      }

      return { card: this.dbCardToCard(data), error: null };
    } catch (error) {
      return { card: null, error };
    }
  }

  async getUserCards(options: {
    sent?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ cards: Card[]; error: any }> {
    if (!supabase) {
      return { cards: [], error: new Error('Supabase not available - using local database') };
    }

    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        return { cards: [], error: new Error('User not authenticated') };
      }

      let query = supabase
        .from('cards')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (options.sent !== undefined) {
        query = query.eq('is_sent', options.sent);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.offset) {
        query = query.range(options.offset, (options.offset + (options.limit || 10)) - 1);
      }

      const { data, error } = await query;

      if (error) {
        return { cards: [], error };
      }

      const cards = data.map(dbCard => this.dbCardToCard(dbCard));
      return { cards, error: null };
    } catch (error) {
      return { cards: [], error };
    }
  }

  async getCard(cardId: string): Promise<{ card: Card | null; error: any }> {
    if (!supabase) {
      return { card: null, error: new Error('Supabase not available - using local database') };
    }

    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        return { card: null, error: new Error('User not authenticated') };
      }

      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('id', cardId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return { card: null, error: new Error('Card not found') };
        }
        return { card: null, error };
      }

      return { card: this.dbCardToCard(data), error: null };
    } catch (error) {
      return { card: null, error };
    }
  }

  async updateCard(cardId: string, updates: Partial<CardData>): Promise<{ card: Card | null; error: any }> {
    if (!supabase) {
      return { card: null, error: new Error('Supabase not available - using local database') };
    }

    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        return { card: null, error: new Error('User not authenticated') };
      }

      const dbUpdates: DbCardUpdate = {
        updated_at: new Date().toISOString(),
      };

      // Map the updates to database format
      if (updates.cardType) dbUpdates.card_type = updates.cardType;
      if (updates.recipientName) dbUpdates.recipient_name = updates.recipientName;
      if (updates.recipientEmail) dbUpdates.recipient_email = updates.recipientEmail;
      if (updates.senderName) dbUpdates.sender_name = updates.senderName;
      if (updates.message) dbUpdates.message = updates.message;
      if (updates.backgroundColor) dbUpdates.background_color = updates.backgroundColor;
      if (updates.textColor) dbUpdates.text_color = updates.textColor;
      if (updates.borderColor) dbUpdates.border_color = updates.borderColor;
      if (updates.fontFamily) dbUpdates.font_family = updates.fontFamily;
      if (updates.fontSize) dbUpdates.font_size = updates.fontSize;
      if (updates.pattern) dbUpdates.pattern = updates.pattern;
      if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl || null;

      const { data, error } = await supabase
        .from('cards')
        .update(dbUpdates)
        .eq('id', cardId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        return { card: null, error };
      }

      return { card: this.dbCardToCard(data), error: null };
    } catch (error) {
      return { card: null, error };
    }
  }

  async deleteCard(cardId: string): Promise<{ error: any }> {
    if (!supabase) {
      return { error: new Error('Supabase not available - using local database') };
    }

    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        return { error: new Error('User not authenticated') };
      }

      const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', cardId)
        .eq('user_id', user.id);

      return { error };
    } catch (error) {
      return { error };
    }
  }

  async markCardAsSent(cardId: string): Promise<{ card: Card | null; error: any }> {
    if (!supabase) {
      return { card: null, error: new Error('Supabase not available - using local database') };
    }

    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        return { card: null, error: new Error('User not authenticated') };
      }

      const { data, error } = await supabase
        .from('cards')
        .update({
          is_sent: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', cardId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        return { card: null, error };
      }

      return { card: this.dbCardToCard(data), error: null };
    } catch (error) {
      return { card: null, error };
    }
  }

  async getDraftCards(): Promise<{ cards: Card[]; error: any }> {
    return this.getUserCards({ sent: false });
  }

  async getSentCards(): Promise<{ cards: Card[]; error: any }> {
    return this.getUserCards({ sent: true });
  }

  async getCardsByType(cardType: CardType): Promise<{ cards: Card[]; error: any }> {
    if (!supabase) {
      return { cards: [], error: new Error('Supabase not available - using local database') };
    }

    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        return { cards: [], error: new Error('User not authenticated') };
      }

      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('user_id', user.id)
        .eq('card_type', cardType)
        .order('created_at', { ascending: false });

      if (error) {
        return { cards: [], error };
      }

      const cards = data.map(dbCard => this.dbCardToCard(dbCard));
      return { cards, error: null };
    } catch (error) {
      return { cards: [], error };
    }
  }
}

// Export singleton instance
export const cardService = CardService.getInstance();
