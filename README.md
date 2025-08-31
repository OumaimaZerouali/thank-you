# Thank You Cards Application

A modern, customizable thank-you card creation and sending application built with Angular 18, Firebase, and Node.js. Create beautiful, personalized cards and send them via email with a simple 3-step process.

## 🌟 Features

### Card Creation & Customization
- **Multiple Card Types**: Thank you cards, payment requests, funeral cards, baby cards, and more
- **Rich Customization Options**: 
  - Background and text colors
  - Multiple font families and sizes
  - Various card styles (classic, modern, elegant)
  - Border colors and patterns
  - Real-time preview
- **3-Step Creation Process**:
  1. Card content (recipient, message, sender)
  2. Visual customization
  3. Email sending

### Email Functionality
- Send cards directly via email
- HTML email templates with embedded card design
- Local SMTP testing with MailHog
- Production-ready email configuration

### Data Management
- Firebase Firestore integration for card storage
- Card history and management
- Real-time data synchronization

### User Experience
- Dark/light mode toggle
- Responsive design
- Clean, intuitive interface
- No horizontal/vertical scrolling required

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Docker (for local email testing)
- Angular CLI (v18.2.9)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd thank-you
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development environment with email testing**
   ```bash
   # Start both Angular app and email services
   npm run dev:full
   
   # Or start them separately
   npm run docker:up    # Start MailHog and MongoDB
   npm run dev          # Start Angular app + email server
   ```

4. **Access the application**
   - **Main App**: http://localhost:4200
   - **MailHog Web UI**: http://localhost:8025 (view sent emails)
   - **MongoDB**: localhost:27017
   - **Email API**: http://localhost:3000

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── card-creator.component.*    # Main card creation interface
│   │   │   └── card-list.component.*       # Card history and management
│   │   ├── navbar/
│   │   │   └── navbar.component.*          # Navigation and tab switching
│   │   └── theme-switch/
│   │       └── dark-mode-toggle.component.* # Dark/light mode toggle
│   ├── services/
│   │   ├── email.service.ts                # Email sending functionality
│   │   └── firebase.service.ts             # Firebase/Firestore integration
│   ├── app.component.*                     # Root application component
│   ├── app.config.ts                       # Application configuration
│   └── app.routes.ts                       # Routing configuration
├── environments/
│   ├── environment.ts                      # Base environment config
│   ├── environment.development.ts          # Development settings
│   └── environment.production.ts           # Production settings
└── styles.scss                            # Global styles
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev            # Start Angular app + email server
npm run dev:full       # Start Docker + Angular + email server
npm start              # Start Angular development server only
npm run email-server   # Start email server only
npm run setup:dev      # Quick development setup
```

### Building
```bash
npm run build          # Production build
npm run build:dev      # Development build
npm run watch          # Build with file watching
npm run setup:prod     # Production build setup
```

### Docker Services
```bash
npm run docker:up      # Start MailHog and MongoDB
npm run docker:down    # Stop all services
npm run docker:logs    # View service logs
npm run docker:restart # Restart Docker services
```

### Testing & Quality
```bash
npm test              # Run unit tests
npm run lint          # Run linting
npm run format        # Format code with Prettier
npm run clean         # Clean build artifacts
```

## ⚙️ Configuration

### Environment Variables

The application uses different environment configurations for development and production:

#### Development
- Local SMTP server (MailHog)
- Debug mode enabled
- Local API endpoints
- Development Firebase config

#### Production
- Production SMTP server
- Analytics enabled
- Production API endpoints
- Optimized logging

### Firebase Setup

1. Create a Firebase project at https://firebase.google.com
2. Enable Firestore Database
3. Update the `firebaseConfig` in environment files with your project credentials

### Email Configuration

#### Local Development (MailHog)
The project includes a Docker Compose setup with MailHog for local email testing:
- SMTP Server: localhost:1026
- Web Interface: http://localhost:8025

#### Production
Update the email configuration in `.env.production`:
```bash
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@yourdomain.com
```

## 🎨 Customization

### Adding New Card Types

1. Update the `CardType` type in `firebase.service.ts`
2. Add new templates in the card creator component
3. Update the card type selector in the UI

### Styling and Themes

The application supports dark/light modes and custom styling:
- Global styles: `src/styles.scss`
- Component-specific styles: `*.component.scss` files
- Dark mode styles: CSS classes with `.dark-mode` prefix

### Custom Card Patterns

Add new patterns by updating the pattern options in the card creator component and implementing the corresponding CSS classes.

## 🔧 Development

### Adding New Features

1. **Create Components**: Use Angular CLI to generate new components
   ```bash
   ng generate component components/your-component
   ```

2. **Add Services**: Generate services for business logic
   ```bash
   ng generate service services/your-service
   ```

3. **Update Environment**: Add new configuration options to environment files

### Code Quality

The project follows Angular best practices:
- Standalone components
- TypeScript strict mode
- SCSS for styling
- Reactive forms where applicable
- Service-based architecture

## 📧 Email System

### Local Testing
The application includes a complete email testing setup:

1. **MailHog**: Catches all outgoing emails for inspection
2. **Email Server**: Node.js/Express server handling email requests
3. **Email Service**: Angular service managing email operations

### Email Templates
Cards are rendered as HTML emails with:
- Embedded CSS styling
- Responsive design
- Fallback text content
- Custom card designs

## 🚀 Deployment

### Development Deployment
```bash
npm run build:dev
npm run serve:ssr:thank-you
```

### Production Deployment

1. **Build the application**
   ```bash
   npm run setup:prod
   ```

2. **Configure environment**
   - Update API URLs in `environment.production.ts`
   - Set up production SMTP server in `.env.production`
   - Configure Firebase for production

3. **Deploy**
   - Deploy built files from `dist/` directory
   - Ensure server supports Angular routing
   - Set up SSL certificates

## 🐛 Troubleshooting

### Common Issues

**App won't start**
- Check that all dependencies are installed: `npm install`
- Verify environment configuration files
- Ensure Firebase configuration is correct

**Email sending fails**
- Check Docker services are running: `npm run docker:up`
- Verify MailHog is accessible at http://localhost:8025
- Check email server logs for errors

**Cards not displaying properly**
- Clear browser cache
- Check console for JavaScript errors
- Verify Firebase connection

### Getting Help

1. Check the console for error messages
2. Verify all services are running with `npm run docker:logs`
3. Check the MailHog interface for email delivery
4. Review environment configuration files

## 🛡️ Security

### Development
- Uses MailHog for safe email testing
- Local-only Firebase configuration
- Debug mode enabled for troubleshooting

### Production
- Secure SMTP with TLS
- Environment variable protection
- Analytics and error reporting enabled
- Optimized logging

## 📦 Docker Services

The project includes Docker Compose configuration for:

- **MailHog**: Email testing server
  - SMTP: localhost:1026
  - Web UI: localhost:8025
- **MongoDB**: Data persistence
  - Port: localhost:27017
  - Credentials: admin/password

## 🔄 CI/CD Ready

The project is configured for easy deployment with:
- Environment-specific builds
- Production optimization
- Health check endpoints
- Proper error handling

## 📄 License

[Add your license here]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please create an issue or contact the development team.

---

Built with ❤️ using Angular 18, Firebase, and Node.js
