import type { Card } from './card';

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  cardData: Card;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type { Card, CardType, PatternType, CardStyle, CardData } from './card';
