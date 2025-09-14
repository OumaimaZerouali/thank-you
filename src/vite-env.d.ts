interface ImportMetaEnv {
  readonly VITE_USE_LOCAL_DB: string
  readonly VITE_DATABASE_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_API_URL: string
  readonly VITE_EMAIL_SERVICE_URL: string
  readonly VITE_NODE_ENV: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_ERROR_REPORTING: string
  readonly VITE_ENABLE_DEBUG_MODE: string
  readonly VITE_ENABLE_EMAIL_TESTING: string
  readonly VITE_LOG_LEVEL: string
  readonly VITE_ENABLE_CONSOLE_LOGGING: string
  readonly VITE_SMTP_HOST: string
  readonly VITE_SMTP_PORT: string
  readonly VITE_MAILHOG_WEB_URL: string
  readonly VITE_FROM_EMAIL: string
  readonly VITE_FROM_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
