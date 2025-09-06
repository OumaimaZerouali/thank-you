import axios, { AxiosInstance, AxiosError } from 'axios';
import { environment } from '../config/environment';
import { Card, EmailData, EmailResponse, NetworkError, ServiceError } from '../types';

interface CardsResponse {
  success: boolean;
  data: Card[];
  total: number;
}

interface CardResponse {
  success: boolean;
  data: Card;
  message?: string;
}

interface SendCardResponse {
  success: boolean;
  data: {
    messageId: string;
    sentAt: string;
  };
  message: string;
}

interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
}

export class ApiClient {
  private readonly client: AxiosInstance;
  private readonly baseURL: string;

  constructor() {
    this.baseURL = environment.apiUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        if (environment.logging.enableConsoleLogging) {
          console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => {
        if (environment.logging.enableConsoleLogging) {
          console.log(`[API] Response: ${response.status} ${response.statusText}`);
        }
        return response;
      },
      (error) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  async getCards(options: {
    sent?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<Card[]> {
    try {
      const params = new URLSearchParams();
      if (options.sent !== undefined) params.append('sent', String(options.sent));
      if (options.limit) params.append('limit', String(options.limit));
      if (options.offset) params.append('offset', String(options.offset));

      const response = await this.client.get<CardsResponse>(`/cards?${params}`);
      return response.data.data;
    } catch (error) {
      throw this.createServiceError('Failed to fetch cards', error);
    }
  }

  async getCard(cardId: string): Promise<Card | null> {
    try {
      const response = await this.client.get<CardResponse>(`/cards/${cardId}`);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw this.createServiceError(`Failed to fetch card with ID: ${cardId}`, error);
    }
  }

  async createCard(cardData: Omit<CardData, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card> {
    try {
      const response = await this.client.post<CardResponse>('/cards', cardData);
      return response.data.data;
    } catch (error) {
      throw this.createServiceError('Failed to create card', error);
    }
  }

  async updateCard(cardId: string, updates: Partial<CardData>): Promise<Card> {
    try {
      const response = await this.client.put<CardResponse>(`/cards/${cardId}`, updates);
      return response.data.data;
    } catch (error) {
      throw this.createServiceError(`Failed to update card with ID: ${cardId}`, error);
    }
  }

  async deleteCard(cardId: string): Promise<void> {
    try {
      await this.client.delete(`/cards/${cardId}`);
    } catch (error) {
      throw this.createServiceError(`Failed to delete card with ID: ${cardId}`, error);
    }
  }

  async sendCard(cardId: string): Promise<{ messageId: string; sentAt: string }> {
    try {
      const response = await this.client.post<SendCardResponse>(`/cards/${cardId}/send`);
      return response.data.data;
    } catch (error) {
      throw this.createServiceError(`Failed to send card with ID: ${cardId}`, error);
    }
  }

  async sendEmail(emailData: EmailData): Promise<EmailResponse> {
    try {
      const response = await this.client.post<EmailResponse>('/email/send', emailData);
      return response.data;
    } catch (error) {
      throw this.createServiceError('Failed to send email', error);
    }
  }

  async healthCheck(): Promise<HealthResponse> {
    try {
      const response = await this.client.get<HealthResponse>('/health');
      return response.data;
    } catch (error) {
      throw this.createServiceError('Health check failed', error);
    }
  }

  async getSentCards(): Promise<Card[]> {
    return this.getCards({ sent: true });
  }

  async getDraftCards(): Promise<Card[]> {
    return this.getCards({ sent: false });
  }

  private handleError(error: AxiosError): void {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.statusText;

      if (environment.logging.enableConsoleLogging) {
        console.error(`[API Error] ${status}: ${message}`, error.response.data);
      }

      switch (status) {
        case 400:
          throw new NetworkError(`Bad Request: ${message}`, status);
        case 401:
          throw new NetworkError('Unauthorized: Please check your authentication', status);
        case 403:
          throw new NetworkError('Forbidden: You do not have permission to access this resource', status);
        case 404:
          throw new NetworkError('Not Found: The requested resource was not found', status);
        case 422:
          throw new NetworkError('Validation Error: Please check your input', status);
        case 429:
          throw new NetworkError('Too Many Requests: Please try again later', status);
        case 500:
          throw new NetworkError('Internal Server Error: Please try again later', status);
        default:
          throw new NetworkError(`HTTP Error: ${message}`, status);
      }
    } else if (error.request) {
      throw new NetworkError('Network Error: Unable to reach the server');
    } else {
      throw new NetworkError(`Request Error: ${error.message}`);
    }
  }

  private createServiceError(message: string, error: unknown): ServiceError {
    if (error instanceof NetworkError) {
      throw error;
    }
    return new ServiceError('ApiClient', message);
  }
}

export const apiClient = new ApiClient();
