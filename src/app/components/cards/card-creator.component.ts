import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Card, FirebaseService} from '../../services/firebase.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-card-creator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-creator.component.html',
  styleUrls: ['./card-creator.component.scss']
})
export class CardCreatorComponent {
  saving = false;
  sending = false;
  recipientEmail = '';
  currentStep: 1 | 2 | 3 = 1;

  cardData: Card = {
    recipientName: '',
    message: '',
    senderName: '',
    cardType: 'thank-you',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    fontFamily: 'Arial',
    fontSize: '16px',
    cardStyle: 'classic',
    borderColor: '#cccccc',
    pattern: 'none'
  };

  cardTypes = [
    {
      name: 'Thank You Card',
      value: 'thank-you',
      defaultMessage: 'Thank you so much for everything you\'ve done!',
      defaultColors: { bg: '#ffffff', text: '#333333', border: '#cccccc' }
    },
    {
      name: 'Payment Request',
      value: 'payment-request',
      defaultMessage: 'I hope this message finds you well. I wanted to kindly remind you about the outstanding payment.',
      defaultColors: { bg: '#fff9c4', text: '#8b7d00', border: '#ffc107' }
    },
    {
      name: 'Condolence Card',
      value: 'condolence',
      defaultMessage: 'My deepest condolences during this difficult time. You and your family are in my thoughts.',
      defaultColors: { bg: '#f5f5f5', text: '#444444', border: '#999999' }
    },
    {
      name: 'Baby Congratulations',
      value: 'baby',
      defaultMessage: 'Congratulations on your beautiful new addition! Wishing you all the joy and happiness.',
      defaultColors: { bg: '#fce4ec', text: '#880e4f', border: '#e91e63' }
    },
    {
      name: 'Wedding Congratulations',
      value: 'wedding',
      defaultMessage: 'Congratulations on your special day! Wishing you a lifetime of love and happiness together.',
      defaultColors: { bg: '#fff', text: '#333', border: '#daa520' }
    },
    {
      name: 'Birthday Wishes',
      value: 'birthday',
      defaultMessage: 'Happy Birthday! Hope your special day is filled with happiness and all your favorite things.',
      defaultColors: { bg: '#e3f2fd', text: '#1565c0', border: '#2196f3' }
    },
    {
      name: 'Get Well Soon',
      value: 'get-well',
      defaultMessage: 'Sending you healing thoughts and warm wishes for a speedy recovery.',
      defaultColors: { bg: '#e8f5e8', text: '#2e7d32', border: '#4caf50' }
    },
    {
      name: 'Apology Card',
      value: 'apology',
      defaultMessage: 'I sincerely apologize for my actions. I hope you can find it in your heart to forgive me.',
      defaultColors: { bg: '#fff3e0', text: '#e65100', border: '#ff9800' }
    }
  ];

