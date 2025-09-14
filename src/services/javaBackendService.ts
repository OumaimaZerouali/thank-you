import axios, { AxiosInstance } from 'axios';
import { environment } from '../config/environment';
import { Card, CardData, CardType } from '../types/card';

// Backend API interfaces matching the Java DTOs
interface BackendAuthResponse {
  token: string;
  type: string;
  userId: string;
  email: string;
  fullName: string;
  expiresAt: string;
}

interface BackendCard {
  id: string;
  user: any;
  cardType: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  message: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  fontFamily: string;
  fontSize: string;
  pattern: string;
  imageUrl?: string;
  isSent: boolean;
  createdAt: string;
  updatedAt: string;
}

class JavaBackendService {
  private static instance: JavaBackendService;
  private apiClient: AxiosInstance;
  private authToken: string | null = null;

  private constructor() {
    this.apiClient = axios.create({
      baseURL: environment.apiUrl, // http://localhost:8080/api
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load token from localStorage
    this.loadToken();

    // Request interceptor to add auth token
    this.apiClient.interceptors.request.use(
      (config) => {
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          window.location.href = '/'; // Redirect to login
        }
        return Promise.reject(error);
      }
    );
  }

  static getInstance(): JavaBackendService {
    if (!JavaBackendService.instance) {
      JavaBackendService.instance = new JavaBackendService();
    }
    return JavaBackendService.instance;
  }

  private loadToken(): void {
    this.authToken = localStorage.getItem('auth_token');
  }

  private saveToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('auth_token', token);
  }

