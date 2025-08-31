# Thank You Card Email Setup

## Quick Start

### 1. Start the SMTP Server (MailHog)
```bash
npm run docker:up
```
This starts MailHog SMTP server on:
- SMTP Port: 1025 (for sending emails)
- Web UI: http://localhost:8025 (to view sent emails)

### 2. Start Development Servers
```bash
npm run dev:full
```
This starts both:
- Angular app on http://localhost:4200
- Email backend server on http://localhost:3000

## How to Test Email Functionality

1. **Open the app**: Go to http://localhost:4200
2. **Create a card**: Fill in recipient name, your name, and message
3. **Add email**: Enter any email address (e.g., test@example.com)
4. **Customize**: Choose colors, fonts, styles, and patterns
5. **Send**: Click one of the action buttons:
   - **Save Card**: Saves to Firebase only
   - **Send Card**: Sends email + saves to Firebase
   - **Save & Send**: Does both actions together

## View Sent Emails

Open http://localhost:8025 in your browser to see all sent emails in the MailHog web interface.

## Architecture

- **Frontend**: Angular app with card customization
- **Backend**: Express server for email sending
- **SMTP**: MailHog for local email testing
- **Database**: Firebase for card storage

## Email Features

- Beautiful HTML email templates
- Maintains all card customizations (colors, fonts, styles, patterns)
- Email-safe CSS (works in most email clients)
- Professional email formatting

## Available Scripts

- `npm run docker:up` - Start MailHog SMTP server
- `npm run docker:down` - Stop MailHog SMTP server
- `npm run email-server` - Start email backend only
- `npm run dev:full` - Start both Angular and email server
- `npm start` - Start Angular only

## Troubleshooting

1. **Email not sending**: Make sure MailHog is running (`npm run docker:up`)
2. **CORS errors**: Ensure email server is running on port 3000
3. **No emails in MailHog**: Check http://localhost:8025 web interface
