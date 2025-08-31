import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  cardData?: any;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  sendCard(emailData: EmailData): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-card`, emailData);
  }

  generateCardEmailHTML(cardData: any): string {
    // Simple text escaping
    const clean = (text: string) => text ? text.replace(/[<>&"']/g, '') : '';

    const recipientName = clean(cardData.recipientName || 'Friend');
    const senderName = clean(cardData.senderName || 'Someone');
    const message = clean(cardData.message || 'Thank you!');

    // Get card type specific information
    const cardTypeInfo = this.getCardTypeInfo(cardData.cardType);

    // Ultra-simple HTML for maximum compatibility
    return `<html lang="en">
<body style="font-family:Arial,sans-serif;padding:20px;background:#f5f5f5">
<div style="max-width:500px;margin:0 auto;background:white;padding:30px;border-radius:10px">
<h1 style="color:#4a90e2;text-align:center">${cardTypeInfo.emoji} ${cardTypeInfo.emailTitle}</h1>
<div style="background:${cardData.backgroundColor || '#fff'};color:${cardData.textColor || '#333'};padding:25px;border:2px solid ${cardData.borderColor || '#ccc'};border-radius:8px;margin:20px 0">
<p><strong>Dear ${recipientName},</strong></p>
<p style="margin:15px 0;padding:15px;background:#f9f9f9;border-left:3px solid #4a90e2">${message}</p>
<p style="text-align:right"><em>${cardTypeInfo.signature}<br>${senderName}</em></p>
</div>
<p style="text-align:center;color:#666;font-size:12px">Sent via Thank You Cards Platform</p>
</div>
</body>
</html>`;
  }

  private getCardTypeInfo(cardType: string): { emoji: string; emailTitle: string; signature: string } {
    const cardTypes: { [key: string]: { emoji: string; emailTitle: string; signature: string } } = {
      'thank-you': {
        emoji: '💝',
        emailTitle: 'You\'ve Received a Thank You Card!',
        signature: 'With gratitude,'
      },
      'payment-request': {
        emoji: '💰',
        emailTitle: 'Payment Request Card',
        signature: 'Best regards,'
      },
      'condolence': {
        emoji: '🕊️',
        emailTitle: 'Condolence Card',
        signature: 'With sympathy,'
      },
      'baby': {
        emoji: '👶',
        emailTitle: 'Baby Congratulations Card!',
        signature: 'With love,'
      },
      'wedding': {
        emoji: '💒',
        emailTitle: 'Wedding Congratulations Card!',
        signature: 'With best wishes,'
      },
      'birthday': {
        emoji: '🎂',
        emailTitle: 'Birthday Wishes Card!',
        signature: 'Happy Birthday from,'
      },
      'get-well': {
        emoji: '🌸',
        emailTitle: 'Get Well Soon Card',
        signature: 'Get well soon from,'
      },
      'apology': {
        emoji: '🙏',
        emailTitle: 'Apology Card',
        signature: 'Sincerely,'
      }
    };

    return cardTypes[cardType] || cardTypes['thank-you'];
  }
}
