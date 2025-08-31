const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const SMTP_HOST = process.env.SMTP_HOST || 'localhost';
const SMTP_PORT = process.env.SMTP_PORT || 1026;
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@thankyoucards.local';

const corsOptions = {
  origin: NODE_ENV === 'production'
    ? ['https://your-frontend-domain.vercel.app', 'https://thankyoucards.com']
    : ['http://localhost:4200'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (NODE_ENV === 'production') {
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many email requests, please try again later.'
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

app.post('/api/send-card', async (req, res) => {
  try {
    const { to, subject, html, cardData } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, html'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
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
      messageId: info.messageId,
      environment: NODE_ENV
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      success: false,
      error: NODE_ENV === 'production' ? 'Failed to send email' : error.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    smtp: `${SMTP_HOST}:${SMTP_PORT}`,
    version: '1.0.0'
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Thank You Cards Email API',
    environment: NODE_ENV,
    endpoints: ['/api/health', '/api/send-card']
  });
});

app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: NODE_ENV === 'production' ? 'Internal server error' : error.message
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Email service listening on port ${PORT} (${NODE_ENV} mode)`);
});

module.exports = app;
