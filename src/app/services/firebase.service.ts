import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Card {
  recipientName: string;
  message: string;
  senderName: string;
  createdAt?: any;
  id?: string;
  // Card type and variant
  cardType?: string;
  // Customization options
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  fontSize?: string;
  cardStyle?: string;
  borderColor?: string;
  pattern?: string;
}

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private readonly firestore: Firestore = inject(Firestore);

  getCards(): Observable<Card[]> {
    const cardCollection = collection(this.firestore, 'cards');
    return collectionData(cardCollection, { idField: 'id' }) as Observable<Card[]>;
  }

  async addCard(card: Card): Promise<string> {
    const docRef = await addDoc(collection(this.firestore, 'cards'), {
      ...card,
      createdAt: new Date()
    });
    return docRef.id;
  }
}
