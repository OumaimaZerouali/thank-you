import { Pool, PoolClient } from 'pg';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardData, CardType, PatternType } from '../types/card';

interface LocalUser {
  id: string;
  email: string;
  encrypted_password: string;
  email_confirmed_at: Date | null;
  created_at: Date;
  updated_at: Date;
  raw_user_meta_data: any;
}

interface LocalUserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}

interface DbCard {
  id: string;
  user_id: string;
  card_type: string;
  recipient_name: string;
  recipient_email: string;
  sender_name: string;
  message: string;
  background_color: string;
  text_color: string;
  border_color: string;
  font_family: string;
  font_size: string;
  pattern: string;
  image_url: string | null;
  is_sent: boolean;
  created_at: Date;
  updated_at: Date;
}

export class LocalDatabaseService {
  private static instance: LocalDatabaseService;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'thankyoucards',
      password: 'password',
      port: 5432,
    });
  }

  static getInstance(): LocalDatabaseService {
    if (!LocalDatabaseService.instance) {
      LocalDatabaseService.instance = new LocalDatabaseService();
    }
    return LocalDatabaseService.instance;
  }

  async testConnection(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  // Authentication methods
  async signUp(email: string, password: string, fullName?: string): Promise<{ user: LocalUser | null; error: any }> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');

      // Check if user already exists
      const existingUser = await client.query('SELECT id FROM auth_users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        await client.query('ROLLBACK');
        return { user: null, error: new Error('User already exists') };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = uuidv4();
      const now = new Date();

      // Create user
      const userResult = await client.query(
        `INSERT INTO auth_users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [userId, email, hashedPassword, now, now, now, JSON.stringify({ full_name: fullName })]
      );

      await client.query('COMMIT');
      return { user: userResult.rows[0], error: null };
    } catch (error) {
      await client.query('ROLLBACK');
      return { user: null, error };
    } finally {
      client.release();
    }
  }

  async signIn(email: string, password: string): Promise<{ user: LocalUser | null; error: any }> {
    try {
      const result = await this.pool.query('SELECT * FROM auth_users WHERE email = $1', [email]);

      if (result.rows.length === 0) {
        return { user: null, error: new Error('User not found') };
      }

      const user = result.rows[0];
      const isValidPassword = await bcrypt.compare(password, user.encrypted_password);

      if (!isValidPassword) {
        return { user: null, error: new Error('Invalid password') };
      }

      return { user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  }

  async getUserProfile(userId: string): Promise<{ profile: LocalUserProfile | null; error: any }> {
    try {
      const result = await this.pool.query('SELECT * FROM profiles WHERE id = $1', [userId]);

      if (result.rows.length === 0) {
        return { profile: null, error: new Error('Profile not found') };
      }

      return { profile: result.rows[0], error: null };
    } catch (error) {
      return { profile: null, error };
    }
  }

  async updateUserProfile(userId: string, updates: Partial<LocalUserProfile>): Promise<{ error: any }> {
    try {
      const setClause = Object.keys(updates)
        .filter(key => key !== 'id' && key !== 'created_at')
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      if (!setClause) {
        return { error: new Error('No valid fields to update') };
      }

      const values = Object.keys(updates)
        .filter(key => key !== 'id' && key !== 'created_at')
        .map(key => updates[key as keyof LocalUserProfile]);

      await this.pool.query(
        `UPDATE profiles SET ${setClause}, updated_at = NOW() WHERE id = $1`,
        [userId, ...values]
      );

      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  // Card management methods
  private dbCardToCard(dbCard: DbCard): Card {
    return {
      id: dbCard.id,
      cardType: dbCard.card_type as CardType,
      recipientName: dbCard.recipient_name,
      recipientEmail: dbCard.recipient_email,
      senderName: dbCard.sender_name,
      message: dbCard.message,
      backgroundColor: dbCard.background_color,
      textColor: dbCard.text_color,
      borderColor: dbCard.border_color,
      fontFamily: dbCard.font_family,
      fontSize: dbCard.font_size,
      pattern: dbCard.pattern as PatternType,
      imageUrl: dbCard.image_url || undefined,
      createdAt: dbCard.created_at,
      updatedAt: dbCard.updated_at,
      isSent: dbCard.is_sent,
    };
  }

  async createCard(userId: string, cardData: CardData): Promise<{ card: Card | null; error: any }> {
    try {
      const cardId = uuidv4();
      const now = new Date();

      const result = await this.pool.query(
        `INSERT INTO cards (
          id, user_id, card_type, recipient_name, recipient_email, sender_name,
          message, background_color, text_color, border_color, font_family,
          font_size, pattern, image_url, is_sent, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING *`,
        [
          cardId, userId, cardData.cardType, cardData.recipientName, cardData.recipientEmail,
          cardData.senderName, cardData.message, cardData.backgroundColor, cardData.textColor,
          cardData.borderColor, cardData.fontFamily, cardData.fontSize, cardData.pattern,
          cardData.imageUrl || null, false, now, now
        ]
      );

      const card = this.dbCardToCard(result.rows[0]);
      return { card, error: null };
    } catch (error) {
      return { card: null, error };
    }
  }

  async getUserCards(userId: string, options: {
    sent?: boolean;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ cards: Card[]; error: any }> {
    try {
      let query = 'SELECT * FROM cards WHERE user_id = $1';
      const params: any[] = [userId];
      let paramCount = 1;

      if (options.sent !== undefined) {
        paramCount++;
        query += ` AND is_sent = $${paramCount}`;
        params.push(options.sent);
      }

      query += ' ORDER BY created_at DESC';

      if (options.limit) {
        paramCount++;
        query += ` LIMIT $${paramCount}`;
        params.push(options.limit);
      }

      if (options.offset) {
        paramCount++;
        query += ` OFFSET $${paramCount}`;
        params.push(options.offset);
      }

      const result = await this.pool.query(query, params);
      const cards = result.rows.map(row => this.dbCardToCard(row));

      return { cards, error: null };
    } catch (error) {
      return { cards: [], error };
    }
  }

  async getCard(userId: string, cardId: string): Promise<{ card: Card | null; error: any }> {
    try {
      const result = await this.pool.query(
        'SELECT * FROM cards WHERE id = $1 AND user_id = $2',
        [cardId, userId]
      );

      if (result.rows.length === 0) {
        return { card: null, error: new Error('Card not found') };
      }

      const card = this.dbCardToCard(result.rows[0]);
      return { card, error: null };
    } catch (error) {
      return { card: null, error };
    }
  }

  async updateCard(userId: string, cardId: string, updates: Partial<CardData>): Promise<{ card: Card | null; error: any }> {
    try {
      const updateFields: string[] = [];
      const values: any[] = [cardId, userId];
      let paramCount = 2;

      // Map the updates to database format
      const fieldMap: Record<string, string> = {
        cardType: 'card_type',
        recipientName: 'recipient_name',
        recipientEmail: 'recipient_email',
        senderName: 'sender_name',
        message: 'message',
        backgroundColor: 'background_color',
        textColor: 'text_color',
        borderColor: 'border_color',
        fontFamily: 'font_family',
        fontSize: 'font_size',
        pattern: 'pattern',
        imageUrl: 'image_url',
      };

      Object.entries(updates).forEach(([key, value]) => {
        if (fieldMap[key] && value !== undefined) {
          paramCount++;
          updateFields.push(`${fieldMap[key]} = $${paramCount}`);
          values.push(value);
        }
      });

      if (updateFields.length === 0) {
        return { card: null, error: new Error('No valid fields to update') };
      }

      updateFields.push('updated_at = NOW()');

      const query = `
        UPDATE cards
        SET ${updateFields.join(', ')}
        WHERE id = $1 AND user_id = $2
        RETURNING *
      `;

      const result = await this.pool.query(query, values);

      if (result.rows.length === 0) {
        return { card: null, error: new Error('Card not found or not authorized') };
      }

      const card = this.dbCardToCard(result.rows[0]);
      return { card, error: null };
    } catch (error) {
      return { card: null, error };
    }
  }

  async deleteCard(userId: string, cardId: string): Promise<{ error: any }> {
    try {
      const result = await this.pool.query(
        'DELETE FROM cards WHERE id = $1 AND user_id = $2',
        [cardId, userId]
      );

      if (result.rowCount === 0) {
        return { error: new Error('Card not found or not authorized') };
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  async markCardAsSent(userId: string, cardId: string): Promise<{ card: Card | null; error: any }> {
    try {
      const result = await this.pool.query(
        'UPDATE cards SET is_sent = true, updated_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *',
        [cardId, userId]
      );

      if (result.rows.length === 0) {
        return { card: null, error: new Error('Card not found or not authorized') };
      }

      const card = this.dbCardToCard(result.rows[0]);
      return { card, error: null };
    } catch (error) {
      return { card: null, error };
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

// Export singleton instance
export const localDb = LocalDatabaseService.getInstance();
