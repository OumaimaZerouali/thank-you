interface EnvironmentConfig {
  production: boolean;
  environment: string;
  apiUrl: string;
  emailServiceUrl: string;
  database: {
    useLocal: boolean;
    url?: string;
  };
  supabaseConfig: {
    url: string;
    anonKey: string;
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
  environment: getEnvVar('VITE_NODE_ENV', 'development'),
  apiUrl: getEnvVar('VITE_API_URL', 'http://localhost:3001'),
  emailServiceUrl: getEnvVar('VITE_EMAIL_SERVICE_URL', 'http://localhost:3002'),
  database: {
    useLocal: getBooleanEnvVar('VITE_USE_LOCAL_DB', false),
    url: getEnvVar('VITE_DATABASE_URL', ''),
  },
  supabaseConfig: {
    url: getEnvVar('VITE_SUPABASE_URL'),
    anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY'),
  },
  emailConfig: {
    smtpHost: getEnvVar('VITE_SMTP_HOST', 'localhost'),
    smtpPort: getNumberEnvVar('VITE_SMTP_PORT', 1025),
    mailhogWebUrl: getEnvVar('VITE_MAILHOG_WEB_URL', 'http://localhost:8025'),
    fromEmail: getEnvVar('VITE_FROM_EMAIL', 'noreply@thankyoucards.app'),
    fromName: getEnvVar('VITE_FROM_NAME', 'Thank You Cards App'),
  },
  features: {
    enableAnalytics: getBooleanEnvVar('VITE_ENABLE_ANALYTICS', false),
    enableErrorReporting: getBooleanEnvVar('VITE_ENABLE_ERROR_REPORTING', false),
    enableDebugMode: getBooleanEnvVar('VITE_ENABLE_DEBUG_MODE', true),
    enableEmailTesting: getBooleanEnvVar('VITE_ENABLE_EMAIL_TESTING', true),
  },
  logging: {
    level: getEnvVar('VITE_LOG_LEVEL', 'info'),
    enableConsoleLogging: getBooleanEnvVar('VITE_ENABLE_CONSOLE_LOGGING', true),
  },
};
