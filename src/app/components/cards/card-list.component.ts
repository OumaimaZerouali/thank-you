import {Component, inject} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  private readonly fb: FirebaseService = inject(FirebaseService);

  cards$ = this.fb.getCards();

  getCardEmoji(cardType: string): string {
    const cardTypes: { [key: string]: string } = {
      'thank-you': '💝',
      'payment-request': '💰',
      'condolence': '🕊️',
      'baby': '👶',
      'wedding': '💒',
      'birthday': '🎂',
      'get-well': '🌸',
      'apology': '🙏'
    };
    return cardTypes[cardType || 'thank-you'] || '💌';
  }

  getCardTypeName(cardType: string): string {
    const cardTypes: { [key: string]: string } = {
      'thank-you': 'Thank You Card',
      'payment-request': 'Payment Request',
      'condolence': 'Condolence Card',
      'baby': 'Baby Congratulations',
      'wedding': 'Wedding Congratulations',
      'birthday': 'Birthday Wishes',
      'get-well': 'Get Well Soon',
      'apology': 'Apology Card'
    };
    return cardTypes[cardType || 'thank-you'] || 'Card';
  }

  getCardSignature(cardType: string): string {
    const signatures: { [key: string]: string } = {
      'thank-you': 'With gratitude,',
      'payment-request': 'Best regards,',
      'condolence': 'With sympathy,',
      'baby': 'With love,',
      'wedding': 'With best wishes,',
      'birthday': 'Happy Birthday from,',
      'get-well': 'Get well soon from,',
      'apology': 'Sincerely,'
    };
    return signatures[cardType || 'thank-you'] || 'With gratitude,';
  }
}