  backgroundColors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Light Blue', value: '#e3f2fd' },
    { name: 'Light Pink', value: '#fce4ec' },
    { name: 'Light Green', value: '#e8f5e8' },
    { name: 'Light Yellow', value: '#fff9c4' },
    { name: 'Light Purple', value: '#f3e5f5' }
  ];

  textColors = [
    { name: 'Dark Gray', value: '#333333' },
    { name: 'Black', value: '#000000' },
    { name: 'Navy Blue', value: '#1a237e' },
    { name: 'Dark Red', value: '#b71c1c' },
    { name: 'Dark Green', value: '#1b5e20' }
  ];

  fontFamilies = [
    { name: 'Arial', value: 'Arial' },
    { name: 'Georgia', value: 'Georgia' },
    { name: 'Times New Roman', value: 'Times New Roman' },
    { name: 'Helvetica', value: 'Helvetica' },
    { name: 'Verdana', value: 'Verdana' }
  ];

  fontSizes = [
    { name: 'Small', value: '14px' },
    { name: 'Medium', value: '16px' },
    { name: 'Large', value: '18px' },
    { name: 'Extra Large', value: '20px' }
  ];

  cardStyles = [
    { name: 'Classic', value: 'classic' },
    { name: 'Modern', value: 'modern' },
    { name: 'Elegant', value: 'elegant' },
    { name: 'Casual', value: 'casual' }
  ];

  patterns = [
    { name: 'None', value: 'none' },
    { name: 'Dots', value: 'dots' },
    { name: 'Stripes', value: 'stripes' },
    { name: 'Hearts', value: 'hearts' }
  ];

  private readonly fb: FirebaseService = inject(FirebaseService);
  private readonly emailService: EmailService = inject(EmailService);

  onCardTypeChange() {
    const selectedType = this.cardTypes.find(type => type.value === this.cardData.cardType);
    if (selectedType) {
      if (!this.cardData.message || this.isDefaultMessage()) {
        this.cardData.message = selectedType.defaultMessage;
      }
      this.cardData.backgroundColor = selectedType.defaultColors.bg;
      this.cardData.textColor = selectedType.defaultColors.text;
      this.cardData.borderColor = selectedType.defaultColors.border;
    }
  }

  private isDefaultMessage(): boolean {
    return this.cardTypes.some(type => type.defaultMessage === this.cardData.message);
  }

  getCardTypeName(): string {
    const selectedType = this.cardTypes.find(type => type.value === this.cardData.cardType);
    return selectedType ? selectedType.name : 'Card';
  }

  setStep(step: 1 | 2 | 3) {
    this.currentStep = step;
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  async createCard() {
    if (!this.cardData.recipientName || !this.cardData.senderName || !this.cardData.message) return;

    this.saving = true;
    try {
      await this.fb.addCard(this.cardData);
      this.cardData = {
        recipientName: '',
        message: '',
        senderName: '',
        cardType: 'thank-you',
        backgroundColor: '#ffffff',
        textColor: '#333333',
        fontFamily: 'Arial',
        fontSize: '16px',
        cardStyle: 'classic',
        borderColor: '#cccccc',
        pattern: 'none'
      };
      this.recipientEmail = '';
      alert('Card created successfully!');
      this.currentStep = 1; // Reset to first step
    } catch (err) {
      console.error(err);
      alert('Error creating card');
    } finally {
      this.saving = false;
    }
  }

  async sendCard() {
    if (!this.cardData.recipientName || !this.cardData.senderName || !this.cardData.message || !this.recipientEmail) {
      alert('Please fill in all fields including recipient email');
      return;
    }

    this.sending = true;
    try {
      const emailHTML = this.emailService.generateCardEmailHTML(this.cardData);

      const cardTypeName = this.getCardTypeName();
      const subject = `${cardTypeName} from ${this.cardData.senderName}`;

      const emailData = {
        to: this.recipientEmail,
        subject: subject,
        html: emailHTML,
        cardData: this.cardData
      };

      const response = await this.emailService.sendCard(emailData).toPromise();

      await this.fb.addCard(this.cardData);

      this.cardData = {
        recipientName: '',
        message: '',
        senderName: '',
        cardType: 'thank-you',
        backgroundColor: '#ffffff',
        textColor: '#333333',
        fontFamily: 'Arial',
        fontSize: '16px',
        cardStyle: 'classic',
        borderColor: '#cccccc',
        pattern: 'none'
      };
      this.recipientEmail = '';

      alert(`Card sent successfully! Check MailHog at http://localhost:8025 to see the email.`);
      this.currentStep = 1; // Reset to first step
    } catch (err) {
      console.error('Error sending card:', err);
      alert('Error sending card. Make sure the email server is running.');
    } finally {
      this.sending = false;
    }
  }

  async createAndSend() {
    if (!this.cardData.recipientName || !this.cardData.senderName || !this.cardData.message || !this.recipientEmail) {
      alert('Please fill in all fields including recipient email');
      return;
    }

    this.saving = true;
    this.sending = true;

    try {
      await this.fb.addCard(this.cardData);

      const emailHTML = this.emailService.generateCardEmailHTML(this.cardData);
      const cardTypeName = this.getCardTypeName();
      const subject = `${cardTypeName} from ${this.cardData.senderName}`;

      const emailData = {
        to: this.recipientEmail,
        subject: subject,
        html: emailHTML,
        cardData: this.cardData
      };

      await this.emailService.sendCard(emailData).toPromise();

      // Reset form
      this.cardData = {
        recipientName: '',
        message: '',
        senderName: '',
        cardType: 'thank-you',
        backgroundColor: '#ffffff',
        textColor: '#333333',
        fontFamily: 'Arial',
        fontSize: '16px',
        cardStyle: 'classic',
        borderColor: '#cccccc',
        pattern: 'none'
      };
      this.recipientEmail = '';

      alert(`Card created and sent successfully! Check MailHog at http://localhost:8025 to see the email.`);
      this.currentStep = 1;
    } catch (err) {
      console.error('Error:', err);
      alert('Error creating and sending card. Please try again.');
    } finally {
      this.saving = false;
      this.sending = false;
    }
  }
}
