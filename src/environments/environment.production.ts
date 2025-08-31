export const environment = {
  production: false,
  environment: 'development',
  apiUrl: 'http://localhost:3000/api',
  emailServiceUrl: 'http://localhost:3000/api',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  },
  emailConfig: {
    smtpHost: 'localhost',
    smtpPort: 1026,
    mailhogWebUrl: 'http://localhost:8025',
    fromEmail: 'noreply@thankyoucards.local',
    fromName: 'Thank You Cards'
  },
  features: {
    enableAnalytics: false,
    enableErrorReporting: false,
    enableDebugMode: true,
    enableEmailTesting: true
  },
  logging: {
    level: 'debug',
    enableConsoleLogging: true
  }
};
