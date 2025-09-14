import { useState, useEffect } from 'react';
import { Card, CardData, CardType } from '../types/card';
import { unifiedCardService } from '../services/unifiedCardService';
import { useAuth } from './useAuth';

export const useCards = (options: {
  sent?: boolean;
  limit?: number;
  offset?: number;
} = {}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchCards = async () => {
    if (!user) {
      setCards([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { cards: fetchedCards, error: fetchError } = await unifiedCardService.getUserCards(options);

      if (fetchError) {
        setError(fetchError.message || 'Failed to fetch cards');
      } else {
        setCards(fetchedCards);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [user, options.sent, options.limit, options.offset]);

  const createCard = async (cardData: CardData) => {
    try {
      const { card, error } = await unifiedCardService.createCard(cardData);

      if (error) {
        return { card: null, error: error.message || 'Failed to create card' };
      }

      if (card) {
        setCards(prev => [card, ...prev]);
      }

      return { card, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create card';
      return { card: null, error: errorMessage };
    }
  };

  const updateCard = async (cardId: string, updates: Partial<CardData>) => {
    try {
      const { card, error } = await unifiedCardService.updateCard(cardId, updates);

      if (error) {
        return { card: null, error: error.message || 'Failed to update card' };
      }

      if (card) {
        setCards(prev => prev.map(c => c.id === cardId ? card : c));
      }

      return { card, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update card';
      return { card: null, error: errorMessage };
    }
  };

  const deleteCard = async (cardId: string) => {
    try {
      const { error } = await unifiedCardService.deleteCard(cardId);

      if (error) {
        return { error: error.message || 'Failed to delete card' };
      }

      setCards(prev => prev.filter(c => c.id !== cardId));
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete card';
      return { error: errorMessage };
    }
  };

  const markAsSent = async (cardId: string) => {
    try {
      const { card, error } = await unifiedCardService.markCardAsSent(cardId);

      if (error) {
        return { card: null, error: error.message || 'Failed to mark card as sent' };
      }

      if (card) {
        setCards(prev => prev.map(c => c.id === cardId ? card : c));
      }

      return { card, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mark card as sent';
      return { card: null, error: errorMessage };
    }
  };

  return {
    cards,
    loading,
    error,
    fetchCards,
    createCard,
    updateCard,
    deleteCard,
    markAsSent,
  };
};

export const useCard = (cardId?: string) => {
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!cardId || !user) {
      setCard(null);
      setLoading(false);
      return;
    }

    const fetchCard = async () => {
      try {
        setLoading(true);
        setError(null);
        const { card: fetchedCard, error: fetchError } = await unifiedCardService.getCard(cardId);

        if (fetchError) {
          setError(fetchError.message || 'Failed to fetch card');
        } else {
          setCard(fetchedCard);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch card');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [cardId, user]);

  return { card, loading, error };
};

export const useCardsByType = (cardType: CardType) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setCards([]);
      setLoading(false);
      return;
    }

    const fetchCards = async () => {
      try {
        setLoading(true);
        setError(null);
        const { cards: fetchedCards, error: fetchError } = await unifiedCardService.getCardsByType(cardType);

        if (fetchError) {
          setError(fetchError.message || 'Failed to fetch cards');
        } else {
          setCards(fetchedCards);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cards');
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [cardType, user]);

  return { cards, loading, error };
};
