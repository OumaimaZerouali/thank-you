export interface Card {
  id: string;
  cardType: CardType;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  message: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  fontFamily: string;
  fontSize: string;
  pattern: PatternType;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  isSent: boolean;
}

export type CardType =
  | 'thank-you'
  | 'birthday'
  | 'congratulations'
  | 'get-well'
  | 'holiday'
  | 'custom';

export type PatternType =
  | 'none'
  | 'dots'
  | 'stripes'
  | 'hearts'
  | 'stars'
  | 'flowers';

export interface CardStyle {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  fontFamily: string;
  fontSize: string;
  pattern: PatternType;
}

export type CardData = Omit<Card, 'id' | 'createdAt' | 'updatedAt' | 'isSent'>;
