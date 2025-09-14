import { v4 as uuidv4 } from 'uuid';
import { Card, CardData, CardType, PatternType } from '../types/card';
import { browserLocalAuthService } from './browserLocalAuthService';

class BrowserLocalCardService {
  private static instance: BrowserLocalCardService;
  private cardsKey = 'thankyou_local_cards';

  private constructor() {}

  static getInstance(): BrowserLocalCardService {
    if (!BrowserLocalCardService.instance) {
      BrowserLocalCardService.instance = new BrowserLocalCardService();
    }
    return BrowserLocalCardService.instance;
  }

  // Get stored cards from localStorage
  private getStoredCards(): Card[] {
    try {
      const stored = localStorage.getItem(this.cardsKey);
      const cards = stored ? JSON.parse(stored) : [];
      // Convert date strings back to Date objects
      return cards.map((card: any) => ({
        ...card,
        createdAt: new Date(card.createdAt),
        updatedAt: new Date(card.updatedAt),
      }));
    } catch (error) {
      console.error('Error loading cards:', error);
      return [];
    }
  }

  // Save cards to localStorage
  private saveStoredCards(cards: Card[]): void {
    try {
      localStorage.setItem(this.cardsKey, JSON.stringify(cards));
    } catch (error) {
      console.error('Error saving cards:', error);
    }
  }

  // Create a new card
  async createCard(userId: string, cardData: CardData): Promise<{ card: Card | null; error: any }> {
    try {
      const cardId = uuidv4();
      const now = new Date();

      const newCard: Card = {
        id: cardId,
        cardType: cardData.cardType,
        recipientName: cardData.recipientName,
        recipientEmail: cardData.recipientEmail,
        senderName: cardData.senderName,
        message: cardData.message,
        backgroundColor: cardData.backgroundColor,
        textColor: cardData.textColor,
        borderColor: cardData.borderColor,
        fontFamily: cardData.fontFamily,
        fontSize: cardData.fontSize,
        pattern: cardData.pattern,
        imageUrl: cardData.imageUrl,
        createdAt: now,
        updatedAt: now,
        isSent: false,
      };

      // Add user ID as a property (stored separately from the Card interface for filtering)
      const cardWithUserId = { ...newCard, userId };

      const cards = this.getStoredCards();
      const updatedCards = [cardWithUserId, ...cards];
      this.saveStoredCards(updatedCards);

      return { card: newCard, error: null };
    } catch (error) {
      return { card: null, error };
    }
  }

  // Get cards for a specific user
  async getUserCards(userId: string, options: {
    sent?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ cards: Card[]; error: any }> {
    try {
      let cards = this.getStoredCards();

      // Filter by user ID
      cards = cards.filter((card: any) => card.userId === userId);

      // Filter by sent status if specified
      if (options.sent !== undefined) {
        cards = cards.filter(card => card.isSent === options.sent);
      }

      // Sort by creation date (newest first)
      cards.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      // Apply pagination
      if (options.offset) {
        cards = cards.slice(options.offset);
      }
      if (options.limit) {
        cards = cards.slice(0, options.limit);
      }

      // Remove userId from returned cards
      const cleanCards = cards.map(({ userId: _, ...card }) => card);

      return { cards: cleanCards, error: null };
    } catch (error) {
      return { cards: [], error };
    }
  }

  // Get a specific card
  async getCard(userId: string, cardId: string): Promise<{ card: Card | null; error: any }> {
    try {
      const cards = this.getStoredCards();
      const card = cards.find((c: any) => c.id === cardId && c.userId === userId);

      if (!card) {
        return { card: null, error: new Error('Card not found') };
      }

      // Remove userId from returned card
      const { userId: _, ...cleanCard } = card as any;
      return { card: cleanCard, error: null };
    } catch (error) {
      return { card: null, error };
    }
  }

  // Update a card
  async updateCard(userId: string, cardId: string, updates: Partial<CardData>): Promise<{ card: Card | null; error: any }> {
    try {
      const cards = this.getStoredCards();
      const cardIndex = cards.findIndex((c: any) => c.id === cardId && c.userId === userId);

      if (cardIndex === -1) {
        return { card: null, error: new Error('Card not found or not authorized') };
      }

      // Update the card
      const updatedCard = {
        ...cards[cardIndex],
        ...updates,
        updatedAt: new Date(),
      };

      cards[cardIndex] = updatedCard;
      this.saveStoredCards(cards);

      // Remove userId from returned card
      const { userId: _, ...cleanCard } = updatedCard as any;
      return { card: cleanCard, error: null };
    } catch (error) {
      return { card: null, error };
    }
  }

  // Delete a card
  async deleteCard(userId: string, cardId: string): Promise<{ error: any }> {
    try {
      const cards = this.getStoredCards();
      const filteredCards = cards.filter((c: any) => !(c.id === cardId && c.userId === userId));

      if (filteredCards.length === cards.length) {
        return { error: new Error('Card not found or not authorized') };
      }

      this.saveStoredCards(filteredCards);
      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  // Mark a card as sent
  async markCardAsSent(userId: string, cardId: string): Promise<{ card: Card | null; error: any }> {
    try {
      const cards = this.getStoredCards();
      const cardIndex = cards.findIndex((c: any) => c.id === cardId && c.userId === userId);

      if (cardIndex === -1) {
        return { card: null, error: new Error('Card not found or not authorized') };
      }

      // Mark as sent
      const updatedCard = {
        ...cards[cardIndex],
        isSent: true,
        updatedAt: new Date(),
      };

      cards[cardIndex] = updatedCard;
      this.saveStoredCards(cards);

      // Remove userId from returned card
      const { userId: _, ...cleanCard } = updatedCard as any;
      return { card: cleanCard, error: null };
    } catch (error) {
      return { card: null, error };
    }
  }

  // Get cards by type
  async getCardsByType(userId: string, cardType: CardType): Promise<{ cards: Card[]; error: any }> {
    try {
      const { cards, error } = await this.getUserCards(userId);
      if (error) return { cards: [], error };

      const filteredCards = cards.filter(card => card.cardType === cardType);
      return { cards: filteredCards, error: null };
    } catch (error) {
      return { cards: [], error };
    }
  }
}

// Export singleton instance
export const browserLocalCardService = BrowserLocalCardService.getInstance();
