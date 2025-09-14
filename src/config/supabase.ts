import { createClient } from '@supabase/supabase-js';
import { environment } from './environment';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only initialize Supabase if we're not using local database and have valid credentials
const isValidSupabaseConfig = supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'your_supabase_project_url' &&
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  !environment.database.useLocal;

export const supabase = isValidSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const TABLES = {
  CARDS: 'cards',
  PROFILES: 'profiles',
} as const;

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
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
          image_url?: string | null;
          is_sent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          card_type?: string;
          recipient_name?: string;
          recipient_email?: string;
          sender_name?: string;
          message?: string;
          background_color?: string;
          text_color?: string;
          border_color?: string;
          font_family?: string;
          font_size?: string;
          pattern?: string;
          image_url?: string | null;
          is_sent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
