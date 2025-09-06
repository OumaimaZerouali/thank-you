import {CardData, ValidationErrorClass } from '../types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateCardData = (cardData: Partial<CardData>): void => {
  if (!cardData.recipientName?.trim()) {
    throw new ValidationErrorClass('recipientName', 'Recipient name is required');
  }

  if (!cardData.recipientEmail?.trim()) {
    throw new ValidationErrorClass('recipientEmail', 'Recipient email is required');
  }

  if (!validateEmail(cardData.recipientEmail)) {
    throw new ValidationErrorClass('recipientEmail', 'Please enter a valid email address');
  }

  if (!cardData.senderName?.trim()) {
    throw new ValidationErrorClass('senderName', 'Sender name is required');
  }

  if (!cardData.message?.trim()) {
    throw new ValidationErrorClass('message', 'Message is required');
  }

  if (cardData.message.length > 1000) {
    throw new ValidationErrorClass('message', 'Message must be less than 1000 characters');
  }
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const generateCardId = (): string => {
  return `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
