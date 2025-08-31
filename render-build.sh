#!/usr/bin/env bash
set -e

echo "Generating Angular environment.prod.ts file..."

cat > src/environments/environment.prod.ts <<EOL
export const environment = {
  production: true,
  environment: 'production',
  apiUrl: '${API_URL}',
  emailServiceUrl: '${EMAIL_SERVICE_URL}',
  firebaseConfig: {
    apiKey: '${FIREBASE_API_KEY}',
    authDomain: '${FIREBASE_AUTH_DOMAIN}',
    projectId: '${FIREBASE_PROJECT_ID}',
    storageBucket: '${FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${FIREBASE_APP_ID}',
    measurementId: '${FIREBASE_MEASUREMENT_ID}'
  },
  emailConfig: {
    smtpHost: '${SMTP_HOST}',
    smtpPort: ${SMTP_PORT},
    mailhogWebUrl: undefined,
    fromEmail: '${FROM_EMAIL}',
    fromName: '${FROM_NAME}'
  },
  features: {
    enableAnalytics: ${ENABLE_ANALYTICS},
    enableErrorReporting: ${ENABLE_ERROR_REPORTING},
    enableDebugMode: ${ENABLE_DEBUG_MODE},
    enableEmailTesting: ${ENABLE_EMAIL_TESTING}
  },
  logging: {
    level: '${LOG_LEVEL}',
    enableConsoleLogging: ${ENABLE_CONSOLE_LOGGING}
  }
};
EOL

echo "environment.prod.ts generated!"
