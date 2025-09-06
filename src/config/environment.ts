interface EnvironmentConfig {
  production: boolean;
  environment: string;
  apiUrl: string;
  emailServiceUrl: string;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
  emailConfig: {
    smtpHost: string;
    smtpPort: number;
    mailhogWebUrl: string;
    fromEmail: string;
    fromName: string;
  };
  features: {
    enableAnalytics: boolean;
    enableErrorReporting: boolean;
    enableDebugMode: boolean;
    enableEmailTesting: boolean;
  };
  logging: {
    level: string;
    enableConsoleLogging: boolean;
  };
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is required but not defined`);
  }
  return value || defaultValue!;
};

const getBooleanEnvVar = (key: string, defaultValue: boolean): boolean => {
  const value = import.meta.env[key];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true';
};

const getNumberEnvVar = (key: string, defaultValue: number): number => {
  const value = import.meta.env[key];
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

export const environment: EnvironmentConfig = {
  production: import.meta.env.PROD,
  environment: getEnvVar('NODE_ENV', 'development'),
  apiUrl: getEnvVar('VITE_API_URL', 'http://localhost:3000/api'),
  emailServiceUrl: getEnvVar('VITE_EMAIL_SERVICE_URL', 'http://localhost:3000/api'),
  firebaseConfig: {
    apiKey: getEnvVar('VITE_FIREBASE_API_KEY'),
    authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('VITE_FIREBASE_APP_ID'),
    measurementId: getEnvVar('VITE_FIREBASE_MEASUREMENT_ID')
  },
  emailConfig: {
    smtpHost: getEnvVar('SMTP_HOST', 'localhost'),
    smtpPort: getNumberEnvVar('SMTP_PORT', 1026),
    mailhogWebUrl: getEnvVar('MAILHOG_WEB_URL', 'http://localhost:8025'),
    fromEmail: getEnvVar('FROM_EMAIL', 'noreply@thankyoucards.local'),
    fromName: getEnvVar('FROM_NAME', 'Thank You Cards (Dev)')
  },
  features: {
    enableAnalytics: getBooleanEnvVar('VITE_ENABLE_ANALYTICS', false),
    enableErrorReporting: getBooleanEnvVar('VITE_ENABLE_ERROR_REPORTING', false),
    enableDebugMode: getBooleanEnvVar('DEBUG_MODE', true),
    enableEmailTesting: getBooleanEnvVar('VITE_ENABLE_EMAIL_TESTING', true)
  },
  logging: {
    level: getEnvVar('VITE_LOG_LEVEL', 'debug'),
    enableConsoleLogging: getBooleanEnvVar('CONSOLE_LOGGING', true)
  }
};