  private clearToken(): void {
    this.authToken = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  // Convert backend card to frontend format
  private backendCardToCard(backendCard: BackendCard): Card {
    return {
      id: backendCard.id,
      cardType: backendCard.cardType as CardType,
      recipientName: backendCard.recipientName,
      recipientEmail: backendCard.recipientEmail,
      senderName: backendCard.senderName,
      message: backendCard.message,
      backgroundColor: backendCard.backgroundColor,
      textColor: backendCard.textColor,
      borderColor: backendCard.borderColor,
      fontFamily: backendCard.fontFamily,
      fontSize: backendCard.fontSize,
      pattern: backendCard.pattern as any,
      imageUrl: backendCard.imageUrl,
      createdAt: new Date(backendCard.createdAt),
      updatedAt: new Date(backendCard.updatedAt),
      isSent: backendCard.isSent,
    };
  }

  // Authentication methods
  async signUp(email: string, password: string, fullName?: string): Promise<{ user: any | null; error: any }> {
    try {
      const response = await this.apiClient.post<BackendAuthResponse>('/auth/signup', {
        email,
        password,
        fullName,
      });

      const authData = response.data;
      this.saveToken(authData.token);

      const user = {
        id: authData.userId,
        email: authData.email,
        created_at: new Date().toISOString(),
        user_metadata: { full_name: authData.fullName },
      };

      localStorage.setItem('user_data', JSON.stringify(user));

      return { user, error: null };
    } catch (error: any) {
      return {
        user: null,
        error: { message: error.response?.data?.message || 'Sign up failed' }
      };
    }
  }

  async signIn(email: string, password: string): Promise<{ user: any | null; error: any }> {
    try {
      const response = await this.apiClient.post<BackendAuthResponse>('/auth/signin', {
        email,
        password,
      });

      const authData = response.data;
      this.saveToken(authData.token);

      const user = {
        id: authData.userId,
        email: authData.email,
        created_at: new Date().toISOString(),
        user_metadata: { full_name: authData.fullName },
      };

      localStorage.setItem('user_data', JSON.stringify(user));

      return { user, error: null };
    } catch (error: any) {
      return {
        user: null,
        error: { message: error.response?.data?.message || 'Sign in failed' }
      };
    }
  }

  async signOut(): Promise<{ error: any }> {
    this.clearToken();
    return { error: null };
  }

  getCurrentUser(): any | null {
    if (!this.authToken) return null;

    try {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.authToken !== null;
  }

  // Card methods
  async createCard(cardData: CardData): Promise<{ card: Card | null; error: any }> {
    try {
      const response = await this.apiClient.post<BackendCard>('/cards', {
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
      });

      const card = this.backendCardToCard(response.data);
      return { card, error: null };
    } catch (error: any) {
      return {
        card: null,
        error: { message: error.response?.data?.message || 'Failed to create card' }
      };
    }
  }

  async getUserCards(options: {
    sent?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ cards: Card[]; error: any }> {
    try {
      const params: any = {};
      if (options.sent !== undefined) params.sent = options.sent;
      if (options.limit) params.size = options.limit;
      if (options.offset) params.page = Math.floor(options.offset / (options.limit || 10));

      const response = await this.apiClient.get<{ cards: BackendCard[]; total: number }>('/cards', {
        params,
      });

      const cards = response.data.cards.map(card => this.backendCardToCard(card));
      return { cards, error: null };
    } catch (error: any) {
      return {
        cards: [],
        error: { message: error.response?.data?.message || 'Failed to fetch cards' }
      };
    }
  }

  async getCard(cardId: string): Promise<{ card: Card | null; error: any }> {
    try {
      const response = await this.apiClient.get<BackendCard>(`/cards/${cardId}`);
      const card = this.backendCardToCard(response.data);
      return { card, error: null };
    } catch (error: any) {
      return {
        card: null,
        error: { message: error.response?.data?.message || 'Card not found' }
      };
    }
  }

  async updateCard(cardId: string, updates: Partial<CardData>): Promise<{ card: Card | null; error: any }> {
    try {
      const response = await this.apiClient.put<BackendCard>(`/cards/${cardId}`, updates);
      const card = this.backendCardToCard(response.data);
      return { card, error: null };
    } catch (error: any) {
      return {
        card: null,
        error: { message: error.response?.data?.message || 'Failed to update card' }
      };
    }
  }

  async deleteCard(cardId: string): Promise<{ error: any }> {
    try {
      await this.apiClient.delete(`/cards/${cardId}`);
      return { error: null };
    } catch (error: any) {
      return {
        error: { message: error.response?.data?.message || 'Failed to delete card' }
      };
    }
  }

  async markCardAsSent(cardId: string): Promise<{ card: Card | null; error: any }> {
    try {
      const response = await this.apiClient.patch<BackendCard>(`/cards/${cardId}/send`);
      const card = this.backendCardToCard(response.data);
      return { card, error: null };
    } catch (error: any) {
      return {
        card: null,
        error: { message: error.response?.data?.message || 'Failed to mark card as sent' }
      };
    }
  }

  async getCardsByType(cardType: CardType): Promise<{ cards: Card[]; error: any }> {
    try {
      const response = await this.apiClient.get<{ cards: BackendCard[]; total: number }>(`/cards/type/${cardType}`);
      const cards = response.data.cards.map(card => this.backendCardToCard(card));
      return { cards, error: null };
    } catch (error: any) {
      return {
        cards: [],
        error: { message: error.response?.data?.message || 'Failed to fetch cards by type' }
      };
    }
  }

  async getDraftCards(): Promise<{ cards: Card[]; error: any }> {
    try {
      const response = await this.apiClient.get<{ cards: BackendCard[]; total: number }>('/cards/drafts');
      const cards = response.data.cards.map(card => this.backendCardToCard(card));
      return { cards, error: null };
    } catch (error: any) {
      return {
        cards: [],
        error: { message: error.response?.data?.message || 'Failed to fetch draft cards' }
      };
    }
  }

  async getSentCards(): Promise<{ cards: Card[]; error: any }> {
    try {
      const response = await this.apiClient.get<{ cards: BackendCard[]; total: number }>('/cards/sent');
      const cards = response.data.cards.map(card => this.backendCardToCard(card));
      return { cards, error: null };
    } catch (error: any) {
      return {
        cards: [],
        error: { message: error.response?.data?.message || 'Failed to fetch sent cards' }
      };
    }
  }

  async getUserProfile(userId: string): Promise<any> {
    // For now, return the stored user data
    return this.getCurrentUser();
  }

  async updateUserProfile(userId: string, updates: any): Promise<{ error: any }> {
    // This would need to be implemented in the backend
    return { error: null };
  }
}

// Export singleton instance
export const javaBackendService = JavaBackendService.getInstance();
