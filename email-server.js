import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import rateLimit from 'express-rate-limit';

const app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const SMTP_HOST = process.env.SMTP_HOST || 'localhost';
const SMTP_PORT = process.env.SMTP_PORT || 1026;
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@thankyoucards.local';

// In-memory storage (replace with database in production)
let cardsStore = new Map();

const corsOptions = {
  origin: NODE_ENV === 'production'
    ? ['https://your-frontend-domain.vercel.app', 'https://thankyoucards.com']
    : ['http://localhost:4200', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (NODE_ENV === 'production') {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, error: 'Too many requests, please try again later.' }
  });
  app.use('/api/', limiter);
}

const transporterConfig = {
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT),
  secure: SMTP_PORT == 465,
  auth: SMTP_USER && SMTP_PASS ? {
    user: SMTP_USER,
    pass: SMTP_PASS
  } : false,
  tls: {
    rejectUnauthorized: NODE_ENV === 'production'
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  socketTimeout: 60000,
  greetingTimeout: 30000,
  connectionTimeout: 60000
};

// Fix: Use nodemailer.createTransport (not createTransporter)
const transporter = nodemailer.createTransport(transporterConfig);

transporter.verify((error, success) => {
  if (error) {
    console.log('SMTP connection error:', error);
  } else {
    console.log(`✅ SMTP server is ready (${NODE_ENV} mode)`);
    console.log(`📧 Email server running on port ${PORT}`);
    console.log(`🔗 SMTP configured for ${SMTP_HOST}:${SMTP_PORT}`);
  }
});

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateCardData = (cardData) => {
  const requiredFields = ['cardType', 'recipientName', 'recipientEmail', 'senderName', 'message'];
  const errors = [];

  requiredFields.forEach(field => {
    if (!cardData[field] || !cardData[field].toString().trim()) {
      errors.push({ field, message: `${field} is required` });
    }
  });

  if (cardData.recipientEmail && !validateEmail(cardData.recipientEmail)) {
    errors.push({ field: 'recipientEmail', message: 'Invalid email address' });
  }

  return errors;
};

