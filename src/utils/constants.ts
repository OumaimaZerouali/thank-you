import { CardType, PatternType } from '../types';

export const CARD_TYPES: Record<CardType, string> = {
  'thank-you': 'Thank You',
  'birthday': 'Happy Birthday',
  'congratulations': 'Congratulations',
  'get-well': 'Get Well Soon',
  'holiday': 'Holiday Greetings',
  'custom': 'Custom Message'
};

export const PATTERN_TYPES: Record<PatternType, string> = {
  'none': 'No Pattern',
  'dots': 'Polka Dots',
  'stripes': 'Diagonal Stripes',
  'hearts': 'Hearts',
  'stars': 'Stars',
  'flowers': 'Flowers'
};

export const DEFAULT_CARD_STYLES = {
  backgroundColor: '#ffffff',
  textColor: '#333333',
  borderColor: '#e91e63',
  fontFamily: 'Arial',
  fontSize: '16px',
  pattern: 'none' as PatternType
};

export const FONT_FAMILIES = [
  'Arial',
  'Georgia',
  'Times New Roman',
  'Helvetica',
  'Comic Sans MS',
  'Courier New',
  'Verdana'
];

export const FONT_SIZES = [
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px'
];

export const COLOR_PRESETS = {
  backgrounds: [
    '#ffffff', '#f8f9fa', '#e3f2fd', '#f3e5f5',
    '#e8f5e8', '#fff3e0', '#fce4ec', '#f1f8e9'
  ],
  texts: [
    '#000000', '#333333', '#666666', '#1976d2',
    '#7b1fa2', '#388e3c', '#f57c00', '#c2185b'
  ],
  borders: [
    '#e91e63', '#2196f3', '#4caf50', '#ff9800',
    '#9c27b0', '#f44336', '#795548', '#607d8b'
  ]
};