const generateCardHTML = (cardData) => {
  const cardStyle = `
    background-color: ${cardData.backgroundColor || '#ffffff'};
    color: ${cardData.textColor || '#333333'};
    font-family: ${cardData.fontFamily || 'Arial'}, sans-serif;
    font-size: ${cardData.fontSize || '16px'};
    border: 2px solid ${cardData.borderColor || '#e91e63'};
    border-radius: 12px;
    padding: 40px;
    max-width: 500px;
    margin: 20px auto;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `;

  const patternStyles = {
    dots: 'background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px); background-size: 20px 20px;',
    stripes: 'background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px);',
    hearts: 'background-image: url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 15l-5.5-5.5c-1.5-1.5-1.5-4 0-5.5s4-1.5 5.5 0 4 1.5 5.5 0 1.5 4 0 5.5L10 15z\' fill=\'%23ff69b4\' opacity=\'0.1\'/%3E%3C/svg%3E"); background-size: 20px 20px;',
    stars: 'background-image: url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpolygon points=\'10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8\' fill=\'%23ffd700\' opacity=\'0.1\'/%3E%3C/svg%3E"); background-size: 20px 20px;',
    flowers: 'background-image: url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'%23ff69b4\' opacity=\'0.1\'/%3E%3C/svg%3E"); background-size: 20px 20px;'
  };

  const patternStyle = patternStyles[cardData.pattern] || '';

  const cardTypeNames = {
    'thank-you': 'Thank You',
    'birthday': 'Happy Birthday',
    'congratulations': 'Congratulations',
    'get-well': 'Get Well Soon',
    'holiday': 'Holiday Greetings',
    'custom': 'Special Message'
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${cardTypeNames[cardData.cardType] || 'Thank You'} from ${cardData.senderName}</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
      <div style="${cardStyle}${patternStyle}">
        <h1 style="margin-top: 0; color: ${cardData.textColor};">
          ${cardTypeNames[cardData.cardType] || 'Thank You'}
        </h1>
        <p style="font-size: 18px; margin: 20px 0;">
          Dear ${cardData.recipientName},
        </p>
        ${cardData.imageUrl ? `<img src="${cardData.imageUrl}" alt="Card image" style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px;" />` : ''}
        <div style="font-size: ${cardData.fontSize}; line-height: 1.6; margin: 30px 0;">
          ${cardData.message.replace(/\n/g, '<br>')}
        </div>
        <p style="margin-top: 40px; font-style: italic;">
          With best regards,<br>
          <strong>${cardData.senderName}</strong>
        </p>
      </div>
      <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
        <p>This card was created with Thank You Cards</p>
      </div>
    </body>
    </html>
  `;
};

// Cards API endpoints
app.get('/api/cards', (req, res) => {
  try {
    const { sent, limit = 50, offset = 0 } = req.query;
    let cards = Array.from(cardsStore.values());

    if (sent !== undefined) {
      const isSent = sent === 'true';
      cards = cards.filter(card => card.isSent === isSent);
    }

    const total = cards.length;
    const paginatedCards = cards
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(parseInt(offset), parseInt(offset) + parseInt(limit));

    res.json({
      success: true,
      data: paginatedCards,
      total
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cards'
    });
  }
});

app.post('/api/cards', (req, res) => {
  try {
    const validationErrors = validateCardData(req.body);
    if (validationErrors.length > 0) {
      return res.status(422).json({
        success: false,
        error: 'Validation failed',
        validationErrors
      });
    }

    const now = new Date().toISOString();
    const card = {
      id: uuidv4(),
      ...req.body,
      createdAt: now,
      updatedAt: now,
      isSent: false
    };

    cardsStore.set(card.id, card);

    res.status(201).json({
      success: true,
      data: card,
      message: 'Card created successfully'
    });
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create card'
    });
  }
});

app.get('/api/cards/:cardId', (req, res) => {
  try {
    const card = cardsStore.get(req.params.cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        error: 'Card not found'
      });
    }

    res.json({
      success: true,
      data: card
    });
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch card'
    });
  }
});

app.put('/api/cards/:cardId', (req, res) => {
  try {
    const card = cardsStore.get(req.params.cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        error: 'Card not found'
      });
    }

    const validationErrors = validateCardData(req.body);
    if (validationErrors.length > 0) {
      return res.status(422).json({
        success: false,
        error: 'Validation failed',
        validationErrors
      });
    }

    const updatedCard = {
      ...card,
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    cardsStore.set(req.params.cardId, updatedCard);

    res.json({
      success: true,
      data: updatedCard,
      message: 'Card updated successfully'
    });
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update card'
    });
  }
});

app.delete('/api/cards/:cardId', (req, res) => {
  try {
    const card = cardsStore.get(req.params.cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        error: 'Card not found'
      });
    }

    cardsStore.delete(req.params.cardId);

    res.json({
      success: true,
      message: 'Card deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete card'
    });
  }
});

app.post('/api/cards/:cardId/send', async (req, res) => {
  try {
    const card = cardsStore.get(req.params.cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        error: 'Card not found'
      });
    }

    if (card.isSent) {
      return res.status(400).json({
        success: false,
        error: 'Card has already been sent'
      });
    }

    const html = generateCardHTML(card);
    const subject = `${card.cardType === 'thank-you' ? 'Thank You' : 'Special Message'} from ${card.senderName}`;

    const mailOptions = {
      from: `"${card.senderName}" <${FROM_EMAIL}>`,
      to: card.recipientEmail,
      subject: subject,
      html: html,
      text: `${subject}\n\nDear ${card.recipientName},\n\n${card.message}\n\nWith gratitude,\n${card.senderName}`
    };

    const info = await transporter.sendMail(mailOptions);

    // Mark card as sent
    const updatedCard = {
      ...card,
      isSent: true,
      sentAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    cardsStore.set(card.id, updatedCard);

    console.log(`📧 Card sent successfully to ${card.recipientEmail}:`, info.messageId);

    res.json({
      success: true,
      data: {
        messageId: info.messageId,
        sentAt: updatedCard.sentAt
      },
      message: 'Card sent successfully'
    });
  } catch (error) {
    console.error('❌ Error sending card:', error);
    res.status(500).json({
      success: false,
      error: NODE_ENV === 'production' ? 'Failed to send card' : error.message
    });
  }
});

// Email API endpoint (for custom emails)
app.post('/api/email/send', async (req, res) => {
  try {
    const { to, subject, html, cardData } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, html'
      });
    }

    if (!validateEmail(to)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      });
    }

    const mailOptions = {
      from: `"${cardData?.senderName || 'Thank You Cards'}" <${FROM_EMAIL}>`,
      to: to,
      subject: subject,
      html: html,
      text: `Thank You Card from ${cardData?.senderName || 'Someone'}\n\nDear ${cardData?.recipientName || 'Friend'},\n\n${cardData?.message || 'Thank you!'}\n\nWith gratitude,\n${cardData?.senderName || 'Someone'}`
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`📧 Email sent successfully to ${to}:`, info.messageId);
    res.json({
      success: true,
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      success: false,
      error: NODE_ENV === 'production' ? 'Failed to send email' : error.message
    });
  }
});

// Legacy endpoint for backward compatibility
app.post('/api/send-card', async (req, res) => {
  console.warn('⚠️  /api/send-card is deprecated. Use /api/email/send instead.');
  return app._router.handle({...req, url: '/api/email/send'}, res);
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    smtp: `${SMTP_HOST}:${SMTP_PORT}`,
    version: '1.0.0',
    cardsCount: cardsStore.size
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Thank You Cards API',
    environment: NODE_ENV,
    version: '1.0.0',
    endpoints: {
      cards: {
        'GET /api/cards': 'List all cards',
        'POST /api/cards': 'Create a new card',
        'GET /api/cards/:id': 'Get a specific card',
        'PUT /api/cards/:id': 'Update a card',
        'DELETE /api/cards/:id': 'Delete a card',
        'POST /api/cards/:id/send': 'Send a card via email'
      },
      email: {
        'POST /api/email/send': 'Send custom email'
      },
      system: {
        'GET /api/health': 'Health check',
        'GET /': 'API documentation'
      }
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: NODE_ENV === 'production' ? 'Internal server error' : error.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Thank You Cards API listening on port ${PORT} (${NODE_ENV} mode)`);
  console.log(`📖 API documentation available at http://localhost:${PORT}/`);
  console.log(`💾 Using in-memory storage (${cardsStore.size} cards loaded)`);
});

export default app;
